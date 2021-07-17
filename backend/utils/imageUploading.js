import multer from 'multer';
import path from 'path';

// import { tryCatchUtility } from './errHandling/tryCatch.js';
import { generateErrUtility } from './errHandling/generateErr.js';

const fileFilter = (req, file, cb) => {
    // console.log('1 file',file);
    // if(typeof file === 'undefined') return;
    const { mimetype } = file;
    if(mimetype === 'image/jpeg' || mimetype === 'image/jpg' || mimetype === 'image/png' || mimetype === 'image/bmp')
        return cb(null, true);
    // tryCatchUtility(cb(new generateErrUtility('Allowed only JPG, JPEG, PNG, BMP',422), false));
    cb(new generateErrUtility('Allowed only JPG, JPEG, PNG, BMP formats!',422), false);
};

const limits = {
    fileSize: 1024 * 512,   // 512kb
    // files: 5
};

const storage = multer.diskStorage({
    // destination: './images/products',
    destination: (req, file, cb) => {
        // console.log('2 file',file);
    // console.log(req.url);
        // return './images/products';
        // cb(null, './images/products');
        cb(null, req.url === '/addproduct' ? './images/products' : './images/reviews');
        // const dir = req.url === '/addproduct' ? 'products' : 'reviews';
        // cb(null, './images/' + dir);
        // if(typeof req.files === 'undefined') {
            // req.files = [];
            // req.files = ['images/' + dir];
            // console.log('files',req.files);
        // }
        // console.log('typeof',typeof req.files);
        // req.files.concat(['images/' + dir]);
        // req.files = ['image/' + dir];
    },
    filename: (req, file, cb) => {
        // console.log('3 file',file);
        // console.log(path.parse(file.originalname));
        const { name, ext } = path.parse(file.originalname);
        // const chars = { 'T': '_T',  ':': '-',  '\\': '/',  ' ': '_'};
        const chars = { ':': '-',  'T': '_T' };
        const newName = name.replace(/\s/g, '-') + '_' + new Date().toISOString().replace(/[:T]/g, m => chars[m]) + ext;

        // req.files[req.files.length-1] += '/' + newName;


        // return cb(null, filePath.name + '_' + new Date().toISOString().replace(/:/g,'-').replace(/T/g,'_T') + filePath.ext);
        cb(null,
            // (filePath.name + '_' + new Date().toISOString().replace(/[:T]/g, m => chars[m]) + filePath.ext).replace(/^\\$/g, m => chars[m])
            // (filePath.name.replace(/\s/g, '_') + '_' + new Date().toISOString().replace(/[:T]/g, m => chars[m]) + filePath.ext).replace(/\\/g,'/')
            // originalName.name.replace(/\s/g, '-') + '_' + new Date().toISOString().replace(/[:T]/g, m => chars[m]) + originalName.ext
            newName
        );
    }
});

export const uploadConfig = multer({
    fileFilter: fileFilter,
    limits: limits,
    storage: storage
});

