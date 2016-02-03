Router.configure({
  layoutTemplate: 'appLayout'
});

Router.route('/', () => {
  this.render('landingPage')
});
