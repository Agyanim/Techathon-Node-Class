import { Routes, Route } from "react-router";
import "./index.css";
import "./App.css";
import Home from "./pages/Home";
import GlobalLayout from "./components/GlobalLayoutComponent";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/LogIn";
import UserDashBoard from "./pages/UserDashBoard";
import GlobalLayoutUerDashboard from "./components/GlobalLayoutUserDashboardComponent";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import GlobalLayoutSettings from "./components/GlobalLayoutSettingsComponent";
import EditUserProfile from "./pages/EditUserProfile";

const App = () => {
	return (
		<Routes>
			<Route path={"/"} element={<GlobalLayout />}>
				<Route index element={<Home />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/login" element={<LogInPage />} />
			</Route>
			<Route
				path={"/userdashboard"} element={<GlobalLayoutUerDashboard />}>
				<Route index element={<UserDashBoard />} />
				{/* <Route path="userdashboard/edituserprofile" element={<EditUserProfile />}/> */}
				<Route path="/userdashboard/userprofile" element={<UserProfile />}/>
			</Route>
			<Route path="/userdashboard/settings" element={<GlobalLayoutSettings/>}>
				<Route index element={<Settings/>}/>
				<Route path="/userdashboard/settings/edituserprofile" element={<EditUserProfile/>}/>
			</Route>
		</Routes>
	);
};

export default App;
