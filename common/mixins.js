(function() {
  var isNode = typeof module !== 'undefined' && this.module !== module;

  var mixins = {
    // Convert an array into an object, where each set of values
    // become the key/value pair in the object
    unpair: function(arr) {
      return _.reduce(arr, function(memo, item, index) {
        // Even numbers will be the keys
        if (index % 2 === 0) {
          memo[item] = null;
        }
        // Odd numbers will be the values 
        else {
          memo[arr[index - 1]] = item;
        }
        return memo;
      }, {});
    },

    // Like unpair, but converts arrays, into nested arrays with
    // "num" items in each inner array
    chunk: function(arr, num) {
      num = num || 1;
      return _.reduce(arr, function(memo, item) {
        // If the previous inner array is full, push a new array on
        if (_.last(memo).length === num) {
          memo.push([ item ]);
        }
        // Otherwise, add this item on to the end of the last array 
        else {
          _.last(memo).push(item);
        }
        return memo;
      }, [ [] ]);
    },

    // Assure that "thing" is an array
    asArray: function(thing) {
      // Don't wrap undefined or null as [undefined] as that causes
      // some of lodash's built-in magic to fail
      if (!thing) {
        return thing;
      }
      return (thing instanceof Array) ? thing : [thing];
    },

    // Convert an object to an array of objects in a way that can be used easily by hogan.
    // e.g.
    // { foo: 'bar' } becomes [ { key: 'foo', value: 'bar' } ]
    deconstruct: function(obj) {
      return _.reduce(obj, function(memo, val, key) {
        memo.push({
          key: key,
          value: val
        });
        return memo;
      }, []);
    },

    // Omit "field" from each object in "array"
    omitEach: function(array, field) {
      return _.map(array, function(obj) {
        return _.isPlainObject(obj) ? _.omit(obj, field) : obj;
      });
    },

    diff: function(original, modified) {
      var differences = {};
      // If the original is empty, return the modified object,
      // as it's completely new
      if (!original) {
        return modified;
      }

      // Loop over the keys in the modified object
      for (var key in modified) {
        // If the property is an array
        if (_.isArray(modified[key])) {
          // Remove the the $$hashKey property from each
          var origArr = _.omitEach(original[key], '$$hashKey');
          var modArr = _.omitEach(modified[key], '$$hashKey');
          // Compare them
          if (!_.isEqual(origArr, modArr)) {
            // Assign if different, but without empty values OTHER THAN null,
            // which specifically means this item was unset.
            differences[key] = _.without(modArr, '', undefined);
          }
        }
        // If the property is an object
        else if (_.isPlainObject(modified[key])) {
          // Get the diff of the two objects
          var innerDiff = _.diff(original[key], modified[key]); 
          // And assign it if it exists
          if (innerDiff) {
            differences[key] = innerDiff;
          }
        }
        // If the property is a primitive
        else if (modified[key] !== original[key]) {
          // Assign if different
          differences[key] = modified[key]; 
        }
      }
      
      // Return the differences, unless there are none. In that case, return null.
      return _.isEmpty(differences) ? null : differences;
    },

    // Walks an object "obj" and calls "onPrimitive" whenever it encounters a primitive value or array (unless
    // "enterArrays" is true). If "enterArrays" is true, this function recurses into objects inside arrays as well.
    // "currentPath" and "origObj" are internal params passed when this function calls itself, so do not pass them
    // when you call it.
    recurse: function(obj, onPrimitive, enterArrays, currentPath, origObj) {
      // Loop over keys in object
      _.forOwn(obj, function(val, key) {
        // Set the path at this point in the object. If this is the top level of the object, use just the key.
        // Otherwise, add the key to any previously generated path (from a highler level).
        var path = currentPath ? currentPath + '.' + key : key;
        // If this property is an object, recurse into it
        if (_.isPlainObject(val)) {
          // Pass in the current path and object. Since "obj" changes on iterations (to nested object), we
          // need to preserve the original top level object so that it can be passed to "onPrimitive" below.
          mixins.recurse(val, onPrimitive, enterArrays, path, origObj || obj);
        } else if (_.isArray(val) && enterArrays) {
          // If "enterArrays" is true, loop through the array
          _.each(val, function(innerObj, i) {
            // Add the array index to the path
            var innerPath = path + '.' + i;
            if (_.isArray(innerObj) || _.isPlainObject(innerObj)) {
              // If the inner property is an object or array, recurse into it
              mixins.recurse(innerObj, onPrimitive, enterArrays, innerPath, origObj || obj);
            } else {
              // Otherwise, call onPrimitive
              onPrimitive(innerPath, innerObj, origObj || obj);
            }
          });
        } else {
          // Call on primitive with full path to this property, the property itself, and the original object
          onPrimitive(path, val, origObj || obj);
        }
      });
    },

    // Recurse over an object, returning an array of paths that match "match"
    findInObj: function(obj, match, partial) {
      // Standardize "match" as an array
      if (!(match instanceof Array)) {
        match = [match];
      }

      // Wrapper function to run inside the "onPrimitive" callback for recursion
      var isMatch = function(val) {
        // Since "match" is an array, see if any of the matches match
        return _.any(match, function(item) {
          if (item instanceof RegExp) {
            // If the match is regex, just test
            return item.test(val);
          } else if (partial) {
            // If partial is true, the "match" is a string regex
            return new RegExp(item).test(val);
          } else {
            // Otherwise, assume an exact match is required
            return item === val;
          }
        });
      };

      var paths = [];

      // Recurse over this object, including into arrays
      _.recurse(obj, function(path, val) {
        // If this val matches any of the matches, include it in the result set
        if (isMatch(val)) {
          paths.push(path);
        }
      }, true);

      return paths;
    },

    // Convert an array into an object, where the array items become the keys of the object
    // and the values are all empty string. I.e.
    //   _.objFromArray(['foo', 'bar']) // { foo: '', bar: '' }
    objFromArray: function(arr) {
      return _.object(arr, _.fill(new Array(arr.length), ''));
    },

    // Invoke a function only if it is a function. This prevents needing to say
    //    if (success) {
    //      success();
    //    }
    // all over inside async things that take callbacks. Any arguments passed after the
    // function will be applied to the function. You can bind a "this" context to the function
    // using _.bind, if necessary, e.g.:
    //   _.safeInvoke(_.bind(success, this));
    safeInvoke: function(func) {
      if (typeof func === 'function') {
        func.apply(null, [].slice.call(arguments, 1));
      }
    }
  };

  if (isNode) {
    module.exports = mixins;
  } else {
    window._._mixins = mixins;
  }
})();
