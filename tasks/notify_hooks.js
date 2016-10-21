module.exports = {
  options: {
    enabled: true,
    title: 'Dr. Bob', // defaults to the name in package.json, or will use project directory's name
    success: false, // whether successful grunt executions should be notified automatically
    duration: 3 // the duration of notification in seconds, for `notify-send only
  }
};
