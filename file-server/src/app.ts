import 'dotenv/config'
import express, { Express, NextFunction, Request, Response } from 'express';
import { appInit } from './config/appInit';
import { uploadImage } from './middleware/multer';
import { productImageUploads } from './middleware/upload';

appInit()

const app: Express = express();
const port = process.env.PORT || 7005;

app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.post('/upload', uploadImage.array('products', 10), productImageUploads)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log(err)
        res.status(err.status || 500).json({
            message: err.message,
        })
    }
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
