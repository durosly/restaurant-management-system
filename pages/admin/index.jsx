import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { withSessionSsr } from "../../lib/withSession";
import AppContext from "../../store/AppContext";
import axios from "axios";

function Login() {
	const router = useRouter();

	const {
		toast: { showToast },
	} = useContext(AppContext);

	const [isLoading, setIsLoading] = useState(false);
	const [userInfo, setUserInfo] = useState({ email: "", password: "" });

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			const status = await axios.post("/api/auth/login", {
				...userInfo,
			});

			// console.log(status);

			if (status.data.ok) {
				showToast({
					alert_type: "success",
					message: "Login successful",
				});

				let path = "/admin/dashboard";
				router.push(path);
			} else {
				throw new Error("Invalid credentials");
			}

			// console.log(response);
			// setIsLoading(false);
		} catch (error) {
			// console.log(error);
			setIsLoading(false);
			showToast({
				alert_type: "danger",
				message: error.response.data.message,
			});
		}
	}

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col">
				<div className="text-center">
					<h1 className="text-5xl font-bold">Staff Login</h1>
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<form
						action="/api/auth/signin"
						onSubmit={handleSubmit}
						className="card-body"
					>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								className="input input-bordered"
								name="email"
								value={userInfo.email}
								onChange={(e) =>
									setUserInfo({
										...userInfo,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								className="input input-bordered"
								name="password"
								value={userInfo.password}
								onChange={(e) =>
									setUserInfo({
										...userInfo,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control mt-6">
							<button
								disabled={isLoading}
								className={`btn btn-primary ${
									isLoading && "btn-disabled animate-pulse"
								}`}
							>
								{isLoading ? "Loading..." : "Login"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req }) {
		const user = req.session.user;

		if (user && user.type === "admin") {
			return {
				redirect: {
					destination: "/dashboard",
					permanent: false,
				},
			};
		}

		return {
			props: {},
		};
	}
);
