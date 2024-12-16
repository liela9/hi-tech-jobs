import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, 
  TooltipContent, 
  TooltipTrigger, 
  TooltipProvider, 
} from '@/components/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import ActionsMenu from "./ActionsMenu"
import EditDialog from "./EditDialog"


export const getColumns = (currentPath: string, categories: string[]): ColumnDef<Job>[] => {
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
          <div className="capitalize">{row.getValue("title")}</div>
        ),
      },
      {
        accessorKey: "department",
        header: ({ column }) => (
          <Select onValueChange={value => column.setFilterValue(value === "all departments" ? null : value.toLowerCase())}>
            <SelectTrigger>
                <SelectValue placeholder="All departments" />
            </SelectTrigger>
            <SelectContent position="popper" className="capitalize">
                {categories.map((department) => (
                    <SelectItem
                        key={department}
                        value={department}
                    >
                        {department}
                    </SelectItem>
                  ))
                }
            </SelectContent>
          </Select>
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("department")}</div>
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("company")}</div>
        ),
      },
      {
        accessorKey: "referrer",
        header: "Referrer",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("referrer")}</div>
        )
      },
      {
        accessorKey: "submition_time",
        header: "Submition Time",
        cell: ({ row }) => (
          <div>{row.getValue("submition_time")}</div>
        )
      },
      {
        accessorKey: "application_status",
        header: "Status",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("application_status")}</div>
        ),
      },
      {
        id: "editing",
        enableHiding: false,
        cell: ({ row }) => (
          <EditDialog job={row.original}/>
        )
      }
    ];
  }

  if ( currentPath === '/jobs/deleted' ) {
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
          <div className="capitalize">{row.getValue("title")}</div>
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("company")}</div>
        ),
      },
      {
        accessorKey: "city",
        header: "City",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("city")}</div>
        ),
      },
      {
        accessorKey: "referrer",
        header: "Referrer",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("referrer")}</div>
        )
      },
      {
        accessorKey: "submition_time",
        header: "Submition Time",
        cell: ({ row }) => (
          <div>{row.getValue("submition_time")}</div>
        )
      },
      {
        accessorKey: "application_status",
        header: "Status",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("application_status")}</div>
        ),
      },
      {
        id: "editing",
        enableHiding: false,
        cell: ({ row }) => (
          <EditDialog job={row.original}/>
        )
      }
    ]
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
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "department",
      header: ({ column }) => (
        <Select onValueChange={value => column.setFilterValue(value === "all departments" ? null : value.toLowerCase())}>
          <SelectTrigger>
              <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent position="popper" className="capitalize">
              {categories.map((department) => (
                  <SelectItem
                      key={department}
                      value={department.toString()}
                  >
                      {department}
                  </SelectItem>
                ))
              }
          </SelectContent>
        </Select>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("department")}</div>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("company")}</div>
      ),
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("city")}</div>
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
        return ActionsMenu(row.original)
      },
      enableSorting: true,
    }
  ];
}