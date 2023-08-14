import { useState } from "react";
import AuthForm from "../components/AuthFormComponent";
const Account: AuthAccount = {
	accountName: "",
	accountNumber: "",
};

const LogInPage = () => {
	const [account, setAccount] = useState<AuthAccount>(Account);

	return (
		<div className="bg-pink-950">
			<h1 className="form-header">SIGN IN</h1>
			<AuthForm account={account} setAccount={setAccount} />
		</div>
	);
};

export default LogInPage;
