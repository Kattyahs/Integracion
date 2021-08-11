var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

router.post('/new', async function(req, res, next) {

    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    
    let tipeMachineVerification = await fetch('http://3.235.42.11:3000/tipo_maquina/'+req.body.tipo_maquina, options)    
    
    
    if(tipeMachineVerification.status==200){

        let json = Object.assign({},req.body)
        json.id_Projecto = parseInt(json.id_Projecto) 
        json.tipo_maquina = parseInt(json.tipo_maquina)
        
        const create = {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(json)
        };

        let sessionCreation = await fetch('https://api-gestion-production-fob3.up.railway.app/sesiones/', create);
        if(sessionCreation.status==200){
            res.json(sessionCreation)
        }else{
            console.log(sessionCreation)
            res.status(404).send({failed: "Error creando sesion"})
        }
    }
    else{
       res.status(404).send({failed: "No existe el tipo de maquina indicado"})
    }
    
});

module.exports = router;