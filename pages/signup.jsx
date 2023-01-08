import Link from "next/link";
import UserWrapper from "../components/layout/userWrapper";

function Signup() {
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
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
										href="/login"
										className="label-text-alt link link-hover"
									>
										Login instead
									</Link>
								</label>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary">
									Signup
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UserWrapper>
	);
}

export default Signup;
