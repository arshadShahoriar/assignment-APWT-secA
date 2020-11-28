const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{
	
	//res.render('home/index', {name: 'alamin', id:'123'});
	 var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(results){
		
		if(results<1)
			res.render('login/index');
		else if(results[0].type == 1){
	 		res.cookie('uname', req.body.username);
	 		res.cookie('id',results[0].id);
	 		res.cookie('type',results[0].type);
	 		res.cookie('email', results[0].email);
	 		res.cookie('phoneno',results[0].phone_no);
	 		res.cookie('gender',results[0].gender);
	 		res.cookie('password',results[0].password);
	 		res.redirect('/owner');
			}
		else if(results[0].type == 0){
			res.cookie('uname', req.body.username);
	 		res.cookie('id',results[0].id);
	 		res.cookie('type',results[0].type);
	 		res.cookie('email', results[0].email);
	 		res.cookie('phoneno',results[0].phone_no);
	 		res.cookie('gender',results[0].gender);
	 		res.cookie('password',results[0].password);

			//res.redirect('/login');
		res.redirect('/customer');
		 }
	});
}); 

module.exports = router;