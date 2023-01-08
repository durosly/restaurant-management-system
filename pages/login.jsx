import Link from "next/link";
import UserWrapper from "../components/layout/userWrapper";

function Login() {
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
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="text"
									placeholder="email"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="text"
									placeholder="password"
									className="input input-bordered"
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
								<button className="btn btn-primary">
									Login
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UserWrapper>
	);
}

export default Login;
