const exp = require('express') ;
const bc = require('bcryptjs') ;

const User = require('../models/User.js') ;
const auth = require('../src/auth.js') ;
const { sendWelcomeMail, sendGoodbyeMail } = require('../src/email/email.js') ;

const router = new exp.Router() ;

//Comment while upload
router.get('/users', (req, res) => {

	User.find({})
	.then(users => res.json(users))
	.catch(err => res.status(404).json(err.message)) ;
}) ;

router.post('/users', (req, res) => {
	console.log('New User Creation Requsted') ;

    const {name, mobile, email, password, gender, mobile2, address, address2} = req.body ;
    let user = {} ;

    const data = {
        name, mobile, email, gender, address, address2, mobile2,
        password : bc.hashSync(password, 4)
    };
	
    const user2 = new User(data); 
	
	user2.save()
	.then( data => {
		console.log('User created') ;
        sendWelcomeMail(data.name, data.email) ;
        user = data ;
        return user2.generateAuthToken() ;
    })
    .then( token => {
    	console.log('token generated for user') ;
        res.status(201).json({token, user}); 
    })
	.catch( err => res.status(400).json(err.message) ) ;
} ) ;

router.get('/users/me', auth, (req, res) => {
	console.log('User '+req.user.name+' requested their profile') ;
    res.json(req.user) ;
}) ;

router.delete('/users/me', auth, (req, res) => {
    console.log('User '+req.user.name+' Requested to delete') ;

    req.user.remove()
    .then(user => {
        res.json(user) ;
        sendGoodbyeMail(user.name, user.email) ;
    })
    .catch(err => res.status(500).json(err.message) ) ;
}) ;

router.patch('/users/me', auth, (req, res) => {
    console.log(req.user.name+ ' requested changes in profile') ;
    delete req.body._id ;
    delete req.body.tokens ;
    delete req.body.createdAt ;
    delete req.body.updatedAt ;
    const updates = Object.keys(req.body) ;
    const allowedUpdates = ['name', 'email', 'mobile2', 'mobile', 'gender', 'address', 'address2']
    const isValidOperation = updates.every( update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        console.log(isValidOperation); 
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    updates.forEach( update => req.user[update] = req.body[update]) ;

    req.user.save()
    .then( data => res.json(data))
    .catch( err => res.status(500).json(err.message)) ;
})

router.post('/users/me/change', auth, (req, res) => {
    const {oldpass, newpass} = req.body ;
    
    console.log(req.user.name+' requested password change') ;

    req.user.changePass(oldpass, newpass)
    .then( data => res.json("Successfully Changed Password") )
    .catch(err => res.status(400).json(err.message) ) ;

}) ;

module.exports = router ;