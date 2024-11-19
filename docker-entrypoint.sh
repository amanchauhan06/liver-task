#!/bin/sh

# Start Redis server in the background
redis-server --daemonize yes

# Start the Node.js application
node index.js