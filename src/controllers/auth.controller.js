import jwt from "jsonwebtoken";

import { encryterPassword } from "../helpers/Encryter.js";

import { generateToken, generateRefreshToken } from "../helpers/generateTokens.js";

import {User} from "../models/User.js";


export const register = async (req, res) => {
    try {
        const {email, password} = req.body;

        let userVerify = await User.findOne( {email: email} );

        if (userVerify) {
            return res.status(400).send({status: "KO", data: `The email ${email} already 😒`});
        }

        let passwordEncrypt = await encryterPassword(password);

        const userObj = new User({ email: email, password: passwordEncrypt} );

        const newUser = await User.create(userObj);

        if (newUser) {
            return res.status(201).send({status: "OK", data: newUser}); 
        }else{
            return res.status(500).send({status: "KO", data:"Error in the server"});
        }

    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
        
};

export const login = async (req, res) => { 

    try {
        
        const { email, password } = req.body;

        let user = await User.findOne( {email: email} );

        if (!user) {
            return res.status(400).send({status: "KO", data: `The email or password is incorrect`});
        }

        if (! await user.comparePassword(password)){
            return res.status(400).send({status: "KO", data: `The email or password is incorrect`});
        }
        
        const { token, expiresIn } = generateToken(user.id);
      
        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn });

    } catch (error) {
        return res.status(403).json({ error: error.message });
    }
   
};

export const infoUser = async (req, res) => {return};

export const refreshToken = (req, res) => {return};

export const logout = (req, res) => {return};

