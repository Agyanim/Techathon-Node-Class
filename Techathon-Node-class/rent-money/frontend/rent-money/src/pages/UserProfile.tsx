import { useEffect, useState } from "react";
import { getBioInfoExtend } from "../util/accountControls";
import { useUserContext } from "../contexts/UserContext";

const initialState: BioInfoExtended = {
	firstName: "",
	lastName: "",
	phone: "",
	occupation: "",
	accountId: "",
	Account: [
		{
			name: "",
			accountNumber: "",
			address: "",
		},
	],
};
const UserProfile = () => {
	const { ...User } = useUserContext();
	const currentUser = User.currentUser;
	const [bioInfoExtended, setBioInfoExtended] =
		useState<BioInfoExtended>(initialState);
	const { firstName, lastName, Account, occupation, accountId, phone } =
		bioInfoExtended;
	const account = Account[0];

	const getBioInfoExtendedById = async (id: string) => {
		const result = await getBioInfoExtend(`/account/bioinfoextended/${id}`);
		if (result?.data) {
			setBioInfoExtended(result.data);
		}
	};
	useEffect(() => {
		const storedUser = localStorage.getItem("currentUser");
		let passedUser;
		//checking if results from localStorage exist
		if (storedUser) {
			passedUser = JSON.parse(storedUser);
		}
		//getting the user id form localStorage or from context
		const Id = currentUser.accountId || passedUser.accountId;
		getBioInfoExtendedById(Id);
	});

	return accountId ? (
		<>
    <h1 className="my-[2rem] text-center text-3xl font-bold">User Profile</h1>
			<section className=" profile-section flex justify-center items-center w-full">
        <div className="lg:ml-[-50%]">
					<p>
						Account Number: <span className="font-bold">{account?.accountNumber}</span>
					</p>
					<p >
					First Name: <span> {firstName}</span>
					</p>
					<p>
					Last Name: <span>{lastName}</span>
					</p>
					<p>
						Address: <span>{account?.address}</span>
					</p>
					<p>
						phone: <span>{phone}</span>
					</p>
					<p>
						Occupation: <span>{occupation}</span>
					</p>
					<p>
						Account Name: <span>{account?.name}</span>
					</p>
        </div>
			</section>
		</>
	) : (
		<p>pending...</p>
	);
};

export default UserProfile;
