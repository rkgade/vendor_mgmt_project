// retrieve password when username is given

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/vendor';
var user="rajkiran"
var v_name
var enable = 0
var pwd
var nodeArr
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var app1    = express();
app1.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true })); 
// app.post ends here!!!!!!!!
app.post('/search', function(req, res) {

		res.write('<html> <head> </head> <body><center>')
	v_name = req.body.v_name;
							// -- function starts here !!!!
		var searchVendor = function(db, callback) {
								
								// ----------------------------------------------------trial
								//-----------------------------------------------------trial
		   var cursor =db.collection('vendor').find({"vname":v_name});
		   
		  
			
							   cursor.each(function(err, doc) {
								   
								   
								  assert.equal(err, null);
								  if (doc != null) {
								res.write('<h2 style="LINE-HEIGHT:25px;"> Vendor Details for :'+ v_name +'</h2>')
								//res.write('<h3 style="LINE-HEIGHT:10px;">You sent the name "' + v_name + pwd + '".</h1>');
								
								license = doc.license
								products= doc.products
								length_products = products.length
								//console.dir(length_products);
								res.write('<table border="1" style="width:10% ; LINE-HEIGHT:25px;"> <tr align=center rowspan=2><b>Products</b> </tr>');
												for(var i = 0; i < length_products; i++) {
															
															res.write('<tr><td align=center>'+products[i].pid+'</td></tr>');
												}
								res.write('</table> </BR> </BR> </BR>');
								
								
								res.write('<b> License Start Date:</b>'+license[0].startdate+'</BR> </BR>');
								res.write('<b> License End Date:</b>'+license[1].enddate+'</BR> </BR> </form>');
								
								res.write('<form action="http://localhost:9090/renew"  method="post" >   ');
								res.write('<input type="hidden" id="vendor_name" name="vendor_name" placeholder="Enter Vendor Name" value="'+v_name+'" />');
								res.write('<input type="hidden" id="start_date" name="start_date" placeholder="Enter Vendor Name" value="'+license[1].enddate+'" />');
								
								res.write('<b>Next cycle End Date:</b> <input type="text" id="v_renew_date" name="v_renew_date" placeholder="yyyy-mm-dd" />    <input type=submit value="Renew" /> </form>');
								
								res.write('</center></body></html>');
								
										
										enable=1
								
								
								  }
								  else {
									  if ( enable === 0){
									  
									res.write('<html> <head> </head> <body> <b> Entered Vendor Does not exist. Kindly enter valid Vendor</b></body></html>');
									
									  }
									  
								  }
								  res.end();
											}); // cursor ends here
		

		}; // searchVendor ends here 



				MongoClient.connect(url, function(err, db) {
				 assert.equal(null, err);
				  searchVendor(db, function() {
					  db.close();
				  });
				});
							// -- function ends here !!!
								//  res.send('You sent the name "' + v_name + pwd + '".');
});
// -- app.post ends here !!!!!!


//-- renew starts here
app.post('/renew',function(req,res) {
	

	var updateVendor = function(db, callback) {
		res.write('<html> <head> </head> <body> <center>');
		
		if ( new Date(req.body.v_renew_date) < new Date(req.body.start_date) ){
			res.write('<b>End Date' + req.body.v_renew_date + ' is less than current end date. Kindly Enter Proper Date .</b>      <br>  </br></center></body></html>');
			
			
			
		}
										
								// ----------------------------------------------------trial
								//-----------------------------------------------------trial
		else {
						db.collection('vendor').update(  
								{"vname":"aditya"},  
								{
									$set: {"license" : [ {"startdate": new Date(req.body.start_date)}, { "enddate" : new Date(req.body.v_renew_date) } ] }
									
								},
										function(err, results) {
											  console.log(results);
											  callback();
										   });
						db.collection('vendor').save();
						res.write(' Vendor :'+req.body.vendor_name+' has renewed end date to '+req.body.v_renew_date+ '</center></body></html>');
						res.end();
		}
		};
		
		
	
	
	
	MongoClient.connect(url, function(err, db) {
				 assert.equal(null, err);
				  updateVendor(db, function() {
					  db.close();
				  });
				});
	
	
});
app.listen(9090, function() {
console.log('Server running at http://localhost:9090/');
});




