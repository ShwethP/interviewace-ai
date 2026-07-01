import { ReactNode } from "react";

type Props = {
    title: string;
    value: string | number;
    icon: ReactNode;
    subtitle?: string;
};

export default function StatsCard({
    title,
    value,
    icon,
    subtitle,
}: Props) {
    return (
        <div className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-2 text-xs text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="rounded-2xl bg-slate-100 p-4 text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    {icon}
                </div>

            </div>

        </div>
    );
}