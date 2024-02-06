type DataItem = number | Record<string, number>;

type ObjectKey<T> = T extends Record<infer K, any> ? K : never;

export function calculateAverage<T extends DataItem>(
  data: T[],
  key?: T extends Record<string, number> ? ObjectKey<T> : never,
): number {
  if (data.length === 0) {
    throw new Error('Array is empty'); // throw an error for an empty array
  }

  if (typeof data[0] === 'number') {
    // Handle array of numbers
    return (
      (data as number[]).reduce((sum, value) => sum + value, 0) / data.length
    );
  } else if (typeof data[0] === 'object') {
    // Handle array of objects
    if (key) {
      // Handle array of objects with a specified key
      const validKeys = Object.keys(data[0]) as ObjectKey<T>[];
      if (!validKeys.includes(key)) {
        throw new Error(`Key "${key}" not found in objects`);
      }

      return (
        (data as Record<string, number>[]).reduce(
          (sum, obj) => sum + obj[key],
          0,
        ) / data.length
      );
    } else {
      // Handle array of objects without a specified key
      const keys = Object.keys(data[0]) as ObjectKey<T>[];
      if (keys.length === 0) {
        throw new Error('Objects in the array have no properties');
      }

      // Calculate average using the first key
      return (
        (data as Record<string, number>[]).reduce(
          (sum, obj) => sum + obj[keys[0]],
          0,
        ) / data.length
      );
    }
  } else {
    throw new Error('Unsupported data type');
  }
}
