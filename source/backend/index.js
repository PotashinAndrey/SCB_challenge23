import pg from "pg";
import Fastify from 'fastify';
import { promises as fs } from "fs";

import config from "../../config/index.js";
import migrations from "./migrations/index.js";

console.log(config);
const { Client } = pg;

const fastify = Fastify({
    logger: true
});

const client = new Client(config.database);

fastify.addHook("preHandler", async function (request, reply) {
    reply.headers({
        // "Cache-Control": "no-store",
        // Pragma: "no-cache",
        // "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*", // "http://localhost:3000/",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Methods": "*",
        // "Access-Control-Allow-Headers": "*",
    });
    // next();
});

fastify.post('/api/login', async (request, reply) => {
    // console.log(request.body)
    // return request.body;
    // await reply.send({
    //     hello: 'world',
    //     // request: request.body
    // })
    return {
        "hello": "world"
    }
})

fastify.get('/', async (request, reply) => {
    return {
        hello: 'World'
    }
})

// Run the server!
const start = async () => {
    try {
        await client.connect(err => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }
        })

        await migrations(client);

        await fastify.listen(config.backend.http);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
