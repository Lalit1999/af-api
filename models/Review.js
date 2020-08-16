const mongoose = require('mongoose') ;
const valid = require('validator') ;

const ReviewSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true, 
		unique: true,
		required: true
	},
	title : {
		type: String,
		trim: true,
		required: true,
	},
	descr : {
		type: String,
		trim: true,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	product : {
		type: String,
		trim: true,
		required: true,
	},
	user : {
		type: String,
		trim: true,
		required: true,
	},
	helpful: {
		type: Number,
		min: 1,
		max: 5,
		default: 0,
		required: true
	},
	report: {
		type: String,
		required: true,
		default: "no"
	}
}, { 
	timestamps: true
}) ;

ReviewSchema.statics.findByUser = async function(user){
	const owner = await User.findOne( {name : user} ) ;

	if(!owner)
		throw new Error("Owner of this review does not exist") ;
	else
		return owner ;
}

//Comment this method while debugging
ReviewSchema.methods.toJSON = function(){
	let obj = this.toObject() ;

	delete obj.__v ;

	return obj ;
}

const Review = mongoose.model('Review', ReviewSchema) ;

module.exports = Review ;