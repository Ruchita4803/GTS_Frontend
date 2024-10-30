import { Url } from "./Url";
import axios from "axios";

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(Url.login, {
      email,
      password,
    });
    if (response.data.success) {
      // Save the token to localStorage
      localStorage.setItem("authToken", response.data.token);
      return true;
    } else {
      alert("Invalid email or password.");
    }
  } catch (error) {
    alert("An error occurred while logging in.");
  }
  return false;
};

// OTP verification function
export const Otp = async (otp) => {
  try {
    const response = await axios.post(Url.otp, { otp });
    if (response.data.success) {
      return true;
    } else {
      alert("Invalid OTP. Try again!");
    }
  } catch (error) {
    alert("An error occurred while verifying OTP.");
  }
  return false;
};

// Signup function
export const Signupdata = async (userData) => {
  try {
    const response = await axios.post(Url.signup, userData); // Fixed passing userData correctly
    if (response.data.success) {
      return true;
    } else {
      alert("Error occurred with SignUp details!");
    }
  } catch (error) {
    alert("An error occurred during signup.");
  }
  return false;
};
