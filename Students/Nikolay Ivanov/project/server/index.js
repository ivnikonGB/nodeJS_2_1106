const express = require('express');
const config = require('config');
const db = require('mongoose');

const basketRouter = require('./routers/basket-router');
const catalogRouter = require('./routers/catalog-router');
const authRouter = require('./routers/auth-router');

const PORT = config.get('port');
const MONGO_URI = config.get('mongoAtlasURI');

const server = express();

server.use(express.json());
server.use('/basket', basketRouter);
server.use('/catalog', catalogRouter);
server.use('/auth', authRouter);

async function start() {
    try {
        await db.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Database connected');
        server.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`)
        });
    } catch(e) {
        console.error('Database connect error: ', e.message);
        process.exit(1);
    }
}

start();
