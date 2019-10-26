


module.exports = {
    SignupValidation
}

function SignupValidation(req, res, next){
    
    //firstname validation
    req.check('firstname','First Name is Required').notEmpty();
    
    //lastname validation
    req.check('lastname','Last Name is Required').notEmpty();
    
    //email validation
    req.check('email','Email is Required').notEmpty();
    req.check('email','Email must be 3 to 32 charecters')
       .matches(/.+\@.+\..+/)
       .withMessage('Email must contain @')
       .isLength({ min: 4, max: 32 });
    
    //password validation
    req.check('password','Password is Required').notEmpty();
    req.check('password')
       .isLength({ min: 6}).withMessage('Password must contain atleast 6 characters')
       .matches(/\d/).withMessage('Password must contain a number')
       
    const error = req.validationErrors();    
    if (error) return res.status(422).json({error});
    
    next();
}