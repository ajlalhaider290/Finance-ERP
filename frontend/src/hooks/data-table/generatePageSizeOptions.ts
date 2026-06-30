export function generatePageSizeOptions(pageSize: number, maxRows: number): number[] {
  if (pageSize === -1 || pageSize === maxRows) return [pageSize];
  const options: number[] = [];
  for (let i = 1; i <= 4; i++) {
    const val = pageSize * i;
    if (val >= maxRows) break;
    options.push(val);
  }
  if (!options.includes(maxRows)) options.push(maxRows);
  return options;
}
