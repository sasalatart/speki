checkNonEmptyString = function(x, varName, minLength = 1, maxLength = 1000) {
  check(x, String);

  if (x.length < minLength || x.length > maxLength) {
    throw new Meteor.Error(400, varName + ' debe tener entre ' + minLength + ' y ' + maxLength + ' caracteres.');
  }
}

checkLoggedIn = function() {
  if (!Meteor.userId()) {
    throw new Meteor.Error(403, 'Debes iniciar sesión para hacer esto.');
  }
}

checkAdmin = function() {
  if (!Meteor.userId() || !Meteor.user().admin) {
    throw new Meteor.Error(403, 'Debes ser administrador para hacer eso.');
  }
}
