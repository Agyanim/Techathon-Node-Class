import { FormEvent, ChangeEvent } from "react";
import { logIntoAccount } from "../util/accountControls";
import { Link, useNavigate } from "react-router-dom";
import { useUserContent } from "../contexts/UserContext";

interface AuthAccountFormProps {
	account: AuthAccount;
	setAccount: React.Dispatch<React.SetStateAction<AuthAccount>>;
}
// console.log(localStorage.getItem("currentUser"));

const AuthForm: React.FC<AuthAccountFormProps> = ({ account, setAccount }) => {
	const navigate = useNavigate();
	const { accountName, accountNumber } = account;
	const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e?.target.value;
		setAccount({ ...account, [e.target.name]: value });
	};
	const userContent = useUserContent();
	const { ...currentUser } = userContent;

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		try {
			e?.preventDefault();

			const result = await logIntoAccount("/auth", account);
			console.log(result);
			
			if (result?.data.findAccount) {
				const findAccount = result.data.findAccount;
				if (findAccount) {
					const user = {
						accountId: findAccount._id,
						accountName: findAccount.name,
						address: findAccount.address,
						accountNumber: findAccount.accountNumber,
					};
					console.log(user);
					currentUser.setCurrentUser(user);
					navigate("/login/userdashboard");
					setAccount({
						accountName: "",
						accountNumber: "",
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	// 	const useSubmitHandler=(e: FormEvent<HTMLFormElement>)=>{
	// 	useEffect(() => {
	// 		submitHandler(e)
		
	// 	}, [e])
		
	// }

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
					<label htmlFor="accountNumber">Account Number:</label>
					<br />

					<input
						type="text"
						placeholder="Enter account number here"
						name="accountNumber"
						value={accountNumber}
						onChange={onchangeHandler}
					/>
				</div>
				<br />
				<button
					type="submit"
					className="w-full py-2 text-lg font-bold text-white bg-pink-600 border-none rounded hover:bg-red-700"
				>
					Log in
				</button>

				<Link className="text-white" to={"/signup"}>
					Create account
				</Link>
			</form>
		</section>
	);
};

export default AuthForm;
// const logIn = useRef<HTMLAnchorElement>(null);
// const signUp = useRef<HTMLAnchorElement>(null);
