'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {

    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ''
    })

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignInButton = () => {
        const {pending} = useFormStatus();

        return (
            <Button disabled={pending} className="w-full" variant="default">
                { pending ? 'Signing In...' : 'Sign In' }
            </Button>
        )
    }
    return <form action={action} >
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className="space-y-2 mb-5">
            <Label htmlFor="email" >
                Email 
            </Label>
            <Input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                defaultValue={signInDefaultValues.email}
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
                required
                autoComplete="password"
                defaultValue={signInDefaultValues.password}
            />
        </div>
        <div className="space-y-6 mt-5 mb-5">
            <SignInButton />
        </div>

        {data && !data.success && (
            <div className="text-center text-destructive">
                {data.message}
            </div>
        )}

        <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link target="_self" href="/sign-up" className="text-blue-500 hover:underline">
                Sign Up
            </Link>
        </div>
    </form>;
}
 
export default CredentialsSignInForm;