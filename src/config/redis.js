const Redis = require('redis');
const { promisify } = require('util');

const client = Redis.createClient({
  host: 'localhost',
  port: 6379
});

client.on('error', (err) => console.log('Redis Client Error', err));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = {
  client,
  getAsync,
  setAsync
};