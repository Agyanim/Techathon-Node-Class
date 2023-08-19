/// <reference types="vite/client" />
interface Account {
	accountName: string;
	address: string;
}
interface AuthAccount {
	accountName: string;
	accountNumber: string;
}
interface UserAccount {
	accountId: string;
	accountName: sting;
	address: string;
	accountNumber: string;
}

interface UserContextType {
	currentUser: UserAccount;
	setCurrentUser: (account: UserAccount) => void;
	// setUserAccount:React.Dispatch<React.SetStateAction<UserAccount>>
}

interface BioInfo {
	firstName: string;
	lastName: string;
	phone: string;
	occupation: string;
}
interface BioInfoExtended {
	firstName: string;
	lastName: string;
	phone: string;
	occupation: string;
	accountId: string;
	Account: [{
        name:string,
        address:string,
        accountNumber:string
    }];
}
