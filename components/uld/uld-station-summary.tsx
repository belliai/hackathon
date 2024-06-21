import React, { useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ULDStationSummary() {
    return(
        <div>
            <Button variant="outline">Add</Button>
            <Button>Save</Button>
            <Button>Cancel</Button>
            <Button>Send SCM</Button>
        </div>
    )
}