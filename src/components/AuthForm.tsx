"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./shared/FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { Loader } from 'lucide-react';


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
        confirmPassword: type === "sign-up" ? z.string().min(3) : z.string().optional(),

    });
};

function AuthForm({ type }: { type: FormType }) {
    const router = useRouter();
    const isSignIn = type === "sign-in";

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                // Call your sign-up API here
                const { name, email, password } = values
                if (password !== values.confirmPassword) {
                    toast.error("Passwords do not match")
                    return;
                }


                const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

                const result = await signUp({ uid: userCredentials.user.uid, name: name!, email, password })

                console.log("Sign Up", values)
                toast.success("Account created successfully! Please sign in.")

                if (!result?.success) {
                    toast.error(result.message)
                    return;
                }
                toast.success("Account created successfully! Please sign in.")
                router.push('/sign-in')
            } else {
                const { email, password } = values
                const userCredentials = await signInWithEmailAndPassword(auth, email, password)

                const idToken = await userCredentials.user.getIdToken();

                if (!idToken) {
                    console.log("Could not get user token")
                    toast.error("Sign in failed")
                    return;
                }

                const result = await signIn({ email, idToken });

                if (!result?.success) {
                    toast.error(result.message)
                    return;
                }

                toast.success("Signed in successfully!")
                router.push('/')
            }

            // Reset the form after submission
            form.reset()

        } catch (error) {
            console.log(error)
            toast.error(`There was an error: ${error}`)
        }

    }



    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} />
                    <h2>HiredWize</h2>
                </div>
                <h3 className=" text-primary-100">Land Your Dream Job with AI Precision.</h3>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6 mt-4 form"
                    >
                        {!isSignIn &&
                            <FormField control={form.control} name="name" label="Name" placeholder="Enter your name" type="text" />}
                        <FormField control={form.control} name="email" label="Email" placeholder="Enter your email" type="email" />
                        <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password" />
                        {!isSignIn && <FormField control={form.control} name="confirmPassword" label="Confirm Password" placeholder="Confirm your password" type="password" />}
                        <Button className="btn" type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <>

                                    <Loader className="mr-2 h-5 w-5 animate-spin" /> Loading...
                                </>
                            ) : (
                                isSignIn ? 'Sign In' : 'Create an Account'
                            )}</Button>
                    </form>
                </Form>
                <p className=" text-center">{isSignIn ? 'No account yet?' : 'Have an account already?'}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className=" font-bold text-user-primary ml-1">

                        {isSignIn ? 'Create an account' : 'Sign In'}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm