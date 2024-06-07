"use client";

import { Button } from "../ui/button";

export default function FilterActions() {
  return (
    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-2">
      <Button
        className="bg-button-primary hover:bg-button-primary/80 text-white"
        type="button"
        size="sm"
      >
        List
      </Button>
      <Button
        className="bg-button-primary hover:bg-button-primary/80 text-white"
        type="button"
        size="sm"
      >
        Clear
      </Button>
      <Button
        className="bg-button-primary hover:bg-button-primary/80 text-white"
        type="button"
        size="sm"
      >
        Export
      </Button>
      <Button
        className="bg-button-primary hover:bg-button-primary/80 text-white"
        type="button"
        size="sm"
      >
        Delete
      </Button>
    </div>
  );
}
