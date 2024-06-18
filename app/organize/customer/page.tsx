"use client";

import { Download, Search } from "lucide-react";
import MastersPageTemplate, {
  SectionedFormFields,
} from "../masters/components/MastersPageTemplate";
import createActionColumn, { actionColumn, selectColumn } from "../masters/components/columnItem";
import {
  DUMMY_SELECT_OPTIONS,
  DUMMY_SELECT_OPTIONS_STATUS,
} from "../masters/components/dummySelectOptions";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer, customerSchema } from "@/schemas/customer";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAddCustomer, useCustomers, useRemoveCustomer, useUpdateCustomer } from "@/lib/hooks/customers";
import { getDefaults } from "@/schemas/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";



const defaulValues = getDefaults(customerSchema);

export default function MasterCustomerPage() {


  const filterFormFields = [
    {
      name: "customerCode",
      placeholder: "Customer Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "customerName",
      placeholder: "Customer Name",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "airportCode",
      placeholder: "Airport Code",
      type: "text",
      endIcon: <Search />,
    },
    {
      name: "status",
      placeholder: "Status",
      type: "select",
      options: DUMMY_SELECT_OPTIONS_STATUS,
    },
    {
      name: "country",
      placeholder: "Country",
      type: "select",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "warehouseCode",
      placeholder: "Warehouse Code",
      type: "text",
      endIcon: <Search />,
    },
  ];

  const sectionedFormFields: SectionedFormFields[] = [
    {
      fields: [
        {
          name: "ID",
          type: "hidden",
        },
        {
          name: "code",
          placeholder: "customer Code",
          type: "text",
        },
        {
          name: "name",
          placeholder: "Customer Name",
          type: "text",
        },
      ],
    },
    {
      sectionName: "General Information",
      fields: [
        {
          name: "code",
          placeholder: "Customer Code *",
          type: "text",
        },
        {
          name: "name",
          placeholder: "Customer Name *",
          type: "text",
        },
        {
          name: "d2d",
          placeholder: "A2A/D2D *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "iata_agent_code",
          placeholder: "IATA Agent Code",
          type: "text",
        },
        {
          name: "shipper_type",
          placeholder: "Shipper Type *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "ops_email",
          placeholder: "Ops Email",
          type: "text",
        },
        {
          name: "account_email",
          placeholder: "Account's Email *",
          type: "email",
        },
        {
          name: "sales_email",
          placeholder: "Sale's Email",
          type: "email",
        },
        {
          name: "sap_customer_code",
          placeholder: "SAP Customer Codes",
          type: "text",
        },
        {
          name: "customer_type",
          placeholder: "Customer Type",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
      ],
    },
    {
      sectionName: "Shipping Details",
      fields: [
        {
          name: "contact_person",
          placeholder: "Contact Person",
          type: "text",
        },
        {
          name: "mobile_number",
          placeholder: "Mobile Number",
          type: "text",
        },
        {
          name: "address1",
          placeholder: "Address1 *",
          type: "text",
        },
        {
          name: "address2",
          placeholder: "Address2",
          type: "text",
        },
        {
          name: "city",
          placeholder: "City *",
          type: "text",
        },
        {
          name: "country",
          placeholder: "Country *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "phone_no",
          placeholder: "Phone No.",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Billing Details",
      fields: [
        {
          name: "billing_address",
          placeholder: "Billing Address 1",
          type: "text",
        },
        {
          name: "billing_adress2",
          placeholder: "Billing Address 2",
          type: "text",
        },
        {
          name: "billing_city",
          placeholder: "Billing City",
          type: "text",
        },
        {
          name: "billing_state",
          placeholder: "Billing State",
          type: "text",
        },
        {
          name: "billing_country",
          placeholder: "Billing Country",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "billing_zip",
          placeholder: "Billing Zip",
          type: "text",
        },
        {
          name: "contact_person",
          placeholder: "Contact Person",
          type: "text",
        },
        {
          name: "billing_phone_no",
          placeholder: "Billing Phone No",
          type: "text",
        },
        {
          name: "po_number",
          placeholder: "PO Number",
          type: "text",
        },
        {
          name: "base_vol_rate",
          placeholder: "BaseVolRate(CMS) *",
          type: "text",
        },
        {
          name: "gross_weight",
          placeholder: "Gross weight",
          type: "text",
        },
      ],
    },
    {
      sectionName: "Account Details",
      fields: [
        {
          name: "valid_from",
          label: "Valid From *",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "valid_to",
          label: "Valid To *",
          type: "date",
          hideTooltip: true,
        },
        {
          name: "participation_type",
          placeholder: "Participation Type *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "stock_controller",
          placeholder: "Stock Controller *",
          type: "text",
        },
        {
          name: "stock_controller_code",
          placeholder: "Stock Controller Code*",
          type: "text",
        },
        {
          name: "bill_to",
          placeholder: "Bill To *",
          type: "text",
        },
        {
          name: "billing_controller_code",
          placeholder: "Billing Controller Code",
          type: "text",
        },
        {
          name: "gl_code",
          placeholder: "GL Code",
          type: "text",
        },
        {
          name: "bill_type",
          placeholder: "Bill Type *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "credit_controller",
          placeholder: "Credit Controller *",
          type: "text",
        },
        {
          name: "credit_controller_code",
          placeholder: "Credit Controller Code *",
          type: "text",
        },
        {
          name: "commission",
          placeholder: "Commission(%)",
          type: "number",
        },
        {
          name: "incentive",
          placeholder: "Incentive Per Kg",
          type: "number",
        },
        {
          name: "currency_id",
          placeholder: "Currency Code *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "agent_type",
          placeholder: "Agent Type *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "deal_pli",
          placeholder: "Deals PLI applied To",
          type: "text",
        },
        {
          name: "invoice_due",
          placeholder: "Invoice due days *",
          type: "number",
        },
        {
          name: "pp",
          placeholder: "PP",
          type: "text",
        },
        {
          name: "default_pay_mode",
          placeholder: "Default Pay Mode",
          type: "text",
        },
        {
          name: "is_foc",
          placeholder: "Is FOC",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "validate_credit",
          placeholder: "Validate Credit",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "is_active",
          placeholder: "IsActive *",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "rateline_preference",
          placeholder: "Rateline Preference *",
          type: "text",
        },
        {
          name: "is_po_mail",
          placeholder: "IsPOMail",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "is_bonded",
          placeholder: "IsBonded",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "auto_allocate_stock",
          placeholder: "Auto Allocate Stock",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "autoGenerateInvoice",
          placeholder: "Auto Generate Invoice",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "participate_in_cass",
          placeholder: "Participate in CASS",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "billing_on_gross",
          placeholder: "Billing on Gross.wt",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "is_charter",
          placeholder: "IsCharter",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "is_walkin",
          placeholder: "IsWalkIn",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "sr_number_required",
          placeholder: "Sr Number Required",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "select_allow_paymode",
          placeholder: "Select allow paymode",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "allowed_payment_id",
          placeholder: "Allowed Payment Mode",
          type: "text",
        },
      ],
    },
    {
      sectionName: "XML Notification",
      fields: [
        {
          name: "xmlNotification",
          label: "XML Notification",
          type: "checkbox",
        },
        {
          name: "sftpClientCredential",
          placeholder: "SFTP Client Credential",
          type: "select",
          options: DUMMY_SELECT_OPTIONS,
        },
        {
          name: "status",
          placeholder: "Status",
          type: "select",
          options: DUMMY_SELECT_OPTIONS_STATUS,
        },
      ],
    },
    {
      sectionName: "Remarks",
      fields: [
        {
          name: "remarks",
          placeholder: "Remarks",
          type: "text",
        },
      ],
    },
  ];

  const { isLoading, isPending, error, data: customersData } = useCustomers()
  const add = useAddCustomer()
  const update = useUpdateCustomer()
  const remove = useRemoveCustomer()

  const [openForm, setOpenForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [selectedData, setSelectedData] = useState<Customer>()

  const schema = customerSchema
    .partial()
    .required({
      account_email: true,
      code: true,
      name: true,
      shipper_type: true,
      address1: true,
      city: true,
      country: true,
      base_vol_rate: true,
      // participation_type: true,
      // stock_controller: true,
      // bill_type: true,
      // credit_controller: true,
      // credit_controller_code: true,
      // currency_id: true,
      // agent_type: true,
      // invoice_due: true,
      // is_active: true,
      // rateline_preference: true

    })

  const filterForm = useForm();
  const hookForm = useForm({
    defaultValues: getDefaults(schema),
    resolver: zodResolver(schema)
  });

  const onRowClick = (data: any) => {
    const filteredCustomer = Object.entries(data)
      .filter(([key, value]) => value !== null)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Customer);
    setOpenForm(true)
    hookForm.reset(filteredCustomer)
  }

  const onShowDelete = (data: any) => {
    setSelectedData(data)
    setDeleteConfirm(true)
  }
  const onDelete = (data: any) => {
    if (data.ID)
      remove.mutate({ id: data.ID })

  }


  const columns = [
    selectColumn,
    {
      accessorKey: "code",
      header: "Customer Code",
    },
    {
      accessorKey: "name",
      header: "Customer Name",
    },
    {
      accessorKey: "parent_code",
      header: "Parent Code",
    },
    {
      accessorKey: "d2d",
      header: "A2A / D2D",
    },
    {
      accessorKey: "warehouseCode",
      header: "Warehouse Code",
    },
    {
      accessorKey: "airportCode",
      header: "Airport Code",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "validFrom",
      header: "Valid From",
    },
    {
      accessorKey: "validTo",
      header: "Valid To",
    },
    createActionColumn({
      items: [
        {
          label: "Edit",
          value: "edit",
          fn: onRowClick,

        },
        {
          label: "Delete",
          value: "delete",
          fn: onShowDelete,
          shortcut: "⌘⌫"
        }
      ]
    }),
  ];

  const onSave = () => {
    hookForm.handleSubmit(data => {
      let actionText = "created"
      try {
        if (!data.ID)
          add.mutate(data as Customer)
        else {
          actionText = "updated"
          update.mutate({ ...data as Customer, id: data.ID })
        }
        setOpenForm(false)
        toast({
          title: "Success!",
          description: "Customer has been " + actionText,
        });
        hookForm.reset(defaulValues);
      } catch (e) {
        toast({
          title: "Failed!",
          description: "Customer fail to be " + actionText,
        });
      }
    })()
  }

  useEffect(() => {
    if (!openForm) hookForm.reset(defaulValues)
  }, [openForm])

  return (
      <MastersPageTemplate
        heading="Customer Master"
        buttonText="Create Customer"
        columns={columns}
        data={isLoading ? [] : customersData.data}
        filterFormFields={filterFormFields}
        filterHookForm={filterForm}
        hookForm={hookForm}
        sectionedFormFields={sectionedFormFields}
        pageActions={
          <>
            <Button className="gap-2 bg-button-primary text-white hover:bg-button-primary/80">
              <Download size={16} />
              GSTIN
            </Button>
            <Button className="gap-2 bg-button-primary text-white hover:bg-button-primary/80">
              <Download size={16} />
              Export
            </Button>
          </>
        }
        bottomCustomComponent={
          <AlertDialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete {selectedData && `[${selectedData.code}]` + " " + selectedData.name}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(selectedData)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
        onSave={onSave}
        setOpenForm={setOpenForm}
        openForm={openForm}
        onRowClick={onRowClick}
      />
  );
}
