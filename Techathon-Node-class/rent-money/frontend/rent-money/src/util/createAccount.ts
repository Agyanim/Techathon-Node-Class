import axios, { AxiosError } from "axios";

export const instance = axios.create({
	baseURL: "http://127.0.0.1:3000",
});
export const createAccount = async (
	url: string,
	account: { accountName: string; address: string }
) => {
	try {
		const result = await instance.post(url, account);
		return result;
	} catch (error) {
        const axiosError= error as AxiosError
        if(axiosError.response){
         return   alert(axiosError.response.data)
        }
		console.log(error);
	}
};

export const logIntoAccount = async (url: string, account: AuthAccount) => {
	try {
		const result = await instance.post(url, account);
		return result;
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response) {
			alert(axiosError.response.data);
		}
        else{
            alert(axiosError.message);
            
        }
	}
};

export const getCurrentUser=async(url:string)=>{

	try {
		const currentUser=await instance.get(url)
		return currentUser
	
	} catch (error) {
		const axiosError = error as AxiosError
		if (axiosError.response){
			alert("An error occurred. Check your URL and try again")
			console.log(axiosError.response.data);
			
		}
	}
}

export const updateAccount=async(url: string, account: Account)=>{
	await instance.put(url,account)
}