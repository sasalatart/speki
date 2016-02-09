errorCallback = function(error, result) {
  if (error) {
    Notifications.error('Error' + error.error, error.reason);
  }
};
