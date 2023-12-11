import axios from "axios";

// Function to check if the email is disposable using Debounce API
export const isDisposableEmail = async (email) => {
  try {
    const { data } = await axios.get(
      `https://disposable.debounce.io/?email=${email}`
    );
    return data.disposable === "true"; // Convert the string to boolean
  } catch (error) {
    console.error("Error while checking disposable email:", error);
    return false;
  }
};
