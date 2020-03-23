const mongoose= require('mongoose');

const URI= 'mongodb://localhost/mean-services';
mongoose.connect(URI)
  .then(db=> console.log('db is connect'))
  .catch(err=> console.error(err));

module.exports=mongoose;