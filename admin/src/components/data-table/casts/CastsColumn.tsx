import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TCast } from "@/utils/types";

export const CastsColumn: ColumnDef<TCast>[] = [
  {
    accessorKey: "imageurl",
    header: () => "Profile",
    cell: ({ row }) => {
      const { base_url } = useAppSelector((state) => state.config);

      return (
        <img
          src={`${base_url}${row.getValue("imageurl")}`}
          alt="Profile image"
          loading="lazy"
          className="size-12 shrink-0 rounded-md border object-contain"
        />
      );
    },
  },
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
    accessorKey: "birthday",
    header: () => "Birth day",
    cell: ({ row }) => (
      <p className="text-xs font-medium md:text-sm">
        {format(row.getValue("birthday"), "PP")}
      </p>
    ),
  },
  {
    accessorKey: "deathday",
    header: () => "Death day",
    cell: ({ row }) => (
      <p className="text-xs font-medium md:text-sm">
        {row.getValue("deathday")
          ? format(row.getValue("deathday"), "PP")
          : "-"}
      </p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const cast = row.original;

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
                navigator.clipboard.writeText(cast.fullname);
              }}
            >
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
