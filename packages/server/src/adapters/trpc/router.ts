import {clientRouter} from "./api/v1/client/client";
import {generateOpenApiDocument} from 'trpc-openapi';
import {trpc} from "./trpc";
import {projectRouter} from "./api/v1/project/project";
import {clientSessionRouter} from "./api/v1/clientsession/clientSession";
import {logsRouter} from "./api/v1/logs/logs";

export const appRouter = trpc.mergeRouters(
    clientRouter,
    projectRouter,
    clientSessionRouter,
    logsRouter,
);

export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'tRPC OpenAPI',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/api',
});

export type AppRouter = typeof appRouter;
export default trpc;