function pickRandomFromArray<T>(array: T[], count: number): T[] {
  const result: T[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    result.push(array[randomIndex]);
  }

  return result;
}

export default pickRandomFromArray;
