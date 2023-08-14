import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<div className="flex flex-col justify-center items-center">
      <h1>Home</h1>
			<Link to="/signup">Create Account</Link>
			<Link to="/login">Log in</Link>
      </div>
		</>
	);
};

export default Home;
