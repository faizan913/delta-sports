const dbConn = require('../../config/db.config');


const Contact = function(contact){
    this.name = contact.name
    this.contact_no = contact.contact_no
    this.email = contact.email
    this.location = contact.location
    this.how_can_we_help = contact.how_can_we_help
    this.message = user.message
    this.created_at = new Date()
    this.updated_at = new Date()
}
Contact.create = function (contactInfo, result) {   
    //const userData =newUser
    dbConn.query("INSERT INTO contact set ?", contactInfo, function (err, res) {
        if(err) {
            result(err, null);
        }else{
            result(null, res.insertId)
        }
    })           
}
Contact.findById =  (lang,id, result)=> {
    const query = 'SELECT c.id,(select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "title" and t.locale = '+lang+')as "title" , (select t.value from translations t where t.reference_id = c.id AND t.reference_type = "categories" and t.translation_type = "description" and t.locale = '+lang+') as "description",c.parent_id FROM categories c where c.id='+id
    dbConn.query(query,  (err, res)=> {             
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    })   
} 


Contact.findAll =  (result)=> {
    const query = 'Select * from contacts'
    dbConn.query(query,  (err, res)=> {
        if(err) {
            result(null, err)
        }
        else{
            result(null, res)
        }
    })   
}

Contact.update = (id, category, result) => {
  dbConn.query("UPDATE categories SET active=?,parent_id=? WHERE id = ?", [category.active,category.parent_id, id],  (err, res) =>{
        if(err) {
            result(null, err)
        }else{  
            dbConn.query("UPDATE translations SET translation_type=?,refrence_type=? ,locale=? ,value=? WHERE reference_id = ?", 
            [category.translation_type,category.refrence_type,category.locale,category.value, id],  (err, res) =>{
                if(err) {
                    result(null, err)
                }else{   
                    result(null, res);
                }
            })
        }
    }); 
};
Contact.delete = (id, result)=>{
     dbConn.query("DELETE FROM categories WHERE id = ?", [id],  (err, res)=> {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
} 

module.exports= Contact;