// Function to generate a random strong password
export const generatePassword = () => {
  const length = 12; // Length of the generated password
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*_+-=";
  const numbers = "0123456789";

  let password = "";

  // Ensure at least one character from each category is included
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  // Generate the remaining characters randomly
  const remainingLength = length - 4; // subtracting 4 because we already added one character from each category
  const charset = lowercaseChars + uppercaseChars + specialChars + numbers;

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Shuffle the generated password
  password = shuffleString(password);

  return password;
};

// Function to shuffle a string
const shuffleString = (str) => {
  const array = str.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
};
