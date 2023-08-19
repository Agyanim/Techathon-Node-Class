import { FormEvent, ChangeEvent, useState, useEffect, useRef } from "react";
import { useUserContext } from "../contexts/UserContext";
import {
  getBioInfo,
  getCurrentUser,
  updateBioInfo,
} from "../util/accountControls";
const initialState: UserAccount = {
  accountId: "",
  accountName: "",
  address: "",
  accountNumber: "",
};
const bioInfoInitialState: BioInfo = {
  firstName: "",
  lastName: "",
  occupation: "",
  phone: "",
};
const EditUserProfile = () => {
  const { ...User } = useUserContext();
  const currentUser = User.currentUser;
  // user state hook
  const [user, setUser] = useState<UserAccount>(initialState);
  const [bioInfo, setBioInfo] = useState<BioInfo>(bioInfoInitialState);
  const firstNameRef = useRef<HTMLInputElement>(null);

  const fetchData = async (Id: string) => {
    const result = await getCurrentUser(Id);
    if (result) {
      setUser(result);
    }
  };
  const fetchUserBioInfo = async (Id: string) => {
    const result = await getBioInfo(Id);
    if (result) {
      setBioInfo(result);
    }
    console.log(result);
  };

  useEffect(() => {
    //fetching stored data from localStorage
    const storedUser = localStorage.getItem("currentUser");
    let passedUser;
    //checking if results from localStorage exist
    if (storedUser) {
      passedUser = JSON.parse(storedUser);
    }
    //getting the user id form localStorage or from context
    const Id = currentUser.accountId || passedUser.accountId;
    fetchData(`account/${Id}`);
    fetchUserBioInfo(`account/bioinfo/${Id}`);

    firstNameRef.current?.focus();
  },[]);

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    setBioInfo({ ...bioInfo, [e.target.name]: value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const updateBioinfo = {
      firstName: bioInfo.firstName,
      lastName: bioInfo.lastName,
      phone: bioInfo.phone,
      occupation: bioInfo.occupation,
    };
    await updateBioInfo(`/account/bioinfo/${user.accountId}`, updateBioinfo);

    alert("Account updated successfully");
  };
  return (
    <section className="flex items-center justify-center w-[100%] ">
      <form
        className=" profile-form flex flex-col w-[90%] md:w-[60%] lg:w-[50%] h-[100%] border border-red-300 rounded px-[10%] md:px-[5%] lg:px-[3%] lg:py-[1.5rem] my-[2rem] justify-center items-center lg:h-[55%] form-div "
        onSubmit={submitHandler}
      >
        <div>
          <label className="" htmlFor="firstName">
            First name:
          </label>
          <input
            ref={firstNameRef}
            className="profile-text-input"
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={bioInfo.firstName}
            onChange={onchangeHandler}
          />
        </div>
        <div>
          <label className="" htmlFor="lastName">
            Last name:
          </label>
          <input
            className="profile-text-input"
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={bioInfo.lastName}
            onChange={onchangeHandler}
          />
        </div>
        <div>
          <label className="" htmlFor="accountName">
            Account name:
          </label>
          <input
            className="profile-text-input"
            type="text"
            placeholder="Account name"
            name="accountName"
            value={user.accountName}
            onChange={onchangeHandler}
            disabled
          />
        </div>
        <div>
          <label className="" htmlFor="address">
            Address:
          </label>

          <input
            className="profile-text-input"
            type="text"
            placeholder="address"
            name="address"
            value={user.address}
            onChange={onchangeHandler}
            disabled
          />
        </div>
        <div>
          <label className="" htmlFor="phone">
            Phone:
          </label>

          <input
            className="profile-text-input"
            type="text"
            placeholder="Phone"
            name="phone"
            value={bioInfo.phone}
            onChange={onchangeHandler}
          />
        </div>
        <div>
          <label className="" htmlFor="occupation">
            Occupation:
          </label>

          <input
            className="profile-text-input"
            type="text"
            placeholder="occupation"
            name="occupation"
            value={bioInfo.occupation}
            onChange={onchangeHandler}
          />
        </div>
        <br />
        <button
          type="submit"
          className="w-full lg:w-[20%] py-2 mt-[-2rem] text-lg font-bold text-white bg-pink-600 border-none rounded hover:bg-red-700 "
        >
          Update
        </button>
      </form>
    </section>
  );
};

export default EditUserProfile;
