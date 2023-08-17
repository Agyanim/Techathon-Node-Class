import { AxiosError } from "axios";
import {
  createAccountService,
  createBioInfoService,
  getBioInfoService,
  getCurrentUserService,
  logIntoAccountService,
  updateBioInfoService,
} from "./accountServices";

export const getCurrentUser = async (
  id: string,
) => {
  try {
    // fetching data from account API
    const result = await getCurrentUserService(id);
    if (result) {
      const data = result.data.account;
      const currentUser = {
        accountId: data._id,
        accountName: data.name,
        address: data.address,
        accountNumber: data.accountNumber,
      };
      // setting data into the user state hook
      return  currentUser;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      alert(axiosError.response?.data);
    //   console.log(axiosError.response.data);
    }
  }
};

export const updateBioInfo = async (endPoint: string, bioInfo: BioInfo) => {
  try {
    await updateBioInfoService(endPoint, bioInfo);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      alert(axiosError.response?.data);
    //   console.log(axiosError.response.data);
    }
  }
};
export const createAccount = async (
  url: string,
  account: { accountName: string; address: string }
) => {
  try {
    return await createAccountService(url, account);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return alert(axiosError.response?.data);
    }
  }
};

export const getBioInfo = async (endPoint: string) => {
  try {
    const result= await getBioInfoService(endPoint);
    if (result){
        const data=result.data.bioInfo
        const bioInfo={
                accountId: data.accountId,
                firstName: data.firstName,
                lastName: data.lastName,
                occupation: data.occupation,
                phone:data.phone
        }
        return bioInfo
    }

  } catch (error) {
    const AxiosError= error as AxiosError
    if (AxiosError.response){
        alert(AxiosError.response?.data)
    }
  }
};

export const createBioInfo = async (endPoint: string, bioInfo: BioInfo) => {
  try {
    await createBioInfoService(endPoint, bioInfo);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError) {
      alert(axiosError.response?.data);
      // console.log(axiosError.message);
    }
  }
};
export const logIntoAccount = async (url: string, account: AuthAccount) => {
  try {
    return await logIntoAccountService(url, account);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      alert(axiosError.response.data);
    }
  }
};
