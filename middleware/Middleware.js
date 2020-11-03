const moment = require('moment');
// CREATING A MIDDLEWARE
/**
 *  has  access to request response objects and next ( for next middleware on the stuck)
 * all this happens everytime a request is made 
 */
const logger = (req,res,next) => {
    //console.log('Hello') middleware that just logs hello onto the console
    // this logs out the url request and date
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
    next();
}


module.exports = logger;
