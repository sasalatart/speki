notificationsOptions = { timeout: 5000 };

methodCallback = function(error, result) {
  if (error) {
    Notifications.error('Error' + error.error, error.reason, notificationsOptions);
  } else if (result) {
    Notifications.success(result.header, result.text, notificationsOptions);
  }
};
