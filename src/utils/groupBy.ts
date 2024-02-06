type GroupedArray<T, K extends keyof T> = Record<string, T[]>;

export function groupBy<T, K extends keyof T>(arr: T[], key: K): GroupedArray<T, K> {
  return arr.reduce((grouped: GroupedArray<T, K>, item: T) => {
    const keyValue = String(item[key]);

    if (!grouped[keyValue]) {
      grouped[keyValue] = [];
    }

    grouped[keyValue].push(item);
    return grouped;
  }, {} as GroupedArray<T, K>);
}
