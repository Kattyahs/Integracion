var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

router.post('/new', async function(req, res, next) {

    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    
    let machineVerification = await fetch('http://3.235.42.11:3000/maquina/'+req.body.id_maquina, options)    
    
    let json = Object.assign({},req.body)
    json.id_sesion = parseInt(json.id_sesion) 
    json.id_maquina = parseInt(json.id_maquina)
    
    const create = {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(json)
      };
    
    if(machineVerification.status==200){
        let reserveCreation = await fetch('https://api-gestion-production-fob3.up.railway.app/reservas/', create);
        if(reserveCreation.status==200){
            res.json(reserveCreation)
        }else{
            console.log(reserveCreation)
            res.status(404).send({failed: "Error creando proyecto"})
        }
    }
    else{
       res.status(404).send({failed: "No existe la máquina indicada"})
    }
    
});

module.exports = router;