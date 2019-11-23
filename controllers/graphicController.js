var Salario = require('../models/Salario');
var debug = require('debug')('Parcial_3_Web_Salario:graphic_controller');

module.exports.getAll = (req,res,next) => {
    var salarios = [];

    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "_id",
        sort = req.query.sort || "desc";

    Salario.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((salario) => {
            console.log(salario);
            res.render('salario', {title: 'Index', salarios: salario});
        }).catch(err => {
            next(err);
        })
}

module.exports.getOne = (req,res,next) => {
    Salario.findOne({username : req.params.username})
        .then((salario) => {
            console.log(salario);
            res.render('onesalarioform', {var2: salario});
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
            res.redirect('/')
        }).catch(err => {
            next(err);
        });
}

module.exports.update = (req, res, next) => {
    debug("Update Salario", {
        username: req.params.username,
        salario: req.body.salario,
        salario_sin_descuento: req.body.salario_sin_descuento || "",
        descuento_renta: req.body.descuento_renta || "",
        descuento_iss: req.body.descuento_iss,
        descuento_afp: req.body.descuento_afp
    });

    var salarios = [];
    var elparams = req.params.username
    //Salario.findOne({username: elparams}, function(err,obj) { console.log(obj); });
    Salario.findOne({username : elparams})
        .then((salario) => {
            console.log(salario);
            res.render('newsalarioform', {title: 'Index', salarios: salario});
        }).catch(err => {
            next(err);
        })

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

    Salario.findOneAndDelete({username: req.params.username})
    .then((data) =>{
        if (data) res.redirect('/')
        else console.log("erasing failed")
    }).catch( err => {
        next(err);
    })
}