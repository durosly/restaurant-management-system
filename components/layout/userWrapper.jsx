import Footer from "./footer";
import Header from "./header";

function UserWrapper({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

export default UserWrapper;
