type Props = {
    title: string;
    value: string | number;
};

export default function StatsCard({ title, value }: Props) {
    return (
        <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-gray-500">{title}</h3>

            <p className="text-3xl font-bold mt-3">
                {value}
            </p>
        </div>
    );
}