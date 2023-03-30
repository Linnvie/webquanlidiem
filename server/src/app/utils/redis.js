const redis = require('redis');
const client= redis. createClient({
   // url: "redis://:OidWFaXLFinRxL5J5IPq0cd9FtCfzORI@redis-18613.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:18613"
    port : 6379,
    host : '127.0.0.1',
    legacyMode: true,
});
client.ping(function (err, result) {
    console.log("pong");
})

client.on('connect', () => {
    console.log('Redis client connected');
});
client.on("error", (error) => {
    console.error(error);
});

module.exports = client