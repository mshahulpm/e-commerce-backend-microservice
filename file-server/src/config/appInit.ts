import * as fs from 'fs'
import constants from './constants'

export function appInit() {

    const isProductDirExist = fs.existsSync(constants.PRODUCT_DIR)
    if (!isProductDirExist) {
        fs.mkdirSync(constants.PRODUCT_DIR)
    }

}