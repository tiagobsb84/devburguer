import express from 'express';
import routes from './routes';
import { resolve } from 'node:path';

import './database';

class App {
    constructor() {
        this.app = express();

        this.middleware();

        this.routes();
    }

    middleware() {
        this.app.use(express.json());

        //Esse para trazer a imagem através da url a imagem do produto
        this.app.use(
            '/product-file',
            express.static(resolve(__dirname,'..', 'uploads'))
        );
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;