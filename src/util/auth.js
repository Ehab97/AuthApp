import axios from "axios";
import { firbaseConfig, firbaseUrlModes } from "../constants/config";

const urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
const urlSignIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
const urlWithToken = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=`;
export const createUser = async (email, password) => {
  try {
    const response = await authenticate(firbaseUrlModes.signUp, email, password);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await authenticate(firbaseUrlModes.signInWithPassword, email, password);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const authenticate = async (mode, email, password) => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${firbaseConfig.API_KEY}`;
  try {
    const response = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
