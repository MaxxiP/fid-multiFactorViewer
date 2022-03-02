const express = require("express");

const speakeasy = require('speakeasy');
const { logger } = require("../functions/logger");
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const InputMiddleware = require('../middleware/userInput');


const Service = require("../model/Service");

require('dotenv').config();

router.get('/test', AuthMiddleware.authorizeAdmin, async(req, res) => {
    console.log('Test API Endpoint with authentication middleware');
    res.send({ message: "Test API Endpoint with authentication middleware"})
})


router.get('/services', AuthMiddleware.authorizeAdmin, async(req, res) => {
        Service.find()
        .exec((err, data) => {

        if(err) throw err;


        let userServiceInfo = []; 
        data.map((info => {

            userServiceInfo.push({ 
                name: info.name,
                mail: info.mail,
                username: info.username,
                id: info._id,
                assigned_user: info.assigned_user
            });
        }));

        res.status(200).json(userServiceInfo);
    });
})


router.get('/service/:id', AuthMiddleware.authorizeAdmin, async(req, res) => {
    const { id } = req.params
    logger('Find service with ID: ' + id)

    Service.findOne({ _id: id })
    .exec((err, data) => {

    if(err) {
        logger('Error occured in getting single Service')
        res.status(500).json(err)
    }else{
        logger('Successfully retrieved single Service, sending to frontend')
        res.status(200).json(data);
    }
    
    });

})


router.get('/userServices/:id', AuthMiddleware.authorize, async(req, res) => {
    try {

        const { id } = req.params

        logger('Getting all Services that have logged in user assigned')
        Service.find().where({ "assigned_user.id" : id}).select('+secret')
        .exec((err, data) => {

            if(err) throw err;


            let userServiceInfo = []; 
            data.map((info => {
                try {
                    let token = speakeasy.totp({
                        secret: info.secret,
                        digits: info.options.digits, 
                        step: 30,
                        encoding: info.options.base_encoding
                    })

                    userServiceInfo.push({ 
                        name: info.name,
                        mail: info.mail,
                        username: info.username,
                        id: info._id,
                        code: token.substring(0,3) + ' ' + token.substring(3, token.length)
                    });
                
                } catch (error) {
                    logger('Generation of TOTP Code failed')
                    console.log(error);   
                }
            }));

            res.status(200).json(userServiceInfo);
        });  
    } catch (error) {
        logger('An error in retrieving the Services a user was assigned to occured')
        res.status(500).json(error);
    }

})


router.post('/service', AuthMiddleware.authorizeAdmin, InputMiddleware.checkAddServiceInput, async(req, res) => {
    try {
        const {
            name,
            mail,
            secret
        } = req.body;

        const options = { 
            base_encoding: req.body.base_encoding || 'base_64', 
            digits: req.body.digits || 6
        };

        const assigned_user = []

        let service = await Service.findOne({ secret });

        if(service){
            logger('A service with provided secret already exists, could ne create new service')
            res.status(409).send({ error: 'A service with this secret already exists'});
        }else{
            service = new Service({
                name,
                mail,
                secret,
                options,
                assigned_user
            });

            logger('The new service "' + service.name + '" was successfully created')
            await service.save().then(res.status(200).send({ message : 'Successfully added Service'}));    

        };

        

    } catch (error) {
        logger('A serversided error occured on creation of a new service')
        console.error(error);
        res.status(500).send({ error : 'An error occured serversided'})  
    }
})


router.patch('/service/:id', AuthMiddleware.authorizeAdmin, InputMiddleware.checkAddServiceInput, async(req, res) => {
    try {
        const { id, name, mail, username, secret, encoding, digits, assigned_user } = req.body;

        let service;

            Service.findOne({ _id: id})
            .select('+secret')
            .exec((err, data) => {
                if(err) throw err;
                service = data;
                logger('Retrieved data from Service to be changed + secret')
                    service = {
                        name: name ? name : service.name,
                        mail: mail ? mail : service.mail,
                        username: username ? username : service.username,
                        secret: secret ? secret : service.secret,
                        options: {
                            base_encoding: encoding ? encoding : service.encoding,
                            digits: digits ? digits : service.digits
                        },
                        assigned_user : assigned_user ? assigned_user : service.assigned_user            
                    }
            
                    Service.findOneAndUpdate({ _id: id }, service, { useFindAndModify: false })
                    .then((service) => {
                        logger('Successfully updated service ' + service.name)
                        return res.status(200).send({ message: 'Service updated.'});
                    }).catch((err) => {
                        console.log(err);
                        logger('An error occured trying to update the service ' + id)
                        return res.status(500).send({ message: 'There was an error on updateing the user.', error: err})
                    });
            });
    } catch (error) {
        console.log(error);
        logger('A serversided error occured on updating of a service')
        console.error(error);
        res.status(500).send({ error : 'An error occured serversided'}) 
    }
})

router.delete('/service/:id', AuthMiddleware.authorizeAdmin, async(req, res) => {
    try {
        Service.findByIdAndDelete(req.params.id).exec((err, data) => {
            if(err) throw err;
            logger('Service ' + data.name + ' was deleted')
            res.status(200).json(data);
        });
    } catch (error) {
        logger('An error occured while trying to delete the service ' + req.params.id)
        res.status(400).json({ message: error});
    }
});


module.exports = router;