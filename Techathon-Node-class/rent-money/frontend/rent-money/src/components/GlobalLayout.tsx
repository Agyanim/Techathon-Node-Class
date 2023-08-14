import { Outlet } from "react-router-dom";
const GlobalLayout = () => {
	return (
		<>
			<div className="">GlobalLayout</div>
			<Outlet />
		</>
	);
};

export default GlobalLayout;
