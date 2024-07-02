
import Contents from "./contents";

export default async function Page() {
  const props = {
    title: "Invoice Listing"
  }

  return (
    <Contents  {...props} />
  );
}
