import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UldStockTableFilter() {
  return (
    <div className="gap-4">
      <div>
        <Button>No Filter</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Contains" />
        <Button>Contains</Button>
      </div>
      <div>
        <Input type="keyword" placeholder=" Does Not Contains" />
        <Button>Contains</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Starts With" />
        <Button>Starts with</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Ends With" />
        <Button>Ends with</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Equals to" />
        <Button>Equals to</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Not Equals to" />
        <Button>Not Equals to</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Greater than" />
        <Button>Greater than</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Lesser than" />
        <Button>Lesser than</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Greater than or equals to" />
        <Button>Greater than or equals to </Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Lesser than or equals to" />
        <Button>Lesser thanor equals to</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Between" />
        <Button>Between</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Not Between" />
        <Button>Not Between</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Is Empty" />
        <Button>Is Empty</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Is Not Empty" />
        <Button>Is Not Empty</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Is Null" />
        <Button>Is Null</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Is Null" />
        <Button>Is Not Null</Button>
      </div>
      <div>
        <Button>Sort Ascending</Button>
      </div>
      <div>
        <Button>Sort Descending</Button>
      </div>
      <div>
        <Button>Clear Sorting</Button>
      </div>
      <div>
        <Input type="keyword" placeholder="Group By" />
        <Button>Group By</Button>
      </div>
      <div>
        <Button>UnGroup</Button>
      </div>
    </div>
  )
}
