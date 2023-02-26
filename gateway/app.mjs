import 'dotenv/config'
import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import express from 'express'
const app = express()

const PORT = 4000;


async function bootstrap() {
    const gateway = new ApolloGateway({
        serviceList: [
            { name: 'order', url: process.env.ORDER_SERVICE },
            { name: 'product', url: process.env.PRODUCT_SERVICE },
            { name: 'user', url: process.env.USER_SERVICE },
        ],
    });

    const server = new ApolloServer({
        gateway,
        subscriptions: false,
        rootValue: '/graphql'
    });

    await server.start()

    server.applyMiddleware({ app })

    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to gateway' })
    })

    app.listen(PORT, () => {
        console.log('Gateway is running on port ' + PORT)
    })

}


bootstrap()