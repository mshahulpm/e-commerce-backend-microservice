import 'dotenv/config'
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const PORT = 7000;


async function bootstrap() {
    const gateway = new ApolloGateway({
        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'order', url: process.env.ORDER_SERVICE },
                { name: 'product', url: process.env.PRODUCT_SERVICE },
                { name: 'user', url: process.env.USER_SERVICE },
            ]
        }),
        buildService: function ({ url }) {
            return new RemoteGraphQLDataSource({
                url,
                willSendRequest: function ({ request, context }) {
                    for (const [headerKey, headerValue] of Object.entries(context.headers || {})) {
                        request.http?.headers.set(headerKey, headerValue);
                    }
                }
            });
        }
    });

    const server = new ApolloServer({
        gateway,
        subscriptions: false,
        rootValue: '/graphql',
    });

    await server.start()

    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to gateway' })
    })

    server.applyMiddleware({ app })


    app.listen(PORT, () => {
        console.log('Gateway is running on port ' + PORT)
    })

}


bootstrap()