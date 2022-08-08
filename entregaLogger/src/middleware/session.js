
module.exports.checkSession  = function(req, res, next) {

    
	if(req.isAuthenticated()){
		next();	
	}else{
		res.redirect("login");
	}
}