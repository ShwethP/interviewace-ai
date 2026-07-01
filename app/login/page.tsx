import { login } from "@/lib/actions/login";

import { Button } from "@/components/ui/button";

export default function LoginPage() {

    return (

        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">

            <div className="w-full max-w-md rounded-2xl border bg-white p-10 shadow-lg">

                <div className="text-center">

                    <h1 className="text-3xl font-bold">
                        Welcome Back 👋
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Sign in to continue your AI Interview journey.
                    </p>

                </div>

                <form
                    action={login}
                    className="mt-10"
                >

                    <Button
                        type="submit"
                        className="w-full h-12 text-base"
                    >
                        Continue with Google
                    </Button>

                </form>

                <p className="mt-8 text-center text-sm text-gray-500">

                    By continuing you agree to our

                    <span className="font-medium">
                        {" "}Terms
                    </span>

                    {" "}and{" "}

                    <span className="font-medium">
                        Privacy Policy
                    </span>

                </p>

            </div>

        </main>

    );

}