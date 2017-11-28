'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({ port: 3001, host: 'localhost' });
const server = Hapi.server({ load: { sampleInterval: 1000 } });
//server.connection({ port: 3000, host: 'localhost' });

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});