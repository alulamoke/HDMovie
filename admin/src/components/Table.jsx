import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

// Components
import Button from './Button';

// libs
import { cn } from '../lib';

const Orders = ({ filterTitle, data, columns, className }) => {
  const [filtering, setFiltering] = useState('');
  const [sorting, setSorting] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className={cn('flex flex-col gap-y-16', className)}>
      <div className="form-group w-full max-w-screen-sm">
        <label htmlFor="search" className="form-label">
          * FILTER
        </label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder={`${filterTitle}...`}
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto rounded-md border p-8 shadow-sm">
        <table className="w-full ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="whitespace-nowrap p-5 text-start text-2xl font-medium lg:text-[2rem]"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className="odd:bg-[#f0f0f0] even:bg-transparent"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap p-5 text-[1.25rem] text-secondary font-medium lg:text-[1.5rem]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="h-32 text-center">
                <td colSpan={12} className="text-3xl italic text-secondary">
                  No record found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-8">
        <Button
          title="Previous Page"
          solid
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        />
        <span className="text-xl font-semibold text-secondary">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <Button
          title="Next Page"
          solid
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        />
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold text-secondary">Go to page</p>
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-24 rounded-md border bg-transparent p-4 text-xl font-medium outline-none focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold text-secondary">Show</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded-md border bg-white p-4 text-xl font-medium outline-none focus:outline-none"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Orders;
