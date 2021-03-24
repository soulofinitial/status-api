var express = require('express');
var router = express.Router();

//minecraft pinger
const mcpinger = require('minecraft-pinger');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:server_ip', async (req, res) => {
    let params = req.params.server_ip;

    let splits = params.split(":");
    let server_ip = splits[0];
    let port = splits[1];

    if(port === undefined){
        port = 25565;
    }

    console.log(`檢查伺服器 IP: ${server_ip} \n伺服器連接阜: ${port}`)

    await mcpinger.ping(server_ip, port, (error, result) => {
        if (error) {
            // render json result
            console.log(error)
            res.json({
                online: false,
                status: 'offline',
                ip: server_ip,
                port: port,
                time_out: '10 sceond'
            })
            //res.json({online: false, status: 'offline', ip: server_ip, time_out: '10 sceond'})
        }else{
            res.json({
                online: true,
                offline: false,
                status: 'online',
                ip: server_ip,
                port: port,
                result: result
            })
        }
    })
    //res.send(req.params);
})

module.exports = router;
