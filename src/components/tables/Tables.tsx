"use client";

import { ReactNode } from "react";


interface TableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
}

export default function Table<T>({columns, data, renderRow}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th 
                key={col}
                className="px-4 py-2 text-left font-medium text-gray-700 border-b"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, idx) => renderRow(item, idx))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                Tidak ada data!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}