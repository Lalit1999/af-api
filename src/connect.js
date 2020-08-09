const mongoose = require('mongoose') ;

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
.then( () => {
	console.log('Database connected') ;
}) 
.catch(err => {
	console.log(err) ;
	res.status(502).json(err.message);
}) ;