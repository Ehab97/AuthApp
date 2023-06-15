import axios from "axios";
import { firbaseConfig } from "../constants/config";

const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=`;
export const createUser = async (email,password) => {
  try {
    const response = await axios.post(`${url}${firbaseConfig.API_KEY}`,{
        email,
        password,
        returnSecureToken: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
