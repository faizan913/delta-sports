const Contact = require('../models/contactus.model');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
     user: 'faizanusuf913@gmail.com',
     pass: 'hassuayesha@44'
  }
});
exports.findAll = (req, res)=> {
    Contact.findAll((err, contact)=> {
        if (err){res.send(err)}
        else{
            if(contact.length>0){
                res.send({"success": true ,'data':{contact}})
            } 
            else{
                res.status(404).send({ error:false, message: 'No record found'})
        }}
    })
}
 
exports.create = (req, res) =>{
    var contact = req.body
   
    var myObj = {
        'created_at': new Date() ,  //your artist variable
        'updated_at':new Date()  //your title variable
    };
    var contactData= Object.assign(contact, myObj);

   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Contact.create(contactData, (err, Contact) =>{
            if (err){res.send(err);}
            
            else{
                const mailData = {
                    from: req.body.email,  // sender address
                      to: 'faizanusuf913@gmail.com',   // list of receivers
                      cc:'khantasneem916@gmail.com',
                      subject: 'Delta Sports: Customer inquiry',
                      //text: 'That was easy!',
                      html: '<b>Hey  </b> <br><br>'+
                      '<br> Please find the contact details: <br><br'+
                      '<table style="width:100% text-align: left;"> <tr><th>Name</th <td>'+(req.body.name)+'</td></tr><tr><th>Email</th><td>'+req.body.email+'</td></tr><tr><th>Phone no.</th><td>'+req.body.contact_no+'</td></tr><tr><th>Location</th><td>'+req.body.location+'</td></tr><tr><th>Message</th><td>'+req.body.message+'</td></tr>'+
                      '</table>'
                      +'<br/>',
                    };
                  transporter.sendMail(mailData, function (err, info) {
                    if(err)
                      console.log(err)
                    else
                    console.log('mail has sent.');
                      console.log(info);
                 });
                res.json({success:true,message:"Thank you for your message. We have received your inquiry and we will get back to you shortly.!"});
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