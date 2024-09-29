const wordsToNotCapitalize = [
  "and",
  "the",
  "a",
  "an",
  "but",
  "or",
  "nor",
  "at",
  "by",
  "for",
  "from",
  "in",
  "into",
  "near",
  "of",
  "on",
  "onto",
  "to",
  "with",
  "as",
  "for",
  "in",
  "of",
  "per",
  "to",
]

export function getFriendlyGameName(game: String): string {
  switch (game) {
    case "spyros-adventure-figures":
      return "Spyro's Adventure";
    case "giants-figures":
      return "Giants";
    case "swap-force-figures":
      return "Swap Force";
    case "trap-team-figures":
      return "Trap Team";
    case "superchargers-figures":
      return "Superchargers";
    case "imaginators-figures":
      return "Imaginators";
    default:
      return "Unknown Game";
  }
}

export function turnFriendlyCategoryMean(category: String): string {
    return category.replaceAll(" ", "-");
}

export function turnMeanCategoryFriendly(category: String): string {
  const words = category.split("-");
  let friendlyCategory = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (wordsToNotCapitalize.includes(word)) {
      friendlyCategory += word;
    } else {
      friendlyCategory += word.charAt(0).toUpperCase() + word.slice(1);
    }
    if (i !== words.length - 1) {
      friendlyCategory += " ";
    }
  }

  return friendlyCategory;
}

export function getNumberFromGame(game: String): Number {
  switch (game) {
    case "spyros-adventure-figures":
      return 0;
    case "giants-figures":
      return 1;
    case "swap-force-figures":
      return 2;
    case "trap-team-figures":
      return 3;
    case "superchargers-figures":
      return 4;
    case "imaginators-figures":
      return 5;
    default:
      return -1;
  }
}