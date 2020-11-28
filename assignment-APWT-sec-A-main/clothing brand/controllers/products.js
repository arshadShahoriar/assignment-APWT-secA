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
		userModel.getallproducts(function(results){
		res.render('products/getallproducts', {users: results});
		});
	});

	router.get('/edit/:id/:Pname/:description/:Schart/:price/:catagory/:model/:status/:image/:uid', (req, res)=>{
			
			console.log("edit get");
		
		var products ={
			id : req.params.id,
			//uid :	req.cookies['id'],
			Pname : req.params.Pname,
			description : "asasd",
			Schart		: req.params.Schart,
			price : req.params.price,
			catagory	:  req.params.catagory,
			model 	: req.params.model,
			status	: req.params.status,
			image		: req.params.image,
			uid	: req.params.uid
			};
	
		res.render('products/edit', products);
	});

		router.post('/edit/:id/:Pname/:description/:Schart/:price/:catagory/:model/:status/:image/:uid', (req, res)=>{
	console.log("get edited");
	var file;
	var imagename;
	var images;

				if(req.files)
		{	
			console.log("if image");

			 file = req.files.image;
			imagename = file.name;
			images='/upload/'+imagename;
		file.mv('./upload/'+imagename,function(err){
		if(err)
		{
		console.log(err);
		}
		else{
		console.log(imagename+"updated");
		}
		})
		}
			
			var products = {
			uid : req.cookies['id'],
			id : req.body.id,
			Pname : req.body.Pname,
			Schart	: req.body.Schart,
			price	:  req.body.price,
			catagory	: req.body.catagory,
			model : req.body.model,
			status	: req.body.status,
			image:  imagename,
			description : req.body.description
		
		

	};

	console.log(products);
		userModel.update(products, function(status){
			if(status){
			
			console.log('update');
			res.redirect('/products');
			}else{
		
			console.log('not update');
			}
		});
	});

		router.get('/delete/:id', (req, res)=>{
			var deleteCampaigns ={
			id : req.params.id
			};

			userModel.delete(deleteCampaigns, function(status){
			if(status){
			
			console.log('deleted');
			res.redirect('/products');
			}else{
			//res.redirect('/login');
			console.log('not deleted');
			res.redirect('/products');
			}
		});

	
	});

		

	


module.exports = router;

