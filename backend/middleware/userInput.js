const {check, validationResult } = require("express-validator");

exports.checkUpdateServiceInput = (req, res, next) => {
    check('id', 'ID seems to be faulty').not().isEmpty(),
    check('name', "Bitte tragen Sie einen gültigen Benutzernamen ein.")
    .not()
    .isEmpty(),
    check('mail', "Bitte tragen Sie eine gültige Email Adresse ein.")
    .isEmail()

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }else{
        next(); 
    }
};

exports.checkAddServiceInput = (req, res, next) => {
    check('name', 'Please enter a service name.')
    .not().isEmpty().isLength({ min: 2, max: 25 }),
    check('username', 'Please enter a username.')
    .not().isEmpty().isLength({ min: 2, max: 25 }),
    check('mail', "Please enter a valid email.")
    .not().isEmpty().isEmail().isLength({ min: 8, max: 40 }),
    check('secret', 'Please provide a secret "String".')
    .not().isEmpty().isLength({ max: 5, min: 100 })

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }else{
        next();
    }
}