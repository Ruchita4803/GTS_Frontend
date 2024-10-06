import { Url } from "./Url";
import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(Url.login, {
      email,
      password,
    });
    if (response.data.success) {
      // Save token to localStorage
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

export const Otp = async(otp)=>{
  try {
    const response = await axios.post(Url.otp, { otp });
  if (response.data.success){
      return true;
  } else {
    alert("Invalid OTP.Try again!");
  }
  }catch (error) {
    alert("An error occurred while verify OTP.");
  }
  return false;
  };

export const Signupdata = async (userData)=>{
  try{
    const response = await axios.post(Url.signup, {userData});
    if (response.data.success) {
      return true;
    } else {
      alert("Error occured with SignUp details!");
    }
  }catch(error){
    alert("Error occured:",error);
  }

  return false;
}

