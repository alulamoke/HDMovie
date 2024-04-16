import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TCustomers } from "@/utils/types";

export const CustomersColumn: ColumnDef<TCustomers>[] = [
  {
    accessorKey: "fullname",
    header: () => "Full Name",
    cell: ({ row }) => (
      <p className="text-xs font-medium md:text-sm">
        {row.getValue("fullname")}
      </p>
    ),
  },
  {
    accessorKey: "phone",
    header: () => "Phone",
    cell: ({ row }) => (
      <p className="text-xs font-medium md:text-sm">{row.getValue("phone")}</p>
    ),
  },
  {
    accessorKey: "plan",
    header: () => "Plan",
    cell: ({ row }) => (
      <p className="text-xs font-medium md:text-sm">{row.getValue("plan")}</p>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => "Payment",
    cell: ({ row }) => (
      <p className="text-xs font-medium md:text-sm">
        {row.original.paymentStatus.status}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => (
      <p className="text-xs font-medium md:text-sm">{row.getValue("status")}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => "Joined",
    cell: ({ row }) => (
      <p className="text-xs font-medium md:text-sm">
        {format(row.getValue("createdAt"), "PP")}
      </p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                toast.success("Copied!");
                navigator.clipboard.writeText(customer.fullname);
              }}
            >
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Detail</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
