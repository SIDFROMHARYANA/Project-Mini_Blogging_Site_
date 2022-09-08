const authorModel = require('../Model.js/Authormodel')
const jwt= require("jsonwebtoken")
const validator=require('validator')


const createAuthor = async (req, res)=>{
 
    try {
        let body=req.body
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ Error: "Body  should be not emety" })
        }
        if(!(body.title && body.fname &&body.lname && body.password && body.email)){
            return res.status(400).send({status:false,msg:"All field are required !"})
        }
        if(!validator.isEmail(body.email)){
            return res.status(400).send({status:false, msg:"Please Provide Valid Email !"})
        }
        let data = new authorModel(req.body)
        let result = await data.save()
        res.status(201).send({status:true, data:result})
    }
    catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }


}

const login=async function(req,res){
    try{ 
        let email =req.body.email
        let password =req.body.password
        let data =req.body
        if(Object.keys(data).length==0) return res.status(400).send({status:false,msg:"no input provid"})
        if(!email) return res.status(400).send({status:false,msg:"email is required"})
        if(!password) return res.status(400).send({status:false,msg:"password is required"})
        const user = await authorModel.findOne({email:email,password:password})
        if (!user) return res.status(400).send({status:false,msg:"user are not exsit"})
         const token = jwt.sign({
            userId:user._id.toString(),
            batch:"plutonium",

         },"this is a secreat key")
         res.setHeader("x-api-key",token)
         
         res.status(200).send({status:true, token:token})





    }
    catch(error){
       return res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createAuthor=createAuthor
module.exports.login=login