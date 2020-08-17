const mongoose = require('mongoose') ;
const valid = require('validator') ;

const Review = require('./Review.js') ;

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true, 
		unique: true,
		required: true
	},
	title : {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	descr : {
		type: String,
		trim: true,
		required: true,
	},
	price: {
		type: Number,
		required: true
	},
	discount : Number,
	images : [String],
	stock : {
		type: Number,
		required: true,
		default: 100
	},
	features : [String],
	details : {},
	tag : [String],
	category : String,
	subcategory : String,
	coupons: [{
		code : String,
		effect: String,
	}],
}, { 
	timestamps: true
}) ;

ProductSchema.statics.findReview = async function(name){
	const reviews = await Review.find( {product : name} ) ;

	if(reviews.length < 1)
		throw new Error("Reviews for this product does not exist") ;
	else
		return reviews ;
}

//Comment this method while debugging
ProductSchema.methods.toJSON = function(){
	let obj = this.toObject() ;

	delete obj.__v ;

	return obj ;
}

const Product = mongoose.model('Product', ProductSchema) ;

module.exports = Product ;