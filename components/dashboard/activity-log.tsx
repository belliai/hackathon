"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const activities = [
  {
    username: "Demo User",
    email: "demouser@gmail.com",
    activity: "Reservation Created",
    datetime: new Date(),
  },
];

const ActivityLog = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  const form = useForm<{
    bookdate: string;
    execdate: string;
    fflightassign: string;
    delivery: string;
  }>();

  return (
    <Card className="flex flex-col" ref={ref}>
      <CardHeader className="p-0 border-b h-1 flex-grow overflow-y-auto">
        <Table className="rounded-sm overflow-clip">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">User</TableHead>
              <TableHead className="px-4">Activity</TableHead>
              <TableHead className="px-4">Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity, index) => {
              const datetime = formatDate(activity.datetime);
              return (
                <TableRow key={index}>
                  <TableCell className="px-4 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="leading-none">{activity.username}</span>
                      <span className="leading-none text-xs text-muted-foreground">
                        {activity.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {activity.activity}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <div className="flex flex-col gap-1 text-muted-foreground ">
                      <div className="flex flex-row items-center gap-2 leading-none">
                        <ClockIcon className="size-3" />
                        <span className="text-xs">{datetime.time}</span>
                      </div>
                      <div className="flex flex-row items-center gap-2 leading-none">
                        <CalendarIcon className="size-3" />
                        <span className="text-xs">{datetime.date}</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <FormField
          control={form.control}
          name="bookdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="Book Date" htmlFor="bookdate">
                Book Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="bookdate"
                  className="border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="execdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="Exec Date" htmlFor="execdate">
                Exec Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="execdate"
                  className="border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fflightassign"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="First Flight Assign" htmlFor="fflightassign">
                First Flight Assign
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="fflightassign"
                  className="border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="delivery"
          render={({ field }) => (
            <FormItem>
              <FormLabel info="Delivery" htmlFor="delivery">
                Delivery
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="delivery"
                  className="border-2 border-foreground/30"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
});

ActivityLog.displayName = "ActivityLog";

function formatDate(date: Date): { time: string; date: string } {
  const pad = (num: number) => num.toString().padStart(2, "0");

  // Formatting the time
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${pad(hours)}:${minutes}:${seconds} ${ampm}`;

  // Formatting the date
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero based
  const day = pad(date.getDate());
  const formattedDate = `${year}-${month}-${day}`;

  return { time: formattedTime, date: formattedDate };
}

export default ActivityLog;