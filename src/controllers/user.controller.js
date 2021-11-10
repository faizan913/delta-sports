const User = require('../models/user.model');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
     user: 'faizanusuf913@gmail.com',
     pass: 'hassuayesha@44'
  }
});
exports.findAll = (req, res)=> {
    User.findAll((err, users)=> {
        if (err){res.send(err)}
        else{
            if(users.length>0){
                res.send({"success": true ,'data':{users}})
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}
 
exports.create = (req, res) =>{
    var newCat = req.body
    var myObj = {
        'created_at': new Date() ,  //your artist variable
        'updated_at':new Date()  //your title variable
    };
    var userdata= Object.assign(newCat, myObj);
    console.log(userdata)
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        User.create(userdata, (err, user) =>{
            if (err){res.send(err);}
            
            else{
                const mailData = {
                    from: req.body.email,  // sender address
                      to: 'faizanusuf913@gmail.com',   // list of receivers
                      cc:'amir.mohammad.92@gmail.com',
                      subject: 'Delta Sports: Customer Registration details',
                      //text: 'That was easy!',
                      html: '<b>Hey </b> <br><br>'+
                      '<br> Please find the Volunteer registration details: <br><br>'+
                      '<table style="width:100% text-align: left;"> <tr><th>Name</th <td>'+(req.body.firstname+req.body.lastname)+'</td></tr><tr><th>Email</th><td>'+req.body.email+'</td></tr><tr><th>Phone no.</th><td>'+req.body.phone+'</td></tr><tr><th>City</th><td>'+req.body.city+'</td></tr>'+
                      '<tr><th>Vaccine</th><td>'+req.body.vaccination+'</td></tr><tr><th>Prefer Location</th><td>'+req.body.prefer_location+'</td></tr></table>'
                      +'<br/>',
                    };
                  transporter.sendMail(mailData, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                    console.log('mail has sent.');
                      console.log(info);
                 });
                res.json({success:true,message:"User added successfully!",data:user});
            }
        });
    }
}




exports.findById = (req, res)=> {
    var locale = (JSON.stringify(req.headers['locale']))
    let lang = (locale === undefined) ? "\"en\"" :locale  
    User.findById(lang,req.params.id, (err, user)=> {
        if (err){res.send(err)}
        else{
            if(user.length>0){
                
                res.send({"success": true ,'data':{'category':user[0]}})
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}


exports.update = (req, res) =>{
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Category.update(req.params.id, new Category(req.body), (err, category) =>{
            if (err)
            res.send(err)
            res.json({ success:true, message: 'Category successfully updated' });
        })
    }
  
}


exports.delete = (req, res) =>{
    User.delete( req.params.id, (err, category) =>{
    if (err)
    res.send(err);
    res.json({ success:true, message: 'Category  deleted', data:  category});
  })
}