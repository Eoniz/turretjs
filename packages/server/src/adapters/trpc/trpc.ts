import * as trpcExpress from '@trpc/server/adapters/express';
import {OpenApiMeta} from 'trpc-openapi';
import {inferAsyncReturnType, initTRPC} from '@trpc/server';


// @ts-ignore
export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

export type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = (
    initTRPC
        .meta<OpenApiMeta>()
        .create<Context>()
);

