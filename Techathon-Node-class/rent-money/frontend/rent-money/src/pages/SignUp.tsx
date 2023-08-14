import { useState } from "react";
import AccountForm from "../components/AccountForm"
const SignUpPage:React.FC = () => {
  const Account:Account = {
		accountName: "",
		address: "",
	};
	const [account, setAccount] = useState<Account>(Account);

  return (
    <div className="bg-pink-950">
        <h1 className="form-header ">CREATE ACCOUNT</h1>
        <AccountForm account={account} setAccount={setAccount} />
    </div>
  )
}                   

export default SignUpPage