const express = require('express');
const { Router } = require('express');

const users = require('../User');
const route = express.Router();

// Sign up
route.post('/sign_up', (req, res) => {
    const {email, password, name, phone_number, state,} = req.body;

    if(!email || !password || !name || !phone_number || !state)
        return res.status(400).send({status: 'error', msg: 'All fields must be entered'});

    const valid = /@gmail.com/.test(email);
    if(!valid)
        return res.status(400).send({status: 'error', msg: 'Invalid email'});

    const not_unique = users.some((users) => {
        return users.email === email
    })

    if(not_unique)
        return res.status(400).send({status: 'error', msg: 'email already exists'});

    if(password.length < 7)
        return res.status(400).send({status: 'error', msg: 'Password must be greater than 6 characters'});

    const valid2 = /[0-9]/.test(password);    
    if(!valid2)
        return res.status(400).send({status: 'error', msg: 'Invalid Password. Password must be Alpha-Numeric'});

    const valid3 = /[a-z]/.test(password);     
    if(!valid3)
        return res.status(400).send({status: 'error', msg: 'Invalid Password. Password must be Alpha-Numeric'});

    
    users.push({
        email,
        password,
        name,
        phone_number,
        state
    });

    res.status(200).send({status: 'ok', msg: 'Success', users});
});

//login 
route.post('/login', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(400).send({status: 'error', msg: 'All fields must be entered'});

    const valid = /@gmail.com/.test(email);
     if(!valid)
        return res.status(400).send({status: 'error', msg: 'Invalid email'}); 

    const [user] = users.filter((users) => {
        return users.email === email
    });

    if(!user)
        return res.status(400).send({status: 'error', msg: 'User not found'});

    if(user.password !== password)
        return res.status(400).send({status: 'error', msg: 'Incorrect password'});
    
    res.status(200).send({status: 'ok', msg:'Success', user});
});

//all users
route.get('/all_users', (req, res) => {
    let msg = 'Success';
    if(users.length === 0)
         msg = 'There are no users';
    res.status(200).send({status: 'ok', msg, users});
});

// Edit profile
route.post('/edit_user', (req, res) => {
    const {email, password, name, phone_number, state,} = req.body;
    if(!email || !password)
        return res.status(400).send({status: 'error', msg: 'All fields must be entered'});
    const valid = /@gmail.com/.test(email);
        
    if(!valid)
        return res.status(400).send({status: 'error', msg: 'Invalid email'});  

    const [user] = users.filter((users) => {
        return users.email === email
    });
    if(!user)
        return res.status(400).send({status: 'error', msg: 'User not found'});

    if(user.password !== password)
        return res.status(400).send({status: 'error', msg: 'Incorrect password'});

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? password : user.password;
    user.phone_number = phone_number ? phone_number : user.phone_number;
    user.state = state ? state : user.state;

    let index = -1
    users.some((user) => {
        index++
        return user.email
    })

    users[index] = user;
    res.status(200).send({status: 'ok', msg: 'Success', users})
});

// view single user
route.post('/view_single_user', (req, res) => {
    const {email} = req.body;
    if(!email)
    return res.status(200).send({status: 'error', msg: 'email field must be entered'});

    const valid = /@gmail.com/.test(email);
    if(!valid)
        return res.status(400).send({status: 'error', msg: 'Invalid email'});

    const [user] = users.filter((users) => {
        return users.email === email;
    });
    if(!user)
        return res.status(400).send({status: 'error', msg: 'User not found'});
    res.status(200).send({status: 'ok', msg: 'Success', user })
})
module.exports = route;