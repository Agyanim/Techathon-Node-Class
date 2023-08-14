import { Outlet } from "react-router-dom";
const GlobalLayoutUerDashboard = () => {
	return (
			<div className="lg:grid lg:grid-cols-6 w-full h-screen ">
				<div className="  bg-pink-500 border-r  border-white">Global Layout User Dashboard</div>
			<div className="col-span-5">

			<Outlet />
			</div>
			</div>
	);
};

export default GlobalLayoutUerDashboard;
