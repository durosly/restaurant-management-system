import Footer from "./footer";
import Header from "./header";

function UserWrapper({ children, user }) {
	return (
		<>
			<Header user={user} />
			{children}
			<Footer />
		</>
	);
}

export default UserWrapper;
