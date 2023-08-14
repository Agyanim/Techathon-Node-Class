import { getCurrentUser } from "./createAccount";

export const  getCurrentUserService = async (id: string,setUser:React.Dispatch<React.SetStateAction<UserAccount>>) => {
    try {
        // fetching data from account API
        const result = await getCurrentUser(`/account/${id}`);
        if (result) {
            const data = result.data.account;
            const currentUser = {
                accountId: data._id,
                accountName: data.name,
                address: data.address,
                accountNumber: data.accountNumber,
            };
            // setting data into the user state hook
            setUser(currentUser);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
    } catch (error) {
        console.log(error);
    }
};
