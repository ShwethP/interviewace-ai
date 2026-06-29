import Image from "next/image";

type Props = {
    name: string;
    image?: string | null;
};

export default function DashboardHeader({ name, image }: Props) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome back, {name} 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Ready to ace your next interview?
                </p>
            </div>

            {image && (
                <Image
                    src={image}
                    alt="Profile"
                    width={60}
                    height={60}
                    className="rounded-full"
                />
            )}
        </div>
    );
}