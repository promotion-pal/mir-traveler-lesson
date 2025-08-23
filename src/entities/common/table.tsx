import { cn } from "@/shared/lib/utils";
import { Pagination } from "@/shared/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
// import { TablePagination } from "./tablePagination";

interface Pagination {
  page: number;
  total: number;
  pageSize: number;
}

interface DataTableProps<T extends Record<string, any>, K extends string> {
  columns: Column<K>[];
  rows: T[];
  renderCell?: (
    value: K extends keyof T ? T[K] : undefined,
    columnKey: K,
    rowData: T
  ) => React.ReactNode;
  className?: string;
  pagination?: Pagination;
}

type Column<K extends string = string> = {
  id: string;
  field: K;
  headerName: string;
  classes?: string;
  align?: "left" | "center" | "right";
};

export const CommonDataTable = <
  T extends Record<string, any>,
  K extends string
>({
  columns,
  rows,
  renderCell,
  className = "",
  pagination,
}: DataTableProps<T, K>) => {
  return (
    <Table className={cn("border-[#E2E7EC]", className)}>
      {/* {typeof pagination !== "undefined" ? (
        <TablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          totalAmount={pagination.total}
        />
      ) : null} */}
      <TableHeader className="border-t">
        <TableRow className="table__row">
          {columns?.map(({ classes, headerName, id, align = "left" }) => (
            <TableHead
              key={id}
              className={cn(classes, "font-medium text-gray-700", {
                "text-left": align === "left",
                "text-center": align === "center",
                "text-right": align === "right",
              })}
            >
              {headerName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length
          ? rows.map((rowProps) => (
              <TableRow key={rowProps.id}>
                {columns.map(({ field, id, align = "left" }) => (
                  <TableCell
                    key={id}
                    className={cn(rowProps.classes, {
                      "text-left": align === "left",
                      "text-center": align === "center",
                      "text-right": align === "right",
                    })}
                  >
                    {typeof renderCell !== "undefined"
                      ? renderCell(rowProps[field], field, rowProps)
                      : typeof rowProps[field] === "string" ||
                        typeof rowProps[field] === "number"
                      ? rowProps[field]
                      : "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};
