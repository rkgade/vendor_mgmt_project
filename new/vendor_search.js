// retrieve password when username is given

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/vendor';
//var user="rajkiran"
var dateFormat = require('dateformat');
var now = new Date();
 
var v_name
var enable = 0
var pwd
var nodeArr
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var app1    = express();

//Used to access target directory from browser
app.use(express.static(__dirname));
app1.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true })); 


//  For executing python scripts

var PythonShell = require('python-shell');

PythonShell.run('pymongo_script.py', function (err, pyresult) {
  if (err) throw err;
 else 
 {
	console.dir(pyresult);
	app.get('/',function(req,res) {
	res.write('<html><head> </head> <body>'+ pyresult+'</body></html>');
	res.end();
});

 }
  console.log('finished');
});

//------------
//app.get('/',function(req,res) {
//res.write('hiiiii');
//res.end();
//});
//------------



// Python Script ends here


// app.post for search begins here
app.post('/search', function(req, res) {
//console.dir(dateFormat(now,"yyyy-mm-dd"));
		res.write('<html> <head> </head> <body><center>')
	v_name = req.body.v_name;
							// -- function starts here !!!!
		var searchVendor = function(db, callback) {
								
								// ----------------------------------------------------trial
								//-----------------------------------------------------trial
		   var cursor =db.collection('vendor').find({"vname":v_name});
		   
								console.dir(v_name);
			
							   cursor.each(function(err, doc) {
								   
								   
								  assert.equal(err, null);
								  if (doc != null) {
								res.write('<h2 style="LINE-HEIGHT:25px;"> Vendor Details for : '+ v_name +'</h2>');
								//res.write('<h3 style="LINE-HEIGHT:10px;">You sent the name "' + v_name + pwd + '".</h1>');
								
								//license = doc.license
								products= doc.products
								length_products = products.length
								//console.dir(products[].plicense.length);
								console.dir
								console.dir(length_products);
								res.write('<form name="update_vendor" action="http://localhost:9090/search"  method="post">');
								res.write('<table border="1" style="width:70% ; "> <tr align=center> <th><b>Products</b></th><th><b>License Start Date</b></th><th><b> License End Date </b> </th><th> <b> Renew Date</b></th><th><b>Status</b></th> <th> <b>Comments</b></th></tr>');
											//	res.write('<tr><td> 
												
												for(var i = 0; i < length_products; i++) 
												{
													
											//		res.write('Number of licenses for '+products[i].pname+' are :'+products[i].plicense.length);	
													res.write('<tr><td rowspan="3" align=center width="10%";height="20%";><input type="text" name="pname" readonly value="'+products[i].pname+'"></td>');
											//		res.write('<table border="1" style="width:100% ; " >');
															for ( var j = 0 ; j < products[i].plicense.length ; j++){
																
																res.write('<tr><td width="15%";height="20%";><input type="text" name="l_sdate" readonly value="'+ dateFormat(products[i].plicense[j].lstartdate,"yyyy-mm-dd")+'"/></td><td width="15%";height="20%";><input type="text" name="l_edate" readonly value="'+dateFormat(products[i].plicense[j].lenddate,"yyyy-mm-dd")+'"></td><td align=center width="30%";height="20%";><b></b> <input type="date" id="l_renew_date" name="l_renew_date" placeholder="yyyy-mm-dd" /></td> <td><select id="lstatus" name="lstatus"><option selected>'+products[i].plicense[j].lstatus+'</option><option>To be initiated</option><option >Triggered with Vendor</option><option >PO initiated with Purchase</option><option >PO available</option><option>PO Shared with vendor</option><option>Renewal document signed</option><option>Renewed</option></select></td><td><input type="textarea" name="lcomments" placeholder="'+ products[i].plicense[j].lcomments+'"/></td></tr>');
															
															
															}
																					
											//		res.write('</table></tr>');
												res.write('</tr>');
															
												}
								res.write('</table>   </BR> </BR> </BR>');
								res.write('</form>');
								
//								res.write('<b> License Start Date:</b>'+license[0].startdate+'</BR> </BR>');
//								res.write('<b> License End Date:</b>'+license[1].enddate+'</BR> </BR> </form>');
								
								
								
								
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


app.post('/add_vendor', function(req, res) {
//console.dir(dateFormat(now,"yyyy-mm-dd"));
		res.write('<html> <head> </head> <body><center>')
	
							// -- function starts here !!!!
		var addVendor = function(db, callback) {
					vendorname=req.body.vname
					pname=req.body.pname
					licenseno=req.body.pliscenceno
					status=req.body.selected_opt
					comments = req.body.comments
					start_date=req.body.sdate
					end_date=req.body.edate;
					
			//res.write('<html> <head> </head> <body> <center>');
//new Date(req.body.v_renew_date) < new Date(req.body.start_date)
			if ( 2 < 1 )
			{
				//res.write('<b>End Date' + req.body.v_renew_date + ' is less than current end date. Kindly Enter Proper Date .</b>      <br>  </br></center></body></html>');
							
			} 	
			
			else {
				
							db.collection('vendor').insert(            { "vname":vendorname ,
                                "products":
												[
													{"pname":pname,
													"plicense": [ 	{"licenseno":licenseno,"lstartdate": new Date(start_date)  , "lenddate": new Date(end_date) ,"lstatus":status, "lcomments":comments
																	},  
																	
																]
																								
													} ,
												
												], 
											}
											);

							db.collection('vendor').save();
							//res.write(' Vendor :'+req.body.vendor_name+' has renewed end date to '+req.body.v_renew_date+ '</center></body></html>');
							res.end();
				}
						
							  
		

		}; // addVendor ends here 



				MongoClient.connect(url, function(err, db) {
				 assert.equal(null, err);
				  addVendor(db, function() {
					  db.close();
				  });
				});
							// -- function ends here !!!
								//  res.send('You sent the name "' + v_name + pwd + '".');
});
//-- add_vendor here

app.listen(9090, function() {
console.log('Server running at http://BLRKEC325016D:9090/');
});




