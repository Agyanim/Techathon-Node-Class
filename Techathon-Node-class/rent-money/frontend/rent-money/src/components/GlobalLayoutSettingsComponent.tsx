import { Link, Outlet } from "react-router-dom";
import { DashboardSettingsMenuContent} from "../util/menus";
const GlobalLayoutSettings = () => {

const menuContent = DashboardSettingsMenuContent;
	return (
		
		<div className="lg:grid lg:grid-cols-6 w-full h-screen ">
			<div className="  bg-pink-500 border-r  border-white flex flex-col  items-center pt-[5rem] gap-[2rem]">
				{menuContent.map((menu) => (
					<Link className="text-white hover:opacity-60" key={menu.id} to={menu.path}>
						{menu.name}
					</Link>
				))}
			</div>
			<div className="col-span-5">
				<Outlet />
			</div>
		</div>

	);
};

export default GlobalLayoutSettings;
