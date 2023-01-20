import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { getCsrfToken } from "next-auth/react";
// import axios from "axios";
import AppContext from "../store/AppContext";
import UserWrapper from "../components/layout/userWrapper";
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

				let path = "/";

				// if (localStorage.getItem("D_PREVIOUS_HISTORY"))
				// 	path = localStorage.getItem("D_PREVIOUS_HISTORY");
				// setTimeout(() => router.push(path), 10000);
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
		<UserWrapper>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Login now!</h1>
						<p className="py-6">
							Provident cupiditate voluptatem et in. Quaerat
							fugiat ut assumenda excepturi exercitationem quasi.
							In deleniti eaque aut repudiandae et a id nisi.
						</p>
					</div>
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<div className="card-body">
							<form
								action="/api/auth/signin"
								onSubmit={handleSubmit}
							>
								<div className="form-control">
									<label className="label">
										<span className="label-text">
											Email
										</span>
									</label>
									<input
										type="text"
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
										<span className="label-text">
											Password
										</span>
									</label>
									<input
										type="text"
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
									<label className="label">
										<Link
											href="/forgot-password"
											className="label-text-alt link link-hover"
										>
											Forgot password?
										</Link>
										<Link
											className="label-text-alt link link-hover"
											href="/signup"
										>
											Signup
										</Link>
									</label>
								</div>
								<div className="form-control mt-6">
									<button
										disabled={isLoading}
										className={`btn btn-primary ${
											isLoading &&
											"btn-disabled animate-pulse"
										}`}
									>
										{isLoading ? "Loading..." : "Login"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</UserWrapper>
	);
}

export default Login;

export async function getServerSideProps({ req, res }) {
	try {
		return { props: {} };
	} catch (error) {}
}
