import multer from "multer";


export const uploadImage = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            // @ts-ignore
            cb({
                message: "Only images are allowed",
                status: 400
            }, false);
        }
    },
    // storage: multer.diskStorage({
    //     destination: 'public/products',
    //     filename(req, file, callback) {
    //         const fileName = Date.now() + path.extname(file.originalname)
    //         callback(null, fileName)
    //         eventEmitter.emit('create-resized-product-images', fileName)
    //     },
    // })
    storage: multer.memoryStorage()

})