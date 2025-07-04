'use server';

import { signInFormSchema, signUpFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { PrismaClient } from "@prisma/client";
import { formatError } from "../utils";

// Sign in the user with the credentials
const prisma = new PrismaClient();
export async function signInWithCredentials(prevState: unknown,
    formData: FormData ) {
        try {
            const user = signInFormSchema.parse({
                email: formData.get('email'),
                password: formData.get('password')
            });

            await signIn('credentials', user);
            return { success: true, message: 'Signed in successfully' };
        } catch (error) {
            if (isRedirectError(error)) {
                throw error; 
            }
            return { success: false, message: 'Invalid email or password' };
        }    
}


// Sign out the user
export async function signOutUser() {
    await signOut();
}


// Sign up User

export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const plainPassword = user.password
        user.password = hashSync(user.password, 10);
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,                
            },
        });
        await signIn('credentials', {
            email: user.email,
            password: plainPassword,
        });

        return {success: true, message: 'User register'}
    } catch (error) {        
        if (isRedirectError(error)) {
            throw error; 
        }
        return { success: false, message: formatError(error) };
    }
}