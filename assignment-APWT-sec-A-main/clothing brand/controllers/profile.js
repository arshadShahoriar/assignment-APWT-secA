const express 	= require('express');
const bodyParser 		= require('body-parser');
const { check, validationResult }  = require('express-validator');
const urlencodedParser  = bodyParser.urlencoded({extended : false});
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

	router.get('*',  (req, res, next)=>{
		if(req.cookies['uname'] == null){
		res.redirect('/login');
		}else{
		next();
		}
	});

router.get('/', (req, res)=>{
		// userModel.getallproducts(function(results){
		// res.render('customer/index', {users: results});
		// });
		var user = {
			uid :	req.cookies['id'],
			username :	req.cookies['uname'],
			type :	req.cookies['type'],
			email :	req.cookies['email'],
			phoneno :	req.cookies['phoneno'],
			gender :	req.cookies['gender'],
			password :	req.cookies['password']
		};


		res.render('profile/editprofile', user);
			});

router.post('/', (req, res)=>{
		// userModel.getallproducts(function(results){
		// res.render('customer/index', {users: results});
		// });

		var user = {
			uid :	req.cookies['id'],
			username: req.body.username,
			email : req.body.email,
			phoneno : req.body.phone_no,
			gender : req.body.gender,
			password : req.body.password,
			type	: req.body.type
		};
		console.log(user);
		
		userModel.updateProfile(user, function(status){
		
		if(status){
	 		//res.redirect('/login');
	 		console.log("uppdated info");

			}
		else{
			//res.redirect('/registration');
		//	res.render('login/index');
		 }
	});


		res.render('profile/editprofile', user);
			});

// router.get('/buyinfo', (req, res)=>{
// 		// userModel.getallproducts(function(results){
// 		// res.render('customer/index', {users: results});
// 		// });
// 		var user ={
// 			uid :	req.cookies['id']
// 		};
// 		var totalprice;
// 		userModel.add(user,function(results){
// 			totalprice = {
// 				total : results[0].total

// 			}
// 			console.log(totalprice.total);
// 			});
// 		userModel.getallbookmarked(function(results){

// 		res.render('bookmarks/buyinfo', {users: results,totalprice});
// 		});
// 	});


// router.get('/delete/:id', (req, res)=>{
// 	console.log("delete get");
// 			var deleteCampaigns ={
// 			id : req.params.id
// 			};

// 			userModel.deletebookmark(deleteCampaigns, function(status){
// 			if(status){
			
// 			console.log('deleted');
// 			res.redirect('/bookmarks');
// 			}else{
// 			//res.redirect('/login');
// 			console.log('not deleted');
// 			res.redirect('/bookmarks');
// 			}
// 		});

	
// 	});
// //report

	


module.exports = router;

