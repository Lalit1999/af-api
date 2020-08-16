const exp = require('express') ;

const Product = require('../models/Product.js') ;
// const auth = require('../src/auth.js') ;

const router = new exp.Router() ;

//Comment while upload
router.get('/product', (req, res) => {
    console.log('All Products requested') ;

	Product.find({})
	.then(products => res.json(products))
	.catch(err => res.status(404).json(err.message)) ;
}) ;

module.exports = router ;