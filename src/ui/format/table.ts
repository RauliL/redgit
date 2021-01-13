export type TableDataEntry = [string, string | number];
export type TableData = Array<TableDataEntry | undefined | null>;

export const formatTable = (data: TableData): string[] => {
  const filteredData = data.filter(
    (entry) => entry != null
  ) as TableDataEntry[];
  const maxColumnNameLength = Math.max.apply(
    Math,
    filteredData.map((entry) => entry[0].length)
  );

  return filteredData.map(
    ([key, value]) =>
      `${key}:${" ".repeat(maxColumnNameLength - key.length)} ${value}`
  );
};
