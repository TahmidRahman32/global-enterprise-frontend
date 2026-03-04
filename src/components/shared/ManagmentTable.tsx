import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";

interface Column<T> {
   header: string;
   accessor: keyof T | ((row: T) => React.ReactNode);
   className?: string;
}

interface ManagementTableProps<T> {
   data: T[];
   columns: Column<T>[];
   onView?: (row: T) => void;
   onEdit?: (row: T) => void;
   onDelete?: (row: T) => void;
   getRowKey: (row: T) => string | number;
   emptyMassage?: string;
   isRefreshing?: boolean;
}

// export const ManagementTableData = <T,>(props: ManagementTableProps<T>) => {
//    return <div>management table data</div>;
// };

function ManagementTable<T>({
   data = [],
   columns = [],
   onView,
   onEdit,
   onDelete,
   getRowKey,

   emptyMassage = "No data available",
   isRefreshing = false,
}: ManagementTableProps<T>) {
   const hasActions = onView || onEdit || onDelete;
   return (
      <>
         <div className="overflow-x-auto w-full rounded-lg border relative">
            {isRefreshing && (
               <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <span className="text-gray-500">Refreshing...</span>
               </div>
            )}
            <Table className="table w-full">
               <TableHead>
                  <TableRow>
                     {columns?.map((col, index) => (
                        <th key={index} className={col.className}>
                           {col.header}
                        </th>
                     ))}
                     {(onView || onEdit || onDelete) && <th>Actions</th>}
                     {hasActions && <TableHead className="w-[70px]">Actions</TableHead>}
                  </TableRow>
               </TableHead>

               <TableBody>
                  {data.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={columns.length + (hasActions ? 1 : 0)} className="text-center py-4">
                           {emptyMassage}
                        </TableCell>
                     </TableRow>
                  ) : (
                     data?.map((row) => (
                        <TableRow key={getRowKey(row)}>
                           {columns.map((col, index) => (
                              <TableCell key={index} className={col.className}>
                                 {typeof col.accessor === "function" ? col.accessor(row) : String(row[col.accessor])}
                              </TableCell>
                           ))}
                           {hasActions && (
                              <TableCell className="w-[70px]">
                                 <div className="flex space-x-2">
                                    {onView && (
                                       <button onClick={() => onView(row)} className="text-blue-500 hover:text-blue-700">
                                          View
                                       </button>
                                    )}
                                    {onEdit && (
                                       <button onClick={() => onEdit(row)} className="text-green-500 hover:text-green-700">
                                          Edit
                                       </button>
                                    )}
                                    {onDelete && (
                                       <button onClick={() => onDelete(row)} className="text-red-500 hover:text-red-700">
                                          Delete
                                       </button>
                                    )}
                                 </div>
                              </TableCell>
                           )}
                        </TableRow>
                     ))
                  )}
            </TableBody>
            </Table>
         </div>
      </>
   );
}

export default ManagementTable;
