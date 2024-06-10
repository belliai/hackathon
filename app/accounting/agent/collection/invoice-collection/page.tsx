
import Contents from "./contents";

export default async function Page() {
  const props = {
    title: "Invoice Collection"
  }

  return (
    <Contents  {...props} />
  );
}
