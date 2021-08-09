var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

router.post('/new', async function(req, res, next) {
    //const proyecto = await Proyecto.create(req.body);
    //res.json(proyecto)

    const options = {method: 'GET', headers: {Accept: 'application/json'}};

    let personVerification = await fetch('http://ec2-3-13-79-51.us-east-2.compute.amazonaws.com:8081/assistant/rut?rut='+req.body.id_maker, options);
    
    if(personVerification.status == 200){
        let json = Object.assign({},req.body)
        json.id_maker = parseInt(json.id_maker) 
        console.log(json);
        const create = {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(json)
          };

        let projectCreation = await fetch('https://api-gestion-production-fob3.up.railway.app/proyectos', create);
        
        if(projectCreation.status==200){
            res.json(projectCreation)
        }else{
            console.log(projectCreation)
            res.status(404).send({failed: "Error creando proyecto"})
        }
        

    }else{
        res.status(404).send({failed: "No existe la persona indicada"})
    }
});

module.exports = router;
