const app = require('express')();
const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');

const logger = winston.createLogger({
  level: 'debug',
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    //new winston.transports.Console(),
    new winston.transports.File({
      //path to log file
      filename: 'logs/log.log',
      level: 'debug'
    })
  ]
})

app.get('/', (req, res)=>{
    logger.info('hello from container!!');
    res.send('App is running from container');
});

app.get('/health-check', (req, res)=>{
    logger.info('I am healthy!!');
    res.send('I am healthy!!');
});

app.listen(8000, ()=> {
    logger.info('Listening on port 8000');
});