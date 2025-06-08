function pickRandomFromArray<T>(array: T[], count: number): T[] {
  const result: T[] = [];
  const availableIndices = array.map((_, index) => index);

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const selectedIndex = availableIndices[randomIndex];

    result.push(array[selectedIndex]);
    availableIndices.splice(randomIndex, 1);
  }

  return result;
}

export default pickRandomFromArray;
