const dbConn = require('../../config/db.config');


const User = function(user){
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.email = user.email
    this.phone = user.phone
    this.dob = user.dob
    this.gender = user.gender
    this.city = user.city
    this.nationality = user.nationality
    this.membership_id = user.membership_id
    this.vaccination = user.vaccination
    this.prefer_location = user.prefer_location
    this.created_at = new Date()
    this.updated_at = new Date()
}
User.create = function (newUser, result) {   
    //const userData =newUser
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
        if(err) {
            result(err, null);
        }else{
            result(null, res.insertId)
        }
    })           
}
User.findById =  (lang,id, result)=> {
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


User.findAll =  (result)=> {
    const query = 'Select * from users'
    dbConn.query(query,  (err, res)=> {
        if(err) {
            result(null, err)
        }
        else{
            result(null, res)
        }
    })   
}

User.update = (id, category, result) => {
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
User.delete = (id, result)=>{
     dbConn.query("DELETE FROM categories WHERE id = ?", [id],  (err, res)=> {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
} 

module.exports= User;