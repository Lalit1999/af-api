const mongoose = require('mongoose') ;
const valid = require('validator') ;
const bc = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;

const Review = require('./Review.js') ;

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true, 
		unique: true,
		required: true
	},
	email: {
		type: String,
		trim: true,
		unique: true,		
		required: true,
		lowercase: true,
		validate(email) {
			if(!valid.isEmail(email))
				throw new Error('Invalid E-Mail Address') ;
		}
	},
	mobile: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		minlength: 10,
		maxlength: 14,
		validate(mobile) {
			if(!valid.isNumeric(mobile))
				throw new Error('Invalid Mobile Number') ;
		}
	},
	mobile2: {
		type: String,
		trim: true,
		unique: true,
		minlength: 10,
		maxlength: 14,
		validate(mobile) {
			if(!valid.isNumeric(mobile))
				throw new Error('Invalid Mobile Number') ;
		}
	},
	gender: {
		type: String,
		trim: true,
		required: true,
		maxlength: 2,
		enum: ['m','f','M','F']
	},
	password : {
		type: String,
		trim: true,
		required: true,
		minlength: 6,
		validate(password) {
			if( password.includes('password') || password.includes('123'))
				throw new Error('This password may be too common try some other')
		}
	},
	address : {
		type: String,
		trim: true,
		required: true,
	},
	address2 : {
		type: String,
		trim: true,
		required: true,
	},
	tokens: [{
		token: {
			type: String, 
			required: true 
		}
	}],
	cart: [{}],
	orders: [{}],
	wishlist: [{}],
	reviews: [{}],
	search_history: [String],
}, { 
	timestamps: true
}) ;

UserSchema.statics.findByEmail = async function(email, password){
	const user = await User.findOne( {email} ) ;

	if(!user)
		throw new Error("User with this Email does not exist") ;
	else
	{
		const isMatch = bc.compareSync(password, user.password) ;
		if(!isMatch)
			throw new Error("Password does not match") ;
		else
			return user ;
	}
}

UserSchema.statics.findReview = async function(name){
	const reviews = await Review.find( {user : name} ) ;

	if(reviews.length < 1)
		throw new Error("Reviews by this User does not exist") ;
	else
		return reviews ;
}

UserSchema.methods.changePass = async function(oldPass, newPass){
	const isMatch = bc.compareSync(oldPass, this.password) ;
	console.log(oldPass, this.password, bc.compareSync(oldPass, this.password)) ;
	if(!isMatch)
		throw new Error("Password does not match") ;
	else
		this.password = bc.hashSync(newPass, 4) ;
	this.save() ;
}

UserSchema.methods.generateAuthToken = function(){
	const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET) ;
	this.tokens = this.tokens.concat({ token }) ;
	this.save() ;
	return token ;
}

//Comment this method while debugging
UserSchema.methods.toJSON = function(){
	let obj = this.toObject() ;

	delete obj.password ;
	delete obj.tokens ;
	delete obj.__v ;

	return obj ;
}

const User = mongoose.model('User', UserSchema) ;

module.exports = User ;