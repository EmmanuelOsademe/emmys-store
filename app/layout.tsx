"use client"

import '@/styles/globals.css'

import Provider from "@/components/Provider";
import { ContextProvider } from '@/contexts/ContextProvider';
import { useStateContext } from '@/contexts/ContextProvider';
import {registerLicense} from '@syncfusion/ej2-base';
registerLicense("Mgo+DSMBaFt+QHFqUUdrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQllhSn5XdkNnXHhdcHc=;Mgo+DSMBPh8sVXJ1S0d+WFBPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXpRdUVnWXladXNRRGM=;ORg4AjUWIQA/Gnt2VFhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdEZjXX9YdHFSQ2Vf;MTgxMjM2NEAzMjMxMmUzMTJlMzQzMVRodU41SzZBdjZ6M293bFJTWXFCVlRGbnZWb2tFWlNnS3JxWjJWdFpncjg9;MTgxMjM2NUAzMjMxMmUzMTJlMzQzMWxjaXZpdER6NG1RUGRmdDlSd0E0di9UYUFrYUp6TjNreDZSWG9Mb1NxRTA9;NRAiBiAaIQQuGjN/V0d+XU9Ad1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TckdgWXtednBQTmJdUg==;MTgxMjM2N0AzMjMxMmUzMTJlMzQzMW92bEIyRHpibnVXTmRjeHZpSFI1TVluUzdBTEM3S0RwQm1temZMUWFoMms9;MTgxMjM2OEAzMjMxMmUzMTJlMzQzMWJxdCs1T0VFUTUwQlNiZ2dYYmloV3RMbEI2Z296OGYzdWFGblpnYlRudEE9;Mgo+DSMBMAY9C3t2VFhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdEZjXX9YdHFdT2Nf;MTgxMjM3MEAzMjMxMmUzMTJlMzQzMUplS3hScWE3a0pkTThzQmk1ZGlNSkRCT2lxY1dGRmk2WFZmaENzcUZIdUE9;MTgxMjM3MUAzMjMxMmUzMTJlMzQzMVBDZXpFdmZDT2JjNm1PZDdodkZVeVd4Qi9hUjB2d2tQSm16NnlSVFJkbHc9;MTgxMjM3MkAzMjMxMmUzMTJlMzQzMW92bEIyRHpibnVXTmRjeHZpSFI1TVluUzdBTEM3S0RwQm1temZMUWFoMms9");

import { Inter } from 'next/font/google';

import Layout from '@/components/Layout';
//import { TooltipComponent } from '@syncfusion/ej2-react-popups';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "Emmys Stores",
    description: "One-stop shop for all your shopping needs"
}

interface Prop  {
    children: React.ReactNode
}

const RootLayout: React.FC<Prop> = ({children}) => {
    const {currentMode} = useStateContext();
    return (
        <html lang='en'>
            <ContextProvider>
                <body className={currentMode === "Dark" ? "dark" : ""}>
                    <Provider>
                        <main className='flex relative dark:bg-main-dark-bg'>
                            <Layout children={children}/>
                        </main>
                    </Provider>
                </body>
            </ContextProvider>
        </html>
    )
}


export default RootLayout;