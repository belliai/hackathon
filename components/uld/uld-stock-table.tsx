import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
    TableCaption,
    TableFooter
} from "@/components/ui/table";
import { Button } from "@components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"


const uldStockData = [
    { station: "KUL", country: "MY", ld7Onhand: 499, expectedLd7: 6208, ld3Onhand: 417, expectedLd3: 5863, ld9Onhand: 0, expectedLd9: 29, total: 13742 },
  { station: "ICN", country: "KR", ld7Onhand: 40, expectedLd7: 173, ld3Onhand: 18, expectedLd3: 252, ld9Onhand: 0, expectedLd9: 0, total: 484 },
  { station: "KIX", country: "JP", ld7Onhand: 34, expectedLd7: 349, ld3Onhand: 19, expectedLd3: 377, ld9Onhand: 0, expectedLd9: 0, total: 779 },
  { station: "KMG", country: "CN", ld7Onhand: 4, expectedLd7: 101, ld3Onhand: 2, expectedLd3: 0, ld9Onhand: 0, expectedLd9: 0, total: 107 },
  { station: "PKX", country: "CN", ld7Onhand: 8, expectedLd7: 48, ld3Onhand: 9, expectedLd3: 0, ld9Onhand: 0, expectedLd9: 0, total: 65 },
  { station: "NRT", country: "JP", ld7Onhand: 7, expectedLd7: 56, ld3Onhand: 5, expectedLd3: 80, ld9Onhand: 0, expectedLd9: 0, total: 148 },
  { station: "PEN", country: "MY", ld7Onhand: 5, expectedLd7: 80, ld3Onhand: 10, expectedLd3: 0, ld9Onhand: 0, expectedLd9: 0, total: 95 },
  { station: "SYD", country: "AU", ld7Onhand: 5, expectedLd7: 76, ld3Onhand: 2, expectedLd3: 16, ld9Onhand: 0, expectedLd9: 0, total: 99 },
  { station: "PEK", country: "CN", ld7Onhand: 7, expectedLd7: 120, ld3Onhand: 4, expectedLd3: 0, ld9Onhand: 0, expectedLd9: 0, total: 131 },
  { station: "TAO", country: "CN", ld7Onhand: 0, expectedLd7: 0, ld3Onhand: 0, expectedLd3: 0, ld9Onhand: 0, expectedLd9: 0, total: 0 },
  { station: "TPE", country: "TW", ld7Onhand: 7, expectedLd7: 62, ld3Onhand: 1, expectedLd3: 56, ld9Onhand: 0, expectedLd9: 0, total: 126 },
  { station: "SIN", country: "SG", ld7Onhand: 20, expectedLd7: 275, ld3Onhand: 27, expectedLd3: 335, ld9Onhand: 0, expectedLd9: 0, total: 657 },
  { station: "XMN", country: "CN", ld7Onhand: 0, expectedLd7: 0, ld3Onhand: 0, expectedLd3: 0, ld9Onhand: 0, expectedLd9: 0, total: 0 },
  { station: "SYD", country: "AU", ld7Onhand: 1, expectedLd7: 0, ld3Onhand: 0, expectedLd3: 0, ld9Onhand: 0, expectedLd9: 0, total: 1 }
  ];


export default function UldStockTable() {
    return (
        <Table>
          <TableCaption>ULD Stock</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Station</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>LD7 Onhand</TableHead>
              <TableHead>Expected LD7</TableHead>
              <TableHead>LD3 Onhand</TableHead>
              <TableHead>Expected LD3</TableHead>
              <TableHead>LD9 Onhand</TableHead>
              <TableHead>Expected LD9</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uldStockData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.station}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.ld7Onhand}</TableCell>
                <TableCell>{item.expectedLd7}</TableCell>
                <TableCell>{item.ld3Onhand}</TableCell>
                <TableCell>{item.expectedLd3}</TableCell>
                <TableCell>{item.ld9Onhand}</TableCell>
                <TableCell>{item.expectedLd9}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>{uldStockData.reduce((sum, item) => sum + item.ld7Onhand, 0)}</TableCell>
              <TableCell>{uldStockData.reduce((sum, item) => sum + item.expectedLd7, 0)}</TableCell>
              <TableCell>{uldStockData.reduce((sum, item) => sum + item.ld3Onhand, 0)}</TableCell>
              <TableCell>{uldStockData.reduce((sum, item) => sum + item.expectedLd3, 0)}</TableCell>
              <TableCell>{uldStockData.reduce((sum, item) => sum + item.ld9Onhand, 0)}</TableCell>
              <TableCell>{uldStockData.reduce((sum, item) => sum + item.expectedLd9, 0)}</TableCell>
              <TableCell>{uldStockData.reduce((sum, item) => sum + item.total, 0)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
    
}



