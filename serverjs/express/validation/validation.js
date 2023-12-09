
const JOI = require('joi');



const registerValidation = async data => {

    const schema = JOI.object({
        username: JOI.string()
            .min(6)
            .required(),
        email: JOI.string()
            .min(6)
            .required()
            .email(),
        password: JOI.string()
            .min(6)
            .required(),
    })

    try {
        const value = await schema.validateAsync(data)
        return {
            error: false,
            message: 'Successfully submitted'
        }
    } catch (err) {
        const errMsg = err.details[0].message
        return {
            error: true,
            message: errMsg
        }
    }


}


const loginValidation = async data => {

    const schema = JOI.object({
        email: JOI.string()
            .min(6)
            .required()
            .email(),
        password: JOI.string()
            .min(6)
            .required(),
    })

    try {
        const value = await schema.validateAsync(data)
        return {
            error: false,
            message: 'Successfully submitted'
        }
    } catch (err) {
        const errMsg = err.details[0].message
        // console.log(errMsg)

        return {
            error: true,
            message: errMsg

        }
    }

}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation 