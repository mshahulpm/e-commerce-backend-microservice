import { NextFunction, Request, Response } from "express";
import * as  path from "path";
import sharp from 'sharp'

/**
 * generate required sizes for images 
 */
export async function productImageUploads(req: Request, res: Response, next: NextFunction) {

    const files = req.files as Express.Multer.File[]
    const outDir = './public/products'

    try {
        const results = await Promise.allSettled(files.map(async (file) => {
            const fileName = Date.now() + path.extname(file.originalname)
            await Promise.allSettled([
                // 700 x 700
                sharp(file.buffer)
                    .resize(700, 700, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, fileName)),
                // 400 x 400
                sharp(file.buffer)
                    .resize(300, 300, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, '400-' + fileName)),
                // 100 x 100
                sharp(file.buffer)
                    .resize(100, 100, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    .toFormat('png')
                    .toFile(path.resolve(outDir, '100-' + fileName)),
            ])

            return {
                image: '/products/' + fileName,
                100: '/products/' + '100-' + fileName,
                400: '/products/' + '400-' + fileName,
            }
        }
        ))

        return res.json({
            message: 'Product images uploaded successfully',
            // @ts-ignore
            images: results.map(res => res.value),
        })
    } catch (error) {
        next(error)
    }

}