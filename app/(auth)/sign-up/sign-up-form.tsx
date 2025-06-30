'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signUpDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {

    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
    })

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignUpButton = () => {
        const {pending} = useFormStatus();

        return (
            <Button disabled={pending} className="w-full" variant="default">
                { pending ? 'Processing...' : 'Sign Up' }
            </Button>
        )
    }
    return <form action={action} >
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-2 mb-5">
            <Label htmlFor="name" >
                Name 
            </Label>
            <Input
                id="name"
                type="text"
                name="name"
                
                autoComplete="name"
                defaultValue={signUpDefaultValues.name}
            />
        </div>
        <div className="space-y-2 mb-5">
            <Label htmlFor="email" >
                Email 
            </Label>
            <Input
                id="email"
                type="text"
                name="email"
                
                autoComplete="email"
                defaultValue={signUpDefaultValues.email}
            />
        </div>
        <div className="space-y-2 mb-5">
            <Label htmlFor="password" >
                Password 
            </Label>
            <Input
                id="password"
                type="password"
                name="password"
                
                autoComplete="password"
                defaultValue={signUpDefaultValues.password}
            />
        </div>
        <div className="space-y-2 mb-5">
            <Label htmlFor="confirmPassword" >
                Confirm Password 
            </Label>
            <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                
                autoComplete="confirmPassword"
                defaultValue={signUpDefaultValues.confirmPassword}
            />
        </div>
        <div className="space-y-6 mt-5 mb-5">
            <SignUpButton />
        </div>

        {data && !data.success && (
            <div className="text-center text-destructive">
                {data.message}
            </div>
        )}

        <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link target="_self" href="/sign-in" className="text-blue-500 hover:underline">
                Sign In
            </Link>
        </div>
    </form>;
}
 
export default SignUpForm;