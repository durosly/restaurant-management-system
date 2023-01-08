import { useState } from "react";
import UserWrapper from "../components/layout/userWrapper";

function Menu() {
	const [menuItems, setMenuItems] = useState([
		{
			name: "Nice food",
			img: "https://placeimg.com/400/225/arch",
			desc: "A very interesting me",
			rating: 5,
			price: 7000,
		},
		{
			name: "Nice food",
			img: "https://placeimg.com/400/225/arch",
			desc: "A very interesting me",
			rating: 3,
			price: 700,
		},
		{
			name: "Nice food",
			img: "https://placeimg.com/400/225/arch",
			desc: "A very interesting me",
			rating: 5,
			price: 6000,
		},
		{
			name: "Nice food",
			img: "https://placeimg.com/400/225/arch",
			desc: "A very interesting me",
			rating: 5,
			price: 7000,
		},
		{
			name: "Nice food",
			img: "https://placeimg.com/400/225/arch",
			desc: "A very interesting me",
			rating: 2,
			price: 7000,
		},
		{
			name: "Nice food",
			img: "https://placeimg.com/400/225/arch",
			desc: "A very interesting me",
			rating: 5,
			price: 7000,
		},
	]);

	return (
		<UserWrapper>
			<div className="container mx-auto px-5 my-10">
				<div className="text-center my-10">
					<ul className="menu menu-horizontal bg-primary rounded-box">
						<li>
							<a>Food</a>
						</li>
						<li>
							<a>Drink</a>
						</li>
						<li>
							<a>Snacks</a>
						</li>
					</ul>
				</div>
				<div className="flex flex-wrap gap-5">
					{menuItems &&
						menuItems.length > 0 &&
						menuItems.map((item, i) => (
							<div
								key={i}
								className="card w-96 bg-base-100 shadow-xl"
							>
								<figure>
									<img
										src={item.img}
										alt={item.name}
									/>
								</figure>
								<div className="card-body">
									<h2 className="card-title">
										{item.name}
										<div className="badge badge-secondary">
											{item.price}
										</div>
									</h2>
									<p>{item.desc}</p>
									<div className="rating">
										{new Array(item.rating)
											.fill(0)
											.map((item, i) => {
												if (i + 1 === item.rating) {
													return (
														<input
															type="radio"
															name="rating-2"
															className="mask mask-star-2 bg-orange-400"
															// checked={item.rating === 1}
															checked
														/>
													);
												} else {
													return (
														<input
															type="radio"
															name="rating-2"
															className="mask mask-star-2 bg-orange-400"
														/>
													);
												}
											})}
									</div>
									<div className="card-actions justify-end"></div>
								</div>
							</div>
						))}
				</div>
			</div>
		</UserWrapper>
	);
}

export default Menu;
