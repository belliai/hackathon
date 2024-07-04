export default async function TrackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex w-full flex-col py-10">{children}</div>
}
