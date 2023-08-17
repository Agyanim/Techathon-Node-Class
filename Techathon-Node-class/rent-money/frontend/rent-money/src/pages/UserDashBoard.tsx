import { useEffect, useState } from "react";
import { useUserContent } from "../contexts/UserContext";
import { getBioInfo, getCurrentUser } from "../util/accountControls";
const initialState: UserAccount = {
  accountId: "",
  accountName: "",
  address: "",
  accountNumber: "",
};
const UserDashBoard = () => {
  const { ...User } = useUserContent();
  const currentUser = User.currentUser;
  // user state hook
  const [user, setUser] = useState<UserAccount>(initialState);
  const fetchCurrentUser = async (Id: string) => {
    const result = await getCurrentUser(Id);
    if (result) {
      setUser(result);
      localStorage.setItem("currentUser", JSON.stringify(result));
    }
  };
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
    fetchCurrentUser(`account/${Id}`);
  }),
    [];

  return user.accountId ? (
    <div className="bg-pink-200 h-screen grid  grid-rows-6">
      <section className="bg-pink-500 flex items-center gap-5">
        <div className="w-[5rem] h-[5rem] bg-white rounded-full ml-5"></div>
        <div className="flex flex-col">
          <p className="text-white">{user.accountName}</p>
          <p className="text-white">Account: {user.accountNumber}</p>
          <p className="text-white">{user.address}</p>
        </div>
      </section>
      <section className="row-span-5"></section>
    </div>
  ) : (
    <h1>pending...</h1>
  );
};

export default UserDashBoard;
