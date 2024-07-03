import Contents from "./contents"

export default async function Page() {
  const props = {
    title: "Message Monitoring",
  }

  return <Contents {...props} />
}
