"use client"
import {useState} from "react";
import { useRouter } from "next/navigation";

const Product: React.FC = () => {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [productsFile, setProductsFile] = useState<File | null>(null);

    const handleProductsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files !== null){
            setProductsFile(event.target.files[0]);
        }
    }

    const handleProductsSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const formData = new FormData();

        try {
            if(!productsFile){
                throw new Error("No file selected");
            }

            formData.append("Products", productsFile);
            
            const res = await fetch("/admin/product", {
                method: "POST",
                headers: {
                    'content-type': "multi-part/form-data"
                },
                body: formData
            });

            if(!res.ok){
                throw new Error("Error uploading file");
            }

            setProductsFile(null);

            router.push("/");
        } catch (e:any) {
            setLoading(false);
            console.log(e.message);
        }
    }
    return (
        <div>
            <form onSubmit={handleProductsSubmit}>
                <div>
                    <span>Select File</span>
                    <input 
                        type="file" 
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={handleProductsChange}
                    />
                </div>
                <button
                    disabled={!productsFile || productsFile === null}
                >
                    {loading ? "Loading" : "Upload Products"}
                </button>
            </form>
        </div>
    )
}

export default Product;