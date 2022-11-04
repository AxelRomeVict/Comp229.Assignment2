let express = require('express');
let router  = espress.Router();
let mongoose = require ("mongoose");
let passport = require("passport");

//create the user Model Instance
let userModel = require ('../model/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next )=> {
        res.render('index',{title: 'Home' } );

}
module.exports.displayAboutPage = (req, res, next )=> {
    res.render('index',{title: 'About' } );
    
}
module.exports.displayProductsPage = (req, res, next )=> {
    res.render('index',{title: 'Products' } );
    
}

module.exports.displayServicesPage = (req, res, next )=> {
    res.render('index',{title: 'Services' } );
    
}
module.exports.displayContactPage = (req, res, next )=> {
    res.render('index',{title: 'Contact' } );
    
}

module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "login",
            messagers: req.flash('loginMessage'),
            displayName: requser ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server errr?
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if (!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/book-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req,res, next) => {
    if(!req.user)
    {
        res.render('auth/register',
        {
            title:'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage  = (req, res, next) =>{
    //instantiate a user object
    let newUSer = new User({
        username: req.body.email,
        //password: req.body.password
        email:req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUSer, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exist!')
            }
            return res.render('auth/register',
            {
                title:'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : '' 
            });
        }
        else
        {
            // if no error exist, then registration is successful

            //redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/book-list')
            });

        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}