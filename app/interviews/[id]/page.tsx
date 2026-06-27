export default async function InterviewPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <h1>Interview ID: {id}</h1>
    );
}