const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var schema =  new Schema({
        salario: String,
        salario_sin_descuento: String,
        descuento_renta: String,
        descuento_iss: String,
        descuento_afp: String
    }, {collection: 'Salario'});

    module.exports = mongoose.model('Salario',schema);