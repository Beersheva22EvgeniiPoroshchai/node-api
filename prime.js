import cluster from "node:cluster";
import { log } from "node:console";
import os from "node:os";
const cpuCounter = os.cpus().length
console.log(`number of cpu's is ${cpuCounter}`);
cluster.schedulingPolicy = cluster.SCHED_RR; //round-robin algorithm for windowsOs
cluster.setupPrimary({
    exec: 'index.js'
})
for (let i = 0; i < cpuCounter; i++) {
    cluster.fork();  //creates new Node instance

}


//another one solution with pm2 package:
//install package: sudo npm i -g pm2
//start: pm2 start index.js -i 4  (index.js: name of the executing file)
//logs: pm2 log  
//stop: pm2 stop index.js  