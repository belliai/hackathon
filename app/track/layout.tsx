export default async function TrackLayout({
    children
}: {
    children: React.ReactNode;
}) {

    return ( 
        <div className="py-10 flex flex-col w-full">
            {children}
        </div>
    )

}