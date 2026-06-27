import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HERO } from "@/lib/constants";

export default function Hero() {
    return (
        <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
                {HERO.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {HERO.subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                    <Link href={HERO.primaryButton.href}>
                        {HERO.primaryButton.text}
                    </Link>
                </Button>

                <Button variant="outline" asChild size="lg">
                    <Link href={HERO.secondaryButton.href}>
                        {HERO.secondaryButton.text}
                    </Link>
                </Button>
            </div>
        </section>
    );
}