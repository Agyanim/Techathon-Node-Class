import { Routes, Route } from "react-router";
import "./App.css";
import "./index.css"
import Home from "./pages/Home";
import GlobalLayout from "./components/GlobalLayout";
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/LogIn";
import UserDashBoard from "./pages/UserDashBoard";
import GlobalLayoutUerDashboard from "./components/GlobalLayoutUserDashboard";

const App = () => {
	return (
		<Routes>
			<Route path={"/"} element={<GlobalLayout />}>
				<Route index element={<Home />} />
				<Route path="/signup" element={<SignUpPage/>}/>
				<Route path="/login" element={<LogInPage/>}/>
			</Route>
			<Route path={"/login/userdashboard"} element={<GlobalLayoutUerDashboard />}>
				<Route index element={<UserDashBoard />} />
			</Route>
		</Routes>
	);
};

export default App;
