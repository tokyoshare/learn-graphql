import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {loadFiles} from "@graphql-tools/load-files";
import {join} from "path";
import { makeExecutableSchema } from "graphql-tools";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const startServer = async()=>{
    const port = process.env.PORT || 9000;
    const app = express();
    const typeDefs = await loadFiles(join(__dirname, "schemas/*.graphql"));
    const resolvers = await loadFiles(join(__dirname, "resolvers/*.{js,ts}"));
    const schema = makeExecutableSchema({typeDefs, resolvers})
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    server.listen({port}).then(({url})=>{
        console.log(`Server ready at ${url}`);
    });
}

startServer();