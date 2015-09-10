var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require("./db");

passport.use(new LocalStrategy(

  function(username, password, done) {
   
    var err;

    return db.fetch_user_with_name(username).then(function(user){
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      return bcrypt.compare(password,user.password, function(err, res){
          if (res){
            return done(null, user);
          }else{
            console.log("hmmm - incorrect password!!");
            return done(null, false, { message: 'Incorrect password' });
          }
      });

    }, function(err){
      console.log(err);
      return done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null,user.username);
});

passport.deserializeUser(function(username, done) {
  db.fetch_user_details(username).then(function(user){
    done(null, user);
  });
});

module.exports = function(app){

  app.use(passport.initialize());
  app.use(passport.session());

  //login with standard roomcast credentials..(maybe change to /auth/roomcast)
  app.post('/login/', passport.authenticate('local',
                                    {successRedirect: '/',
                                    failureRedirect: '/login'})
  );

  app.get('/login', function(req,res){
    res.render('login');
  });
};
