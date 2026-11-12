import type { ReactNode } from "react";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T, index: number) => ReactNode;
  align?: "left" | "right";
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: { label: string; onClick: () => void };
  rowKey?: (row: T, index: number) => string;
}

export function Table<T>({
  columns,
  data,
  loading = false,
  error,
  onRetry,
  onRowClick,
  emptyTitle = "Nothing here yet.",
  emptyDescription,
  emptyAction,
  rowKey,
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="table-wrap" aria-busy="true" aria-label="Loading rows">
        <div className="table-loading">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton" style={{ height: 32, opacity: 1 - index * 0.12 }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-wrap">
        <EmptyState
          title="Could not load this list."
          description={error}
          action={onRetry ? { label: "Retry", onClick: onRetry } : undefined}
        />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="table-wrap">
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="data">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={column.align === "right" ? { textAlign: "right" } : undefined}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowKey ? rowKey(row, rowIndex) : String((row as { id?: string }).id ?? rowIndex)}
              className={onRowClick ? "clickable" : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={column.align === "right" ? { textAlign: "right" } : undefined}
                >
                  {column.render
                    ? column.render(row, rowIndex)
                    : ((row as Record<string, unknown>)[column.key] as ReactNode) ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
