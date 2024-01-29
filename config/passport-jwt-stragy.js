const passport = require('passport');
const jwtstragy = require('passport-jwt').Strategy;
const jwtExtract= require('passport-jwt').ExtractJwt;
const Register = require("../models/ADMIN/register");
const user = require("../models/User/User");

var option = {
    jwtFromRequest:jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'task',
}
var option2 = {
    jwtFromRequest:jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'User',
}
passport.use(new jwtstragy(option,async(record,done)=>{
    let checkAdmin = await Register.findById(record.Admindata._id);
    if (checkAdmin) {
        return done(null, checkAdmin);
    }
    else {
        return done(null, false);
    }
}));

passport.use('user',new jwtstragy(option2,async(record,done)=>{
    let checkuser = await user.findById(record.userecord._id);
    if (checkuser) {
        return done(null, checkuser);
    }
    else {
        return done(null, false);
    }
}));

passport.serializeUser( (user, done)=> {
    return done(null, user.id);
})

passport.deserializeUser(async  (id, done)=> {
    let recheck = await Register.findById(id);
    if (recheck) {
        return done(null, recheck);
    }
    else {
        return done(null, false);        
    }
})