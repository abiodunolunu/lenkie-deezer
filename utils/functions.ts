export function convertSeconds(seconds: number) {
  seconds = Math.round(seconds);
  let hours = Math.floor(seconds / 3600);
  let remainingSeconds = seconds % 3600;
  let minutes = Math.floor(remainingSeconds / 60);
  let remainingSecondsAfterMinutes = remainingSeconds % 60;

  let result = "";
  if (hours > 0) {
    result += hours + ":";
  }
  result +=
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (remainingSecondsAfterMinutes < 10 ? "0" : "") +
    remainingSecondsAfterMinutes;
  return result;
}

export function shuffle<T>(array: T[]) {
  const copy = [...array];
  let currentIndex = copy.length,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    [copy[currentIndex], copy[randomIndex]] = [
      copy[randomIndex],
      copy[currentIndex],
    ];
  }

  return copy;
}
