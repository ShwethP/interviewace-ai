export default function CompaniesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <aside>
                Company Navigation
            </aside>

            <main>
                {children}
            </main>
        </div>
    );
}