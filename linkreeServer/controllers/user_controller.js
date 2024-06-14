const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = 'amira_web'; 

exports.signup = async (req, res)=>{
    setTimeout(async() =>{

        const user = await User.findOne({ '$or': [{ username: req.body.username }, { email: req.body.email }] });
        
        
        if(user){

            return res.json({
                success : false,
                message : "Username or email already exist."
            })
        }
        // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        // const truncatedHash = hashedPassword.substring(0, 40);
        const newUser = new User ({
            username : req.body.username,
            email : req.body.email,
            role : 'client',
            gender : req.body.sex,
            password : req.body.password
        });

        await newUser.save();
        
        res.json({
            success : true
        });
    }, 1000);
        
}



exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        // const match = await bcrypt.compare(submittedPassword, user.password);
  
        if (req.body.password == user.password) {
          const token = jwt.sign({ id: user._id }, jwtSecret);
          user.token = token;
          await user.save();
          
          return res.json({
            success: true,
            token: token,
            userid: user._id,
          });
        } else {
          return res.json({
            success: false,
            message: 'Incorrect password.',
          });
        }
      } else {
        console.log(`User not found for email: ${req.body.email}`);
        return res.json({
          success: false,
          message: 'User not found.',
        });
      }
    } catch (error) {
      console.error(`Error during login: ${error}`);
      return res.status(500).json({
        success: false,
        message: 'Error logging in.',
      });
    }
  };
  
  
  



// exports.getData = async(req, res)=>{
//     const token = req.headers['token'];
//     //verification
//     if(token ){
//         jwt.verify(token, jwtSecret, async(err , id) => {
//             const user = await User.findOne({_id : id});
//             if(user.token && user.token != token){
//                 return res.json({
//                     success : false,
//                     message : "Invalid token."
//                 }) 
//             }
//             if(err){
//                 return res.json({
//                     success : false,
//                     message : "Invalid token."
//                 })
//             }
//             res.json({
//                 success : true
//             })
//         })
//     }
// }


exports.logout = async(req, res)=>{
    const token = req.headers['token'];
    if(token){
        jwt.verify(token, jwtSecret, async(err , authUser) => {
            if(authUser.id == req.headers['userid']){
                const user = await User.findOne({_id : authUser.id});
                if(user.token && user.token != token){
                    return res.json({
                        success : false,
                        message : "Invalid token."
                    })
                }
                if(err){
                    return res.json({
                        success : false,
                        message : "Invalid token."
                    })
                }
                user.token = null;
                await user.save();
                res.json({ success: true, message: 'Logged out successfully.' });
            }
        })
    }
}