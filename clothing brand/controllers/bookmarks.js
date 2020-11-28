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
		var user ={
			uid :	req.cookies['id']
		};
		//userModel.setuserid(user);

		userModel.getallbookmarked(function(results){
		res.render('bookmarks/getbookmarked', {users: results});
		});
	});

router.get('/buyinfo', (req, res)=>{
		// userModel.getallproducts(function(results){
		// res.render('customer/index', {users: results});
		// });
		var user ={
			uid :	req.cookies['id']
		};
		var totalprice;
		userModel.add(user,function(results){
			totalprice = {
				total : results[0].total

			}
			console.log(totalprice.total);
			});
		userModel.getallbookmarked(function(results){

		res.render('bookmarks/buyinfo', {users: results,totalprice});
		});
	});


router.get('/delete/:id', (req, res)=>{
	console.log("delete get");
			var deleteCampaigns ={
			id : req.params.id
			};

			userModel.deletebookmark(deleteCampaigns, function(status){
			if(status){
			
			console.log('deleted');
			res.redirect('/bookmarks');
			}else{
			//res.redirect('/login');
			console.log('not deleted');
			res.redirect('/bookmarks');
			}
		});

	
	});
//report

	


module.exports = router;

