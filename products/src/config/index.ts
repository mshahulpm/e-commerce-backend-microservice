import 'dotenv/config'


const config = {
    IS_PRODUCTION: process.env.NODE_ENV === 'PRODUCTION',
    IS_DEVELOPMENT: process.env.NODE_ENV === 'DEVELOPMENT',
    IS_STAGING: process.env.NODE_ENV === 'STAGING',
}

const QUEUES = {
    ORDER: 'ORDER_QUEUE',
    USER: 'USER_QUEUE',
    PRODUCT: 'PRODUCT_QUEUE',
}

export {
    config,
    QUEUES
}