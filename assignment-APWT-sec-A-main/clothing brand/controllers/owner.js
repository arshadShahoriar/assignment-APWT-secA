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
		var volenteer =	req.cookies['uname'];
		var id =	req.cookies['id'];
		res.render('home/owner', {name: volenteer , id: id});
	});

	router.get('/user', (req, res)=>{
		res.redirect('/user');
	});

	router.get('/addproduct', (req, res)=>{
		user ={
			username : req.cookies['uname'],
			id  : req.cookies['id']
		};
		
		res.render('owner/addproduct',user);

	});

/// post product
	router.post('/addproduct',(req, res)=>{


   

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
		console.log(imagename+"uploaded");
		}
		})
		}
		var products = {
			uid : req.cookies['id'],
			Pname : req.body.Pname,
			Schart	: req.body.Schart,
			price	:  req.body.price,
			catagory	: req.body.catagory,
			model : req.body.model,
			status	: req.body.status,
			image:  imagename,
			description : req.body.s_des
		
		

	};
			
	userModel.insertprdocut(products, function(status){
		if(status){
			//res.cookie('uname', req.body.username);
			//res.redirect('/home');
			console.log('inserted');
			//var volenteer =	req.cookies['uname'];
		//var id =	req.cookies['id'];
		user ={
			username : req.cookies['uname'],
			id  : req.cookies['id']
		};
		console.log("asds");
		res.render('owner/addproduct',user);

		}else{
			//res.redirect('/login');
			console.log('not inserted');
		}
	});

});
//get all
router.get('/getallproducts', (req, res)=>{
		//use usermode code and retrive all products in object
		res.redirect('/products')
			console.log("products work");
		//res.render('owner/getallproduct',user);
		

	});

//edit product
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
	
		res.render('owner/edit', products);
	});

	
		router.post('/edit/:id/:Pname/:description/:Schart/:price/:catagory/:model/:status/:image/:uid', (req, res)=>{
	console.log("post works");
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
			
			var user = {
			c_id : req.body.id,
			uid :req.cookies['id'],
			target_fund: req.body.target_fund,
			raised_fund: req.body.raised_fund,
			ctype		:  req.body.ctype,
			description	: req.body.description,
			image :  imagename, //req.body.img
			Publish_date: req.body.Publish_date,
			endDate		: req.body.endDate,
			status : req.body.status,
			title :  req.body.title
		

		};
		userModel.update(user, function(status){
			if(status){
			
			console.log('update');
			res.redirect('/home/campaigns');
			}else{
		
			console.log('not update');
			}
		});
	});

		router.get('/editprofile', (req, res)=>{
	console.log("sent to controller");
		res.redirect('/profile');
		
	});

//report
/*

	router.get('/report/:id', (req, res)=>{

		var reportid={
			 c_id  : req.params.id,
		 	Uid :	req.cookies['id']
		};
	
	
	//console.log("getworks");
		res.render('user/report', reportid);
	
	});

	router.post('/report/:id', (req, res)=>{


	var report = {
		uid :	req.cookies['id'],
 		cid : req.body.cid,
 		description : req.body.description,
 		 u_date : req.body.U_date

		};


	userModel.insertReport(report, function(status){
		if(status){
			
			console.log('inserted report');
			res.redirect('/home/campaigns');
		}else{
			
			console.log('not inserted report');
		}
	});

	});

//bookmarks
	router.get('/bookmarks/:id', (req, res)=>{
		var d= new Date();
		month= d.getMonth().toString();
		date = d.getDate().toString();

		date=date+"-"+month;
		var bookmarkID ={
		cid : req.params.id,
		uid :	req.cookies['id'],
		u_date : date
		};
		userModel.insertbookmarks(bookmarkID, function(status){
		if(status){
			//console.log("book");
				var mg = encodeURIComponent('**bookmarked!');
				res.redirect('/home/campaigns?msg='+mg);
		}else{
			//res.redirect('/login');
			console.log('not inserted bookmark');
		}
		});
	
	});

	router.post('/bookmarks/:id', (req, res)=>{

	});

//edit
		router.get('/edit/:id/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:status/:title', (req, res)=>{

		var retrive_campaigns ={
			c_id : req.params.id,
			uid :	req.cookies['id'],
			target_fund : req.params.target_fund,
			raised_fund : req.params.raised_fund,
			ctype 		: req.params.ctype,
			description : req.params.description,
			 image 		:  req.params.image,
			publisedDate: req.params.publisedDate,
			endDate		: req.params.endDate,
			status		: req.params.status,
			title		: req.params.title
			};
	
		res.render('user/edit', retrive_campaigns);
	});

		router.post('/edit/:id/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:status/:title', (req, res)=>{

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
			
			var user = {
			c_id : req.body.id,
			uid :req.cookies['id'],
			target_fund: req.body.target_fund,
			raised_fund: req.body.raised_fund,
			ctype		:  req.body.ctype,
			description	: req.body.description,
			image :  imagename, //req.body.img
			Publish_date: req.body.Publish_date,
			endDate		: req.body.endDate,
			status : req.body.status,
			title :  req.body.title
		

		};
		userModel.update(user, function(status){
			if(status){
			
			console.log('update');
			res.redirect('/home/campaigns');
			}else{
		
			console.log('not update');
			}
		});
	});

//deleted
	
*/
		router.get('/delete/:id', (req, res)=>{
			var deleteCampaigns ={
			c_id : req.params.id
			};

			userModel.delete(deleteCampaigns, function(status){
			if(status){
			
			console.log('deleted');
			res.redirect('/owner/getallproducts');
			}else{
			//res.redirect('/login');
			console.log('not deleted');
			res.redirect('/owner/getallproducts');
			}
		});

	
	});

		router.post('/delete/:id', (req, res)=>{
		
	});
//search
	


module.exports = router;

