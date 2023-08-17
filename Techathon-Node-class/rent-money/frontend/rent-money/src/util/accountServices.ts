import axios from "axios";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

export const createAccountService = async (
  url: string,
  account: { accountName: string; address: string }
) => {
  return await instance.post(url, account);
};

export const logIntoAccountService = async (
  url: string,
  account: AuthAccount
) => {
    return await instance.post(url, account);
};

export const getCurrentUserService = async (url: string) => {
  const currentUser = await instance.get(url);
  return currentUser;
};

export const updateBioInfoService = async (
  endPoint: string,
  bioInfo: BioInfo
) => {
  await instance.put(endPoint, bioInfo);
};

export const createBioInfoService = async (
  endPoint: string,
  bioInfo: BioInfo
) => {
  await instance.post(endPoint, bioInfo);
};

export const getBioInfoService= async(endPoint:string)=>{
	return await instance.get(endPoint)
}