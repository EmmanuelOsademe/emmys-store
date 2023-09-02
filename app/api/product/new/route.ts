import { connectToMongoDB } from "@/utils/db/mongo";
import prisma from "@/utils/db/prisma";
import type { Product } from '@prisma/client';
import { processFileWithXLSX } from "@/utils/parsers/excelParser";
import { IncomingMessage } from "http";
import XLSX from "xlsx";

export const POST = async (request: Request & IncomingMessage) => {
    
    try {
        await connectToMongoDB();

        const headers = request.headers;
        if(!(headers["content-type"]?.includes('multipart/form-data'))){
            throw new Error("Invalid filetype")
        }

        const workbook = await processFileWithXLSX(request);
        if(!workbook){
            throw new Error("Error reading workbook")
        }

        const products = XLSX.utils.sheet_to_json(workbook.Sheets["Products"]) as Product[];

        await prisma.product.createMany({
            data: products
        });
        return new Response("Products successfully created", {status: 201});
    } catch (e:any) {
        console.log(e.message);
        return new Response(e.message, {status: 500});
    }
}
