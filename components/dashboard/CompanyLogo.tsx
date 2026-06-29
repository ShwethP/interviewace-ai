interface Props {
    company: string;
}

export default function CompanyLogo({
    company,
}: Props) {

    return (
        <img
            src={`https://logo.clearbit.com/${company.toLowerCase()}.com`}
            alt={company}
            className="h-12 w-12 rounded-lg border bg-white object-contain p-2"
            onError={(e) => {
                e.currentTarget.src =
                    "https://placehold.co/48x48?text=%F0%9F%92%BC";
            }}
        />
    );

}