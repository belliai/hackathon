"use client";

import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HistoryIcon,
  PackageIcon,
  PlaneIcon,
  ScrollTextIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/vertical-tabs";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PropsWithChildren, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import OrderSummaryCard from "./order-summary-card";
import BalanceCard from "./balance-card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CreateBookingForm from "./forms/create-booking-form";
import ConsignmentDetailsForm from "./forms/consignment-details.form";
import ShipperDetailsForm from "./forms/shipper-details-form";
import ProcessRatesForm from "./forms/process-rates-form";
import { toast } from "@/components/ui/use-toast";
import DimensionsCard from "./dimensions-card";
import { useBookingContext } from "@/components/dashboard/BookingContext";
import ActivityLog from "./activity-log";
import { Order, orderSchema } from "@/schemas/order/order";
import { getDefaults } from "@/schemas/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddOrder, useUpdateOrder } from "@/lib/hooks/orders";
import { mapJsonToSchema } from "@/lib/mapper/order";

import { format } from "date-fns";


type NewOrderModalProps = PropsWithChildren & {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  mode?: "edit" | "create";
};

const initialValues = getDefaults(orderSchema);

export default function NewOrderModal(props: NewOrderModalProps) {
  const { children, onOpenChange, mode = "create" } = props;
  const { selectedBooking , setSelectedBooking} = useBookingContext();
  const [open, setOpen] = useState(props.open ?? false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const add = useAddOrder()
  const update = useUpdateOrder()




  useEffect(() => {
    onOpenChange && onOpenChange(open);
  }, [open, onOpenChange]);

  const defaultValues = useMemo(
    () => ({
      ...initialValues,
      ...(selectedBooking && { ...mapJsonToSchema(selectedBooking) }),
    }),
    [selectedBooking]
  );

  useEffect(() => {
    setOpen(props.open ?? false);
    if(!props.open && mode === "edit"){
      setSelectedBooking(initialValues);
    }
  }, [props.open]);

  useEffect(()=>{

  },[selectedBooking])


  const form = useForm<Order>({
    // TODO : implement later
    resolver: zodResolver(orderSchema),
    defaultValues,
  });

  // Watch the entire form for changes
  const formValues = form.watch();
  useEffect(() => {
    // Log the updated form values whenever they change
    //console.log("Form Values Changed:", formValues);
  }, [formValues]);

  useEffect(() => {
    if (selectedBooking) {
      form.reset(defaultValues);
    }
  }, [selectedBooking, defaultValues, form]);

  const toggleFullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  const onSubmit = async (data: Order) => {
    try {
      const mappedShipperDetails = data.shipper_details?.map(item => ({ ...item, date: item.date ? format(item.date, "yyyy-MM-dd") : "" }))
      data.shipper_details = mappedShipperDetails
      setIsLoading(true);

      try {
        if (!data.ID) {
          await add.mutateAsync(data as Order)
          toast({
            title: "Success!",
            description: "Your order has been created",
          });
        } else {
          await update.mutateAsync({ ...data as Order, id: data.ID })
          toast({
            title: "Success!",
            description: "Your order has been updated",
          });
        }
      } catch (e) {
        toast({
          title: "Failed!",
          variant:"destructive",
          description: "Your request failed",
        });
      }

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className={
          isFullScreen
            ? "w-screen h-screen max-w-none"
            : "max-w-6xl top-8 translate-y-0"
        }
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="flex flex-row justify-between items-center space-y-0">
              <DialogTitle>
                {mode === "create" ? "New Orders" : "Edit Order"}
              </DialogTitle>
              <div className="flex flex-row items-center justify-end text-muted-foreground gap-2">
                <Button
                  onClick={toggleFullScreen}
                  variant={"ghost"}
                  size={"icon"}
                  className="w-6 h-6"
                  type="button"
                >
                  <ArrowsPointingOutIcon className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  size={"icon"}
                  className="w-6 h-6"
                  type="button"
                >
                  <XMarkIcon className="w-5 h-5" />
                </Button>
              </div>
            </DialogHeader>
            <Tabs defaultValue="booking-details">
              <div className="w-full flex flex-row items-stretch gap-4 pt-4">
                <div className="min-w-[220px]">
                  <Card className="h-full">
                    <TabsList className="p-0 py-2  ">
                      <TabsTrigger value="booking-details">
                        <SquarePenIcon className="w-4 h-4" />
                        Booking Details
                      </TabsTrigger>
                      <TabsTrigger value="consignment-details">
                        <PlaneIcon className="w-4 h-4" />
                        Consignment Details
                      </TabsTrigger>
                      <TabsTrigger value="shipper-details">
                        <UserIcon className="w-4 h-4" />
                        Shipper Details
                      </TabsTrigger>
                      <TabsTrigger value="process-rates">
                        <PackageIcon className="w-4 h-4" />
                        Process Rates
                      </TabsTrigger>
                    </TabsList>
                    <Separator />
                    <TabsList className="p-0 py-2 ">
                      <TabsTrigger value="activity-log">
                        <HistoryIcon className="w-4 h-4" />
                        Activity Log
                      </TabsTrigger>
                    </TabsList>
                  </Card>
                </div>
                <div className="flex-1 grid">
                  <TabsContent value="booking-details" asChild>
                    <CreateBookingForm
                    />
                  </TabsContent>
                  <TabsContent value="consignment-details" asChild>
                    <ConsignmentDetailsForm
                    />
                  </TabsContent>
                  <TabsContent value="shipper-details" asChild>
                    <ShipperDetailsForm />
                  </TabsContent>
                  <TabsContent value="process-rates" asChild>
                    <ProcessRatesForm />
                  </TabsContent>
                  <TabsContent value="activity-log" asChild>
                    <ActivityLog />
                  </TabsContent>
                </div>
                <div className="gap-4 max-w-[300px] flex flex-col items-stretch justify-between">
                  <div className="space-y-4">
                    <OrderSummaryCard {...formValues} />
                    <DimensionsCard {...formValues} />
                    <BalanceCard {...formValues} />
                  </div>
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant={"button-secondary"}
                      className="w-full"
                    >
                      <ScrollTextIcon className="w-4 h-4 mr-2" />
                      View Invoice
                    </Button>
                    <Button
                      isLoading={isLoading}
                      variant={"button-primary"}
                      className="w-full"
                      type="submit"
                    >
                      Save Reservation
                    </Button>
                  </div>
                </div>
              </div>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
