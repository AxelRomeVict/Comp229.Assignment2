let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home',indexController.displayHomePage);


/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/products',indexController.displayProductPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);


/* GET Route for displaying the login page. */
router.get('/contact', indexController.displayContactPage);


/* GET Route for displaying the login page*/
router.get('/login', indexController.displayLoginPage);


/* POST Route for processing the login page*/
router.get('/login', indexController.processLoginPage);


/* GET Route for displaying the Register page*/
router.get('/register', indexController.displayAddPage);
    

/* POST Route for processing the Register page*/
router.get('/register', indexController.processRegisterPage);


/* GET Route for perform User logout*/
router.get('/logout',indexController.performDelete);



module.exports = router;
