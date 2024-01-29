const Admin = require('../../../../models/ADMIN/register');
const Tasks = require('../../../../models/ADMIN/tasks');
const Users = require("../../../../models/User/User")
const bcrypt = require('bcrypt');
const jwtDAta = require('jsonwebtoken');
const User  = require("../../../../models/User/User");
module.exports.register = async (req, res) => {

    try {
        let checkEmail = await Admin.findOne({ email: req.body.email });
        if (checkEmail) {
            return res.status(400).json({ mes: 'Email is Already Exist', status: 0 });
        }
        else {
            if (req.body.confirm_pass == req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let ReData = await Admin.create(req.body);
                if (ReData) {
                    return res.status(200).json({ mes: 'Record is Insert', status: 1 });
                }
                else {
                    return res.status(200).json({ mes: 'Record is Not Insert', status: 0 });
                }
            }
            else {
                return res.status(200).json({ mes: 'Confirm password is not match', status: 0 });
            }

        }
    }
    catch (err) {
        return res.status(400).json({ mes: 'Record is Not Found', status: 0 });
    }
}


module.exports.login = async (req, res) => {
    try {
        let checkEmail = await Admin.findOne({ email: req.body.email });
        if (checkEmail) {
            if (await bcrypt.compare(req.body.password, checkEmail.password)) {
                let token = await jwtDAta.sign({ Admindata: checkEmail }, 'task', { expiresIn: '1h' });
                return res.status(200).json({ mes: 'Login is success', status: 1, record: token });
            }
            else {
                return res.status(200).json({ mes: 'password is not match', status: 0 });
            }
        }
        else {
            return res.status(200).json({ mes: 'Invalid Email', status: 0 });
        }
    }
    catch (err) {
        return res.status(400).json({ mes: 'Record is Not Found', status: 0 });
    }
}
//add task

module.exports.addtask = async(req,res)=>{
   try{
        let userdata = req.body.userids;
        req.body.adminid = req.user.id;
        req.body.date = new Date().toLocaleString();
        req.body.status = "pending";
        let taskdaata = await Tasks.create(req.body);
        if (taskdaata) {

            let userreg = await Users.findById(userdata);
            userreg.taskid.push(taskdaata.id);
            await Users.findByIdAndUpdate(userdata,userreg);
              // console.log(userreg);

            let adminreg = await Admin.findById(req.user.id);
            adminreg.taskid.push(taskdaata.id);
            await Admin.findByIdAndUpdate(req.user.id,adminreg);

            return res.status(200).json({ mes: 'task  is Insert', status: 1,taskrecord:taskdaata });
        }
        else {
            return res.status(200).json({ mes: 'task is Not Insert', status: 0 });
        }
   }
   catch (err) {
        return res.status(400).json({ mes: 'Record is Not Found', status: 0 });
    }
}

//show admin profile
module.exports.adminprofile = async(req,res)=>{
    try{
        let Adminrprofile = await Admin.findById(req.user.id).populate('UserId').exec();
        return res.status(200).json({ mes: 'admin data is hear', status: 1, adminrecord:Adminrprofile}); 
    }
    catch (err) {
        return res.status(400).json({ mes: 'Somthing wrong', status: 0 });
    }
}
//view all user data
module.exports.getallUser = async(req,res)=>{
    try{
        let allUserdata = await User.find({});
        if(allUserdata){
            return res.status(200).json({ mes: 'view all User data by admin', status: 1, ur: allUserdata });
        }
        else{
            return res.status(200).json({ mes: 'User data is not found', status: 0});
        }
    }
    catch (err) {
        return res.status(400).json({ mes: 'Somthing wrong', status: 0 });
    }

}