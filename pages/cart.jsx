import React from "react";
import UserWrapper from "../components/layout/userWrapper";

function Cart() {
	return (
		<UserWrapper>
			<h2 className="text-6xl text-center my-5">Cart</h2>
			<div className="container">
				<ul className="list-none my-5 space-y-4">
					<li>
						<div className="card lg:card-side bg-info-content shadow-xl max-w-lg mx-auto px-4">
							<figure>
								<img
									className="w-[100px] h-[100px]"
									src="https://placeimg.com/400/400/arch"
									alt="Album"
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title">Fried rice</h2>
								<p>
									Click the button to listen on Spotiwhy app.
								</p>

								<label className="input-group input-group-sm">
									<button className="btn btn-circle">
										<svg
											className="w-5 h-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
										>
											{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
											<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
										</svg>
									</button>
									<input
										type="text"
										placeholder="1"
										className="input input-bordered w-12"
									/>
									<button className="btn btn-circle">
										<svg
											className="w-5 h-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
										>
											{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
											<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
										</svg>
									</button>
								</label>
								<div className="card-actions justify-end">
									<button className="btn btn-sm btn-error">
										<svg
											className="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
										>
											{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
											<path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div className="text-center mb-5">
					<button className="btn btn-primary">Checkout</button>
				</div>
			</div>
		</UserWrapper>
	);
}

export default Cart;
