import { ReactNode, createContext, useContext, useState } from "react";

const initialState: UserAccount = {
	accountId: "",
	accountName: "",
	address: "",
	accountNumber: "",
};

const UserContext = createContext<null | UserContextType>(null);
interface UserContextProviderProp {
	children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProp> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<UserAccount>(initialState);

	const setUser = (user: UserAccount) => {
		setCurrentUser(user);
	};
	const contextValue: UserContextType = {
		currentUser:currentUser,
		setCurrentUser:setUser,
	};
	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		return null;
	} else return context;
};
