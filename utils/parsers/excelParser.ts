import XLSX, {WorkBook, WorkSheet} from 'xlsx';
import formidable, {Fields, Files, File} from 'formidable';
import { IncomingMessage } from 'http';
import fs from 'fs';

export const processFileWithXLSX = async (req: IncomingMessage): Promise<WorkBook | null> => {

    try {
        const {fields, files} = await parseWithFormidable(req);
        const f = Object.entries(files)[0][1] as File;
        const filePath = f.filepath;

        const workbook = XLSX.read(fs.readFileSync(filePath));
        return workbook;
    } catch (e: any) {
        console.log(e.message);
        return null;
    } 
}

const parseWithFormidable = (req: IncomingMessage): Promise<{fields: Fields, files: Files}> => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({});

        form.parse(req, async(error, fields, files) =>{
            if(error){
                reject(error);
            }

            resolve({fields, files})
        })
    })
}
