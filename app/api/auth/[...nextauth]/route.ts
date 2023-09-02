import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectToMongoDB } from "@/utils/db/mongo";
import prisma from "@/utils/db/prisma";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHuB_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async session({session}){
            const sessionUser = await prisma.user.findUnique({
                where: {
                    email: session.user?.email as string
                }
            })
            session.user.id = sessionUser?.id
            return session;
        },

        async signIn({profile}){
            try {
                await connectToMongoDB();

                // Check if the user exists
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: profile?.email
                    }
                })

                // Create user if the user does not exist
                if(!userExists){
                    await prisma.user.create({
                        data: {
                            email: profile?.email as string,
                            firstname: profile?.name?.split(" ")[0] as string,
                            lastname: profile?.name?.split(" ")[1] as string,
                            image: profile?.image as string,
                        }
                    })
                }
                return true
            } catch (e:any) {
                console.log(e.message);
                return false;
            }
        }
    }
})

export {handler as GET, handler as POST}