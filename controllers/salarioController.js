var Salario = require('../models/Salario');
var debug = require('debug')('Parcial_3_Web_Salario:salario_controller');


// Search a one user y database
module.exports.getOne = (req, res, next) => {
    debug("Search Salario", req.params);
    Salario.findOne({
            username: req.params.username
        }, "-__v")
        .then((foundSalario) => {
            if (foundSalario)
                return res.status(200).json(foundSalario);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "_id",
        sort = req.query.sort || "desc";

    debug("Salario List",{size:perPage,page, sortby:sortProperty,sort});

    Salario.find({}, "-__v")
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((salarios) => {
           return res.status(200).json(salarios)
        }).catch(err => {
            next(err);
        })

}

module.exports.register = (req, res, next) => {
    res.render
    debug("New Salario", {
        body: req.body
    });
    Salario.findOne({
            username: req.body.username
        }, "-__v")
        .then((foundUser) => {
            if (foundUser) {
                debug("Salario duplicado");
                throw new Error(`Salario duplicado ${req.body.username}`);
            } else {
                let newSalario = new Salario({
                    username: req.body.username,
                    salario: req.body.salario,
                    salario_sin_descuento: req.body.salario_sin_descuento || "",
                    descuento_renta: req.body.descuento_renta || "",
                    descuento_iss: req.body.descuento_iss,
                    descuento_afp: req.body.descuento_afp
                });
                return newSalario.save(); // Retornamos la promesa para poder concater una sola linea de then
            }
        }).then(salario => { // Con el usario almacenado retornamos que ha sido creado con exito
            return res
                .header('Location', '/' + salario._id)
                .status(201)
                .json({
                    username: salario.username
                });
        }).catch(err => {
            next(err);
        });
}

module.exports.update = (req, res, next) => {
    debug("Update user", {
        username: req.params.username,
        salario: req.body.salario,
        salario_sin_descuento: req.body.salario_sin_descuento || "",
        descuento_renta: req.body.descuento_renta || "",
        descuento_iss: req.body.descuento_iss,
        descuento_afp: req.body.descuento_afp
    });

    let update = {
        username: req.body.username,
        salario: req.body.salario || "",
        salario_sin_descuento: req.body.salario_sin_descuento || "",
        descuento_renta: req.body.descuento_renta,
        descuento_iss: req.body.descuento_iss,
        descuento_afp: req.body.descuento_afp
    };

    Salario.findOneAndUpdate({
            username: req.params.username
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete Salario", {
        username: req.params.username,
    });

    User.findOneAndDelete({username: req.params.username})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}