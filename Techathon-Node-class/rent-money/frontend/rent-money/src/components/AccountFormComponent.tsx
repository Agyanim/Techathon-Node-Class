import { FormEvent, ChangeEvent } from "react";
import { createAccount, createBioInfo } from "../util/accountControls";
import { Link, useLocation } from "react-router-dom";
interface AccountFormProps {
	account: Account;
	setAccount: React.Dispatch<React.SetStateAction<Account>>;
}
const AccountForm: React.FC<AccountFormProps> = ({ account, setAccount }) => {
	const { accountName, address } = account;

	const pathName = useLocation().pathname;
	const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e?.target.value;
		setAccount({ ...account, [e.target.name]: value });
	};
	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e?.preventDefault();
			if (pathName === "/signup") {
				const result = await createAccount("/account", account);
				if (result) {
					const account = result?.data.account;
					const bioInfo = {
						accountId: account._id,
						firstName: "",
						lastName: "",
						occupation: "",
						phone: "",
					};
					await createBioInfo("account/bioinfo", bioInfo);
					alert(`Account Name: ${account.name}
Account Number: ${account.accountNumber}
					`);
					setAccount({
						accountName: "",
						address: "",
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="flex items-center justify-center w-[100%] h-screen">
			<form
				className=" create-account-form flex flex-col w-[90%] md:w-[60%] lg:w-[30%] h-[65%] border border-red-300 rounded px-[10%] md:px-[5%] lg:px-[3%] justify-center items-center lg:h-[55%] form-div"
				onSubmit={submitHandler}
			>
				<div>
					<label htmlFor="accountName">Account name:</label>
					<br />
					<input
						type="text"
						placeholder="Enter Account Name"
						name="accountName"
						value={accountName}
						onChange={onchangeHandler}
					/>
				</div>
				<div>
					<label htmlFor="address">Address:</label>
					<br />

					<input
						type="text"
						placeholder="Enter address here"
						name="address"
						value={address}
						onChange={onchangeHandler}
					/>
				</div>
				<br />
				<button
					type="submit"
					className="w-full py-2 text-lg font-bold text-white bg-pink-600 border-none rounded hover:bg-red-700"
				>
					Submit
				</button>

				<Link className="text-white" to={"/login"}>
					Sign In
				</Link>
			</form>
		</section>
	);
};

export default AccountForm;
