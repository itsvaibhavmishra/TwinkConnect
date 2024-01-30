import { limit, length } from "stringz";
const truncateText = (string, n) => {
  if (!string) {
    return string;
  }
  const truncatedText = limit(string, n, "");

  if (length(truncatedText) < n) {
    return truncatedText;
  }
  return truncatedText + "…";
};

export default truncateText;
