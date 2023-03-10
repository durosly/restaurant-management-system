import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useCart } from "react-use-cart";
import { withSessionSsr } from "../lib/withSession";
import UserWrapper from "../components/layout/userWrapper";
import CategoryModel from "../models/category";
import AppContext from "../store/AppContext";
import Image from "next/image";

function Menu({ user, categories }) {
	const router = useRouter();
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const { addItem, inCart, removeItem } = useCart();
	// console.log(router);
	// console.log(inCart("nice"), "in-cart");
	const { category } = router.query;
	const [menuItems, setMenuItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function loadProduct() {
			let query = "/api/product/get-by-category";
			// console.log(category);
			if (category) {
				// console.log(category);
				query += `?category=${category}`;
			}
			try {
				const response = await axios(query);
				if (response.data.ok) {
					// console.log(response.data);
					setMenuItems(response.data.products);
				} else {
					throw new Error(response.data.msg);
				}
			} catch (error) {
				let errorMsg = "";

				if (error?.response) {
					errorMsg = error.response.data.msg;
				} else {
					errorMsg = error.message;
				}
				console.log(error);
				setIsLoading(false);
				showToast({
					alert_type: "danger",
					message: errorMsg,
				});
			}
		}

		loadProduct();
	}, [category]);

	return (
		<UserWrapper user={user}>
			<div className="container mx-auto px-5 my-10">
				<div className="text-center my-10">
					<ul className="menu menu-vertical md:menu-horizontal bg-primary rounded-box">
						<li>
							<Link href="/menu">All</Link>
						</li>
						{categories &&
							categories.length > 0 &&
							categories.map((c) => (
								<li>
									<Link
										key={c._id}
										href={`/menu?category=${c._id}`}
									>
										{c.name}
									</Link>
								</li>
							))}
					</ul>
				</div>
				<div className="flex flex-wrap gap-5 justify-center">
					{isLoading && (
						<div className="w-10 h-10 bg-slate-700 animate-pulse">
							Loading...
						</div>
					)}
					{menuItems &&
						menuItems.length > 0 &&
						menuItems.map((item) => (
							<div
								key={item._id}
								className="card w-96 bg-base-100 shadow-xl"
							>
								<figure className="relative h-52">
									<Image
										className="object-cover"
										src={`/products/${item.images[0]}`}
										alt={item.name}
										fill
										sizes="30vw"
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
										{new Array(3).fill(0).map((item, i) => {
											if (i + 1 === item?.rating) {
												return (
													<input
														type="radio"
														name="rating-2"
														className="mask mask-star-2 bg-orange-400"
														// checked={item.rating === 1}
														checked
														key={i}
													/>
												);
											} else {
												return (
													<input
														type="radio"
														name="rating-2"
														className="mask mask-star-2 bg-orange-400"
														key={i}
													/>
												);
											}
										})}
									</div>
									<div className="card-actions justify-end">
										<button
											className={`btn btn-sm ${
												inCart(item._id) === true
													? "glass"
													: "btn-primary"
											} gap-2`}
											onClick={
												inCart(item._id) === true
													? () => removeItem(item._id)
													: () =>
															addItem({
																name: item.name,
																id: item._id,
																price: item.price,
																img: item
																	.images[0],
																summary:
																	item.short_summary,
															})
											}
										>
											<svg
												className="w-5 h-5"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
												<path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" />
											</svg>
										</button>
										<Link
											className="btn btn-sm btn-secondary gap-2"
											href={`/product/${item._id}`}
										>
											<svg
												className="w-5 h-5"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
												<path d="M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z" />
											</svg>
										</Link>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</UserWrapper>
	);
}

export default Menu;

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req }) {
		const user = req.session.user;

		const categories = await CategoryModel.find({});

		return {
			props: {
				user: user || null,
				categories: JSON.parse(JSON.stringify(categories)),
			},
		};
	}
);
