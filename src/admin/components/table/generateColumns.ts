import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ReactNode } from "react";

type BaseRow = { id: number;[key: string]: any };

type ColumnConfig<T extends BaseRow> = {
  accessor?: keyof T;
  header: string;
  cell?: (info: any) => ReactNode;
};

type GenerateOptions<T extends BaseRow> = {
  columns: ColumnConfig<T>[];
};


export function generateColumns<T extends BaseRow>({
  columns
}: GenerateOptions<T>): ColumnDef<T, any>[] {
  const helper = createColumnHelper<T>();

  return columns.map((col) => {
    return helper.accessor(col.accessor as keyof T, {
      header: col.header,
      cell: col.cell,
    });
  });
}
