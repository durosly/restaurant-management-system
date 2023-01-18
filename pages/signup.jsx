import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import UserWrapper from "../components/layout/userWrapper";
import AppContext from "../store/AppContext";

function Signup() {
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [profile, setProfile] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	});

	// showToast({
	// 	alert_type: "success",
	// 	message: "signup successfull. Login to complete registration",
	// });

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		// setShowAlert({ show: true, type: "warning", msg: "submitting..." });

		try {
			await axios.post("/api/customer/signup", profile);
			showToast({
				alert_type: "success",
				message: "signup successfull. Login to complete registration",
			});

			let path = "/";

			if (localStorage.getItem("D_PREVIOUS_HISTORY"))
				path = localStorage.getItem("D_PREVIOUS_HISTORY");
			setTimeout(() => router.push(path), 10000);

			// console.log(response);
			// setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			showToast({
				alert_type: "danger",
				message: error.response.data.msg,
			});
		}
	}

	return (
		<UserWrapper>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Signup now!</h1>
						<p className="py-6">
							Provident cupiditate voluptatem et in. Quaerat
							fugiat ut assumenda excepturi exercitationem quasi.
							In deleniti eaque aut repudiandae et a id nisi.
						</p>
					</div>
					<form
						onSubmit={handleSubmit}
						className="card flex-shrink-0 w-full max-w-[50%] shadow-2xl bg-base-100"
					>
						<div className="card-body">
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Firstname
									</span>
								</label>
								<input
									type="text"
									placeholder="Firstname..."
									className="input input-bordered"
									name="firstname"
									value={profile.firstname}
									onChange={(e) =>
										setProfile({
											...profile,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Lastname</span>
								</label>
								<input
									type="text"
									placeholder="Lastname"
									className="input input-bordered"
									name="lastname"
									value={profile.lastname}
									onChange={(e) =>
										setProfile({
											...profile,
											[e.target.name]: e.target.value,
										})
									}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="text"
									placeholder="email"
									className="input input-bordered"
									name="email"
									value={profile.email}
									onChange={(e) =>
										setProfile({
											...profile,
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
									value={profile.password}
									onChange={(e) =>
										setProfile({
											...profile,
											[e.target.name]: e.target.value,
										})
									}
								/>
								<label className="label">
									Already a customer?
									<Link
										href="/login"
										className="label-text-alt link link-hover"
									>
										Login instead
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
									{isLoading ? "Loading..." : "Signup"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</UserWrapper>
	);
}

export default Signup;
