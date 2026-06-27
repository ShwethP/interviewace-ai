import { FEATURES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export default function Features() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold">
                    Everything You Need to Crack Interviews
                </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map((feature) => (
                    <Card key={feature.title}>
                        <CardContent className="pt-6">
                            <h3 className="mb-2 text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="text-muted-foreground">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}