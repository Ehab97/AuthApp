import axios from "axios";
import { firbaseConfig, firbaseUrlModes } from "../constants/config";

const urlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
const urlSignIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
const urlWithToken = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=`;
const ResponseStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
export const createUser = async (email, password) => {
  try {
    const response = await authenticate(firbaseUrlModes.signUp, email, password);

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await authenticate(firbaseUrlModes.signInWithPassword, email, password);
    return response;
  } catch (error) {
    console.log(`Login failed: ${error}`);
    throw new Error(`${error}`);
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
    return response.data;
  } catch (error) {
    console.log(`authenticate ${error}`);
    const message = getErrorMessage(error);
    throw new Error(`Authentication failed: ${message}`);
  }
};

const getErrorMessage = (error) => {
    console.log('response',error.response);
  if (error.response) {
    switch (error.response.status) {
      case ResponseStatus.NOT_FOUND:
        return "User not found";
      case ResponseStatus.BAD_REQUEST:
        return "Invalid request";
      case ResponseStatus.UNAUTHORIZED:
        return "Unauthorized";
      case ResponseStatus.INTERNAL_SERVER_ERROR:
        return "Internal server error";
      default:
        return "Unknown error";
    }
  } else {
    return error.message;
  }
};
