methodCallback = function(error, result) {
  if (error) {
    Notifications.error('Error' + error.error, error.reason);
  } else if (result) {
    Notifications.success(result.header, result.text);
  }
};
