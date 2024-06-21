import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function UldStationStock() {
    return (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>ULD</CardTitle>
            <CardDescription>Station ULD Stock</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Location</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="KUL">KUL</SelectItem>
                      <SelectItem value="KUN">KUN</SelectItem>
                      <SelectItem value="KUM">KUM</SelectItem>
                      <SelectItem value="KUO">KUO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">ULD #</Label>
                  <Input id="uld#" placeholder="ULD#" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ULD Type">ULD Type</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="P1A">P1A</SelectItem>
                      <SelectItem value="P1C">P1C</SelectItem>
                      <SelectItem value="P1D">P1D</SelectItem>
                      <SelectItem value="P1G">P1G</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ULD Owner">ULD Owner</Label>
                  <Select>
                    <SelectTrigger id="ULD Owner">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="ALL">All</SelectItem>
                      <SelectItem value="111">111</SelectItem>
                      <SelectItem value="2G">2G</SelectItem>
                      <SelectItem value="2Y">2Y</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ULD Status">ULD Status</Label>
                  <Select>
                    <SelectTrigger id="ULD Status">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Damaged">Damaged</SelectItem>
                      <SelectItem value="Missing">Missing</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Received">Received</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Clear</Button>
            <Button>List</Button>
            <Button>Export</Button>
          </CardFooter>
        </Card>
      )
}
