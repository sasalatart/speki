notificationsOptions = { timeout: 5000 };

methodCallback = function(error, result) {
  if (error) {
    Notifications.error('Error' + error.error, error.reason, notificationsOptions);
  } else if (result) {
    if (result.header instanceof Date) {
      result.header = getDate(result.header);
    }

    Notifications.success(result.header, result.text, notificationsOptions);
  }
};

getDate = function(date) {
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return day + '/' + month + '/' + date.getFullYear() + ' ' + hours + ':' + minutes;
}
