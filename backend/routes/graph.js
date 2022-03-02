const express = require("express");

const router = express.Router();
const axios = require('axios')
const { logger } = require("../functions/logger");


require('dotenv').config();

router.get('/users', async(req, res) => {
    logger('Requesting complete user list from Azure AD Graph API')


    let token_arr = req.headers.authorization.split(' ')
    let token = token_arr[1]
    axios.get('https://graph.microsoft.com/v1.0/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(data => {

            let userList= [];
            data.data.value.map(user => {
                userList.push({ name: user.displayName, id: user.id })
            })

            logger('Successfully retrieved user list from Azure AD Graph API')
            res.status(200).json(userList);
        })
        .catch(error => {
            console.log(error);
            logger('Error occured on retrieving user list from Azure AD Graph API')
            res.status(500).json({error});
        })
})


module.exports = router;