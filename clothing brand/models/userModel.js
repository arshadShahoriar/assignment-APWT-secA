const express 	= require('express');
const bodyParser 		= require('body-parser');
const { check, validationResult }  = require('express-validator');
const urlencodedParser  = bodyParser.urlencoded({extended : false});
const db = require('./db');
let userids;
let productname;
let productcatagory;


module.exports= {
	validate: function(user, callback){//will use
		var sql = "select * from users where name='" +user.username+ "' and password='"+ user.password +"'";
		db.getResults(sql, function(results){
			//console.log(results.username);

			if(results.length >0 ){
				userids= results[0].id;
				callback(results);
			}
			else{
			 	callback(results);
			 }
		});
	},
		
		validateproduct: function(user, callback){//will use
		var sql = "select * from products where  catagory='"+user.catagory+"'  ";
			//productname = user.productname;
			productcatagory = user.catagory;


		db.getResults(sql, function(results){
			//console.log(results.username);

			if(results.length >0 ){
				//productname= results[0].Pname;
				productcatagory= results[0].catagory;
				console.log(productname);

				callback(results);
			}
			else{
			 	callback(results);
			 }
		});
	},
	/*getByIdCampaigns: function(id, callback){
		var sql = "select * from campaigns where id='"+id.c_id+"'";
		db.getResults(sql,function(results){
			callback(results);
		});
	}, */ 
		add: function(bookmarks,callback){
			// console.log("testing");
			// console.log(bookmarks.uid);
		var sql = "select SUM(price) as total from bookmarks where  uid='"+bookmarks.uid+"' ";
		db.getResults(sql,function(results){
			callback(results);
		});
	},
	getallproductsbysearch: function(callback){
		var sql = "select * from products where  catagory='"+productcatagory+"'  ";
		console.log("follow this line");
		//console.log(productname);
		console.log(productcatagory);
		db.getResults(sql,function(results){
			callback(results);
		});
	},
	getallproducts: function(callback){
		var sql = "select * from products";
		db.getResults(sql,function(results){
			callback(results);
		});
	}, 
	// getallbookmarked: function(bookmarks,callback){
	// 		// console.log("testing");
	// 		// console.log(bookmarks.uid);
	// 	var sql = "select * from bookmarks where uid='"+bookmarks.uid+"' ";
	// 	db.getResults(sql,function(results){
	// 		callback(results);
	// 	});
	// },

		
	getallbookmarked: function(callback){
		console.log(userids);
		var sql = "select * from bookmarks where uid='"+userids+"' ";
		console.log(sql);
		db.getResults(sql,function(results){
			callback(results);
		});
	},
	/*
	getAllfromusers: function(user,callback){
		var sql = "select * from users where id='"+user.id+"' ";
		db.getResults(sql,function(results){
			callback(results);
		});
	}, */
	
	insertprdocut: function(products, callback){
//	var sql	="INSERT INTO campaigns(uid,target_fund,raised_fund, ctype,description,image,publisedDate,endDate,status,title) VALUES ('"+campaign.uid+"','"+campaign.target_fund+"','"+campaign.raised_fund+"','"+campaign.ctype+"','"+campaign.description+"','"+campaign.image+"','"+campaign.Publish_date+"','"+campaign.endDate+"','"+campaign.status+"','"+campaign.title+"')";
	var sql=	"INSERT INTO products(Pname,Schart,price,catagory,model,status,image,uid,description) VALUES ('"+products.Pname+"', '"+products.Schart+"', '"+products.price+"', '"+products.catagory+"', '"+products.model+"', '"+products.status+"', '"+products.image+"', '"+products.uid+"','"+products.description+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});

		

	},
	/*insertReport: function(report, callback){
	var sql	="INSERT INTO reports(cid,uid,description,updatedDate) VALUES ('"+report.cid+"','"+report.uid+"','"+report.description+"','"+report.u_date+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});
	},

	insertContract: function(contract, callback){
	var sql	="INSERT INTO contactadmin(uid,description,UpdatedDate) VALUES ('"+contract.uid+"','"+contract.description+"','"+contract.u_date+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});
	},
	search: function(title, callback){

		var sql = "select * from campaigns where title like '%"+title.name+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
*/
	
	insertbookmarks: function(book, callback){
	var sql	="INSERT INTO bookmarks(pid,uid,date,price) VALUES ('"+book.cid+"','"+book.uid+"','"+book.u_date+"','"+book.price+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});
	}, 
	registration: function(user, callback){
	var sql	="INSERT INTO users(name,email,phone_no,gender,password,type) VALUES ('"+user.username+"','"+user.email+"','"+user.phone_no+"','"+user.gender+"','"+user.password+"','"+user.type+"')";
			db.execute(sql,function(status){
			callback(status);
			
		});
	},/*
	getbyName: function(user,callback){
		var sql = "select * from users where username='" +user.username+ "' and password='"+ user.password +"'";
		db.getResults(sql,function(results){
			callback(results);
		});
	}, */
	updateProfile:function(user, callback){
		var sql="UPDATE users set id='"+user.uid+"', name='"+user.username+"', email='"+ user.email +"',phone_no='"+ user.phoneno +"',gender='"+ user.gender +"',password='"+ user.password +"',type='"+ user.type+ "' where id= '"+ user.uid+"' ";
		db.execute(sql,function(status){
			console.log(sql);
				callback(status);
			
		});
	},
	update:function(user, callback){
		var sql="update products set id='"+user.id+"', Pname='"+user.Pname+"', Schart='"+ user.Schart +"',price='"+ user.price +"',catagory='"+ user.catagory +"',model='"+ user.model +"',status='"+ user.status+ "',image='"+user.image+"',uid='"+user.uid+"',description='"+user.description+"' where id= '"+ user.id +"'  ";
		console.log(sql);
		db.execute(sql,function(status){
				callback(status);
			
		});
	},
	delete: function(user, callback){
		var sql="delete from products where id ='"+user.id+"' ";
			db.execute(sql,function(status){
				callback(status);
			
		});
	} ,
	deletebookmark: function(user, callback){
		var sql="delete from bookmarks where id ='"+user.id+"' ";
			db.execute(sql,function(status){
				callback(status);
			
		});
		}
}