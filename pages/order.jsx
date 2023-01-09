import UserWrapper from "../components/layout/userWrapper";

function Order() {
	return (
		<UserWrapper>
			<div className="container mx-auto px-2">
				<h2 className="text-2xl text-center">Orders</h2>
				<ul className="list-none my-5 space-y-4 max-w-lg mx-auto">
					<li>
						<div className="card lg:card-side bg-info-content shadow-xl  px-4">
							<figure>
								<img
									className="w-[100px] h-[100px]"
									src="https://placeimg.com/400/400/arch"
									alt="Album"
								/>
							</figure>
							<div className="card-body">
								<h2 className="card-title">
									Fried rice -{" "}
									<span className="font-bold">N7,000</span>
								</h2>
								<p>10/12/2020</p>
								<div className="card-actions justify-end">
									<span className="badge animate-pulse">
										pending...
									</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</UserWrapper>
	);
}

export default Order;
