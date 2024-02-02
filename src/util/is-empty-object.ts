export function isEmptyObject (o: Record<string, any>): boolean {
  return Object.keys(o).length === 0;
}
