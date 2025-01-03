
const {mongoose}= require('mongoose');

const resturantSchema = new mongoose.Schema({
    id :{type : Number},
    name :{type : String},
    full_address :{type : String},
    creation_date :{type : String},
    manager :{type : String}
},
{ collection: 'resturants'});

const ResturantModel = mongoose.model('resturants',resturantSchema);

module.exports = ResturantModel;