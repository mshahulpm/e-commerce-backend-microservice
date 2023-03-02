import 'dotenv/config'
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
// app.use((req, res, next) => {
//     console.log(req.headers.authorization)
//     next()
// })

const PORT = 7000;


async function bootstrap() {
    const gateway = new ApolloGateway({
        supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
                { name: 'user', url: process.env.USER_SERVICE },
                { name: 'order', url: process.env.ORDER_SERVICE },
                { name: 'product', url: process.env.PRODUCT_SERVICE },
            ]
        }),
        buildService: function ({ url }) {
            return new RemoteGraphQLDataSource({
                url,
                willSendRequest: function ({ request, context }) {

                    for (const [headerKey, headerValue] of Object.entries(context.headers || {})) {
                        request.http?.headers.set(headerKey, headerValue);
                    }
                },

            });
        }
    });

    const server = new ApolloServer({
        gateway,
        subscriptions: false,
        rootValue: '/graphql',
        context: ({ req }) => (req)
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