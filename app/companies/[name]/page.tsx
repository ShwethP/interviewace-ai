export default async function CompaniesPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    return (
        <h1>Companies name :{name}</h1>
    );
}