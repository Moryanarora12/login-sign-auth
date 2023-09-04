const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { ApolloError, AuthenticationError } = require("apollo-server-express");
module.exports={
    Query:{
        users: async(_,args,{knex})=>{
            const user = knex("users").select("*");
            return user;
        }
    },
    Mutation:{
        register: async(_,{name,email,password,address},{knex})=>{
            const existingUser = await knex("users").where({email}).first();
            if(existingUser){
                throw new Error("Email Already Exists");
            }
            
            const hashedPassword = await bcrypt.hash(password,saltRounds);
            await knex("users").insert({
                name,
                email,
                password: hashedPassword,
                address
            });
            return "Successfully Registered!"
        },
        login: async (_,{email,password},{knex})=>{
            const user = await knex("users").where({email}).first();
            if(!user){
                throw new Error("Email doesn't exists");
            }
            const passwordMatch = await bcrypt.compare(password,user.password);
            if(!passwordMatch){
                throw new Error("Invalid Credentials");
            }
            const token = jwt.sign({ user }, process.env.secret, { expiresIn: "30 days" });
            if(token){
                return "TRUE"
            }else{
                throw new ApolloError("Error")
            }
        },
    }
}