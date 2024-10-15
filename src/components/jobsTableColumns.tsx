import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, 
  TooltipContent, 
  TooltipTrigger, 
  TooltipProvider, 
} from '@/components/ui/tooltip'
import actionsDropdownMenu from './actionsDropdownMenu'


export const getColumns = (currentPath: string): ColumnDef<Job>[] => {
  if ( currentPath === '/jobs/submitted' ) {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div>{row.getValue("title")}</div>
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => (
          <div>{row.getValue("company")}</div>
        ),
      },
      {
        accessorKey: "application_status",
        header: "Status",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("application_status")}</div>
        ),
      },
      {
        accessorKey: "referrer",
        header: "Referrer",
        cell: ({ row }) => (
          <div>{row.getValue("referrer")}</div>
        )
      },
      {
        accessorKey: "submission_time",
        header: "Submission Time",
        cell: ({ row }) => (
          <div>{row.getValue("submission_time")}</div>
        )
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          return actionsDropdownMenu(row.original)
        }
      }
    ];
  }

  // currentPath === '/jobs'
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => (
        <div>{row.getValue("company")}</div>
      ),
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => (
        <div>{row.getValue("city")}</div>
      ),
    },
    {
      accessorKey: "application_status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("application_status")}</div>
      ),
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: ({ row }) => (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={'http://' + row.getValue("url")} target="_blank" >
                  {row.getValue("url")}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Apply for this job</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return actionsDropdownMenu(row.original)
      }
    }
  ];
}