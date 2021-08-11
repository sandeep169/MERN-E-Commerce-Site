import multer from 'multer';
import path from 'path';

import { generateErrUtility } from './errHandling/generateErr.js';

const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    if(mimetype === 'image/jpeg' || mimetype === 'image/jpg' || mimetype === 'image/png' || mimetype === 'image/bmp')
        return cb(null, true);
    cb(new generateErrUtility('Allowed only JPG, JPEG, PNG, BMP formats!',422), false);
};

const limits = {
    fileSize: 1024 * 512,   // 512kb
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, req.url === '/addproduct' ? './images/products' : './images/reviews');
    },
    filename: (req, file, cb) => {
        const { name, ext } = path.parse(file.originalname);
        const chars = { ':': '-',  'T': '_T' };
        const newName = name.replace(/\s/g, '-') + '_' + new Date().toISOString().replace(/[:T]/g, m => chars[m]) + ext;
        cb(null, newName);
    }
});

export const uploadConfig = multer({
    fileFilter: fileFilter,
    limits: limits,
    storage: storage
});

