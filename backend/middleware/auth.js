const jwt = require('jsonwebtoken')
const {logger} = require('../functions/logger')
require('dotenv').config();

exports.authorizeAdmin = (req, res, next) => {
    try {
        const role = '<ADMIN ROLE ID>'

        let token = req.headers.authorization.split(' ')

        
        const key = '-----BEGIN CERTIFICATE-----\nMIIDBTCCAe2gAwIBAgIQff8yrFO3CINPHUTT76tUsTANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTIxMTAyNDE3NDU1NloXDTI2MTAyNDE3NDU1NlowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMq979bhE6xX09e87zostNcPJzvtbeu3JomS2catiEg3bXvXcPiMQke5T1dsHs3MyEYHFpmIBZ7JNo+ptdB+LSs3KmTNCSfzYoGNvaRYpsZS+/6lzAdT6KxSXZQCr6eUoI0k8C6145K9QKlsG6cxtsmVDTdxhPBr5k3qOMsHkGzQnfsjv2aaM8dCd+MBwRDLmsPmXwlJO5nSirIPhHBOGb9F4JfcD9jKSj8dFfIC2s8XulEPUoczbq7kjp3KS2CTf6EOGin+abTqda7Hw2NiCvX67ZkUyjnUPjBJknYxi//PCEHLwrO46lc+d1yqF0ZVwfLTCBjnIPiAnq+ssXtorSECAwEAAaMhMB8wHQYDVR0OBBYEFDiZG6s5d9RvorpqbVdS2/MD8ZKhMA0GCSqGSIb3DQEBCwUAA4IBAQAQAPuqqKj2AgfC9ayx+qUu0vjzKYdZ6T+3ssJDOGwB1cLMXMTUVgFwj8bsX1ahDUJdzKpWtNj7bno+Ug85IyU7k89U0Ygr55zWU5h4wnnRrCu9QKvudUPnbiXoVuHPwcK8w1fdXZQB5Qq/kKzhNGY57cG1bwj3R/aIdCp+BjgFppOKjJpK7FKS8G2v70eIiCLMapK9lLEeQOxIvzctTsXy9EZ7wtaIiYky4ZSituphToJUkakHaQ6evbn82lTg6WZz1tmSmYnPqRdAff7aiQ1Sw9HpuzlZY/piTVqvd6AfKZqyxu/FhENE0Odv/0hlHzI15jKQWL1Ljc0Nm3y1skut\n-----END CERTIFICATE-----'
        let decoded = jwt.verify(token[1], key, { 
            complete: true,
            issuer: '<ISSUER>',
            audience: '<AUDIENCE>',
        })

        // checking alg for security reasons
        if(decoded.header.alg === 'RS256' && decoded.payload.roles.includes(role)){
            logger('Signature and role of user verified: Admin')
            return next()
        }else{
            logger('A request to an admin endpoint with missing permissions was made')
            console.log(error);
            return res.status(500).send({ message: "You don't seem to have the needed permission to use this endpoint"}); 
        }        
    } catch (error) {
        logger('Validation of token failed, no authorized')
        console.log(error);
        return res.status(500).send({ message: 'Validation of token failed, no authorized', error: error});
    }
}


exports.authorize = (req, res, next) => {
    try {

        const role = [
            '<ADMIN ROLE ID>',
            '<USER ROLE ID>'
        ]

        let token = req.headers.authorization.split(' ')

        const key = '-----BEGIN CERTIFICATE-----\nMIIDBTCCAe2gAwIBAgIQff8yrFO3CINPHUTT76tUsTANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTIxMTAyNDE3NDU1NloXDTI2MTAyNDE3NDU1NlowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMq979bhE6xX09e87zostNcPJzvtbeu3JomS2catiEg3bXvXcPiMQke5T1dsHs3MyEYHFpmIBZ7JNo+ptdB+LSs3KmTNCSfzYoGNvaRYpsZS+/6lzAdT6KxSXZQCr6eUoI0k8C6145K9QKlsG6cxtsmVDTdxhPBr5k3qOMsHkGzQnfsjv2aaM8dCd+MBwRDLmsPmXwlJO5nSirIPhHBOGb9F4JfcD9jKSj8dFfIC2s8XulEPUoczbq7kjp3KS2CTf6EOGin+abTqda7Hw2NiCvX67ZkUyjnUPjBJknYxi//PCEHLwrO46lc+d1yqF0ZVwfLTCBjnIPiAnq+ssXtorSECAwEAAaMhMB8wHQYDVR0OBBYEFDiZG6s5d9RvorpqbVdS2/MD8ZKhMA0GCSqGSIb3DQEBCwUAA4IBAQAQAPuqqKj2AgfC9ayx+qUu0vjzKYdZ6T+3ssJDOGwB1cLMXMTUVgFwj8bsX1ahDUJdzKpWtNj7bno+Ug85IyU7k89U0Ygr55zWU5h4wnnRrCu9QKvudUPnbiXoVuHPwcK8w1fdXZQB5Qq/kKzhNGY57cG1bwj3R/aIdCp+BjgFppOKjJpK7FKS8G2v70eIiCLMapK9lLEeQOxIvzctTsXy9EZ7wtaIiYky4ZSituphToJUkakHaQ6evbn82lTg6WZz1tmSmYnPqRdAff7aiQ1Sw9HpuzlZY/piTVqvd6AfKZqyxu/FhENE0Odv/0hlHzI15jKQWL1Ljc0Nm3y1skut\n-----END CERTIFICATE-----'
        let decoded = jwt.verify(token[1], key, { 
            complete: true,
            issuer: '<ISSUER>',
            audience: '<AUDIENCE>',
        })


        if(decoded.header.alg === 'RS256' && (decoded.payload.roles.includes(role[0]) || decoded.payload.roles.includes(role[1]))){

            logger('Signature and role could be verified')
            return next()
            
            
        }else{
            logger('Authorization validation failed due to ALG or Role mismatch')

            return res.status(500).send({ message: "You don't seem to have the needed permission to use this endpoint"}); 
        }

    } catch (error) {
        logger('Encountered error in validating the authorization')

        return res.status(500).send({ message: 'Validation of token failed, no authorized', error: error});
    }
}