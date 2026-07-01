import Link from "next/link";

import { auth, signOut } from "@/auth";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";

export default async function Navbar() {

    const session = await auth();

    return (

        <header className="sticky top-0 z-50 border-b bg-background">

            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <Link
                    href="/"
                    className="text-xl font-bold"
                >
                    InterviewAce AI
                </Link>

                <div className="hidden items-center gap-6 md:flex">

                    {NAV_LINKS.map((link) => (

                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>

                    ))}

                </div>

                <div className="flex items-center gap-3">

                    {session ? (

                        <>
                            <Button
                                variant="ghost"
                                asChild
                            >
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </Button>

                            <form
                                action={async () => {
                                    "use server";
                                    await signOut({
                                        redirectTo: "/",
                                    });
                                }}
                            >
                                <Button
                                    variant="outline"
                                    type="submit"
                                >
                                    Logout
                                </Button>
                            </form>
                        </>

                    ) : (

                        <>
                            <Button
                                variant="ghost"
                                asChild
                            >
                                <Link href="/login">
                                    Login
                                </Link>
                            </Button>

                            <Button asChild>
                                <Link href="/login">
                                    Get Started
                                </Link>
                            </Button>s
                        </>

                    )}

                </div>

            </nav>

        </header>

    );

}