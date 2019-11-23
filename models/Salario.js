const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var schema =  new Schema({
        username: String,
        salario: Number,
        salario_sin_descuento: Number,
        descuento_renta: Number,
        descuento_iss: Number,
        descuento_afp: Number
    }, {collection: 'Salario'});

    module.exports = mongoose.model('Salario',schema);