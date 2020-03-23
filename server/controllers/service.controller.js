const Service = require('../models/service');
const { unlink } = require('fs-extra');
const path = require('path');
const { mongoose } = require('mongoose');

const serviceController = {};
//CRUD
serviceController.getServices = async (req, res) => {
    const services = await Service.find();
    res.json(services);

}


serviceController.createService = async (req, res) => {
    const service = new Service({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        filename: req.file.filename,
        path: '/img/uploads/' + req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size

    }


    );
    console.log(service);

    await service.save();
    res.json({
        'status': 'servicio guardado'
    });
};

serviceController.getService = async (req, res) => {

    const service = await Service.findById(req.params.id)
    res.json(service);

};


serviceController.editService = async (req, res) => {

    const { id } = req.params;

    if (req.file) {

       
       
        var service ={
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            filename: req.file.filename,
            path: '/img/uploads/' + req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
              
        }

      


        
    }else{
        var service={
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        
        }
     
        
     
    }

    await Service.findByIdAndUpdate(id, { $set: service }, { new: true });
     const ser= await Service.findById(id);
     console.log(ser.path);

    res.json({ status: 'Service update' + ser.path});
};

serviceController.deleteService = async (req, res) => {
    const { id } = req.params;
    const serv = await Service.findByIdAndDelete(id);
    unlink(path.resolve('./server/libs/public' + serv.path));
    res.json({
        'status': req.params.id

    });
}


module.exports = serviceController;