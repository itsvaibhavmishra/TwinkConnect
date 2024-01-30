import { limit } from "stringz";
const truncateText = (string, n) => {
  if (!string) {
    return string;
  }
  const truncatedText = limit(string, n, "") + "…";
  return truncatedText;
};

export default truncateText;
