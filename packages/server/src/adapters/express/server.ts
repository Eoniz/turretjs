import { createOpenApiExpressMiddleware  } from 'trpc-openapi';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from "express";
import swaggerUi from "swagger-ui-express";
import {appRouter, openApiDocument} from "../trpc/router";
import {createContext} from "../trpc/trpc";
import moment from "moment";
import cors from "cors";

const app = express();

app.use((req, _res, next) => {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    console.info(`${now} - ${req.ip} - [${req.method}] ${req.originalUrl}`);
    next();
});

app.use(cors());

app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);

app.use(
    '/api',
    createOpenApiExpressMiddleware({
        router: appRouter
    })
);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument)
);

app.listen(3000, () => {
    console.log("Listening to :3000");
});
