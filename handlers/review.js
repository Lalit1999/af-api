const exp = require('express') ;

const Review = require('../models/Review.js') ;
// const auth = require('../src/auth.js') ;

const router = new exp.Router() ;

//Comment while upload
router.get('/review', (req, res) => {
    console.log('All Reviews requested') ;

	Review.find({})
	.then(reviews => res.json(reviews))
	.catch(err => res.status(404).json(err.message)) ;
}) ;

module.exports = router ;