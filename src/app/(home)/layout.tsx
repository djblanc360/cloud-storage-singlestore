export default async function Drive(props: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-6 text-center text-gray-100">
            <div className="max-w-3xl">
                <main>{props.children}</main>
                <footer className="mt-16 text-sm text-gray-400">
                    © {new Date().getFullYear()} djblanc360. All rights reserved.
                </footer>
            </div>
        </div>
    )
}