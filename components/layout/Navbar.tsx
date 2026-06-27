import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="text-xl font-bold">
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
                    <Button variant="ghost" asChild>
                        <Link href="/login">Login</Link>
                    </Button>

                    <Button asChild>
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>
            </nav>
        </header>
    );
}