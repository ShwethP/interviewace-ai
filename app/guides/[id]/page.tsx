export default async function GuidesPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <h1>Guides Page id : {id}</h1>
    );
}