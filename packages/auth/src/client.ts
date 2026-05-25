import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();


//in package.json we add diff path for slient and server exports 
//import { auth } from "@repo/auth/server" 
//=> because by doing this it only import auth.ts

//import { authClient } from "@repo/auth/client"
//=> becasuse by doing this it only imports client.ts , no mongodb , no env 
