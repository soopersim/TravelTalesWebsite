const checkSession = (req, res, next) => {
    if (!req.session.isAuthenticated) {
      return res.redirect('/loginpage');
    }
    next();
  };
  
  module.exports = checkSession;
  