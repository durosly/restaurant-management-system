import UserWrapper from "../components/layout/userWrapper";

function Checkout() {
	return (
		<UserWrapper>
			<div className="container">
				<h2 className="text-2xl text-center">Checkout</h2>

				<div className="md:max-w-3xl mx-auto space-y-5 mb-5">
					<div className="space-y-2">
						<h3 className="text-xl">Method of delivery</h3>
						<div className="flex flex-col md:flex-row gap-5">
							<div className="md:w-1/3">
								<input
									type="radio"
									name="delivery"
									className="peer/home hidden"
									id="home"
								/>
								<label
									className="flex gap-2 cursor-pointer border peer-checked/home:border-info px-5 py-4 peer-checked/home:text-info rounded-xl"
									htmlFor="home"
								>
									<svg
										className="w-12 h-12 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
									>
										{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
										<path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z" />
									</svg>
									<div>
										<span className="font-bold block ">
											Home delivery
										</span>
										<span className="text-xs">
											Brought to your doorstep
										</span>
									</div>
								</label>
							</div>
							<div className="md:w-1/3">
								<input
									type="radio"
									name="delivery"
									className="peer/pickup hidden"
									id="pickup"
								/>
								<label
									className="flex gap-2 cursor-pointer border peer-checked/pickup:border-info px-5 py-4 peer-checked/pickup:text-info rounded-xl"
									htmlFor="pickup"
								>
									<svg
										className="w-12 h-12 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
									>
										{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
										<path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z" />
									</svg>
									<div>
										<span className="font-bold block ">
											Self Pickup
										</span>
										<span className="text-xs">
											Pick food at restaurant
										</span>
									</div>
								</label>
							</div>
							<div className="md:w-1/3">
								<input
									type="radio"
									name="delivery"
									className="peer/reserve hidden"
									id="reserve"
								/>
								<label
									className="flex gap-2 cursor-pointer border peer-checked/reserve:border-info px-5 py-4 peer-checked/reserve:text-info rounded-xl"
									htmlFor="reserve"
								>
									<svg
										className="w-12 h-12 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
									>
										{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
										<path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z" />
									</svg>
									<div>
										<span className="font-bold block ">
											In store
										</span>
										<span className="text-xs">
											Reserve table for you
										</span>
									</div>
								</label>
							</div>
						</div>
					</div>
					<div className="space-y-2">
						<h3 className="text-xl">Address</h3>
						<input
							type="text"
							placeholder="Enter address"
							className="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div className="space-y-2">
						<h3 className="text-xl">Payment method</h3>
						<div>
							<button className="btn btn-primary gap-5 mr-5">
								<svg
									className="w-5 h-5 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 576 512"
								>
									{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
									<path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
								</svg>
								Pay now
							</button>
							<button className="btn btn-primary gap-5">
								<svg
									className="w-5 h-5 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 576 512"
								>
									{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
									<path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 352c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z" />
								</svg>
								Pay with cash
							</button>
						</div>
						<div className="flex gap-2">
							<svg
								className="w-5 h-5 fill-success"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
								<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
							</svg>
							<span className="text-success">
								Pay on delivery
							</span>
						</div>
					</div>
					<div className="divider"></div>
					<button className="btn btn-primary">Checkout</button>
				</div>
			</div>
		</UserWrapper>
	);
}

export default Checkout;
