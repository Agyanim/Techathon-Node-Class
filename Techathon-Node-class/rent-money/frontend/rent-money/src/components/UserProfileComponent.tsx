import { FormEvent, ChangeEvent, useState, useEffect, useRef } from "react";
import { useUserContent } from "../contexts/UserContext";
import { getCurrentUserService } from "../util/accountServices";
import { updateAccount } from "../util/createAccount";
const initialState: UserAccount = {
	accountId: "",
	accountName: "",
	address: "",
	accountNumber: "",
};

const UserProfileComponent = () => {
	const { ...User } = useUserContent();
	const currentUser = User.currentUser;
	// user state hook
	const [user, setUser] = useState<UserAccount>(initialState);
	const accountNameRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		//fetching stored data from localStorage
		const storedUser = localStorage.getItem("currentUser");
		let passedUser;
		//checking if results from localStorage exist
		if (storedUser) {
			passedUser = JSON.parse(storedUser);
		}
		//getting the user id form localStorage of from context
		const Id = currentUser.accountId || passedUser.accountId;
		getCurrentUserService(Id, setUser);
		accountNameRef.current?.focus();
	},[]);
		

	const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e?.target.value;
		setUser({ ...user, [e.target.name]: value });
	};

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		const account = {
			accountName: user.accountName,
			address: user.address,
		};
		await updateAccount(`/account/${user.accountId}`, account);

		alert("Account updated successfully");
	};
	return (
		<section className="flex items-center justify-center w-[100%] h-screen">
			<form
				className=" profile-form flex flex-col w-[90%] md:w-[60%] lg:w-[30%] h-[65%] border border-red-300 rounded px-[10%] md:px-[5%] lg:px-[3%] justify-center items-center lg:h-[55%] form-div"
				onSubmit={submitHandler}
			>
				<div>
					<label className="profile-label" htmlFor="accountName">
						Account name:
					</label>
					<br />
					<input
						ref={accountNameRef}
						className="profile-text-input"
						type="text"
						placeholder="Enter Account Name"
						name="accountName"
						value={user.accountName}
						onChange={onchangeHandler}
					/>
				</div>
				<div>
					<label className="profile-label" htmlFor="address">
						Address:
					</label>
					<br />

					<input
						className="profile-text-input"
						type="text"
						placeholder="address"
						name="address"
						value={user.address}
						onChange={onchangeHandler}
					/>
				</div>
				<br />
				<button
					type="submit"
					className="w-full py-2 text-lg font-bold text-white bg-pink-600 border-none rounded hover:bg-red-700"
				>
					Update
				</button>
			</form>
		</section>
	);
};

export default UserProfileComponent;
