import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { withSessionSsr } from "../lib/withSession";
import UserWrapper from "../components/layout/userWrapper";

function Cart() {
	const { isEmpty, items, updateItemQuantity, removeItem, cartTotal } =
		useCart();

	const [data, setData] = useState({
		isEmpty: true,
		items: [],
		cartTotal: 0,
	});

	useEffect(() => {
		setData({ isEmpty, items, cartTotal });
	}, [isEmpty, items, cartTotal]);
	function updateQuatity(e, id) {
		updateItemQuantity(id, e.target.value);
	}
	// console.log(items, "cart items");
	return (
		<UserWrapper>
			<h2 className="text-6xl text-center my-5">Cart</h2>
			<div className="container">
				{data.isEmpty ? (
					<>No item in cart</>
				) : (
					<>
						<ul className="list-none my-5 space-y-4 max-w-lg mx-auto">
							{data.items &&
								data.items.map((item) => (
									<li key={item.id}>
										<div className="card lg:card-side bg-info-content shadow-xl px-4">
											<div className="relative overflow-hidden lg:mt-5 w-[100px] h-[100px] rounded-full">
												<Image
													className="object-cover"
													src={`/products/${item.img}`}
													fill
													sizes="10vw"
													alt={item.name}
												/>
											</div>
											<div className="card-body">
												<h2 className="card-title">
													{item.name} -{" "}
													<span className="font-bold">
														&#8358;
														{Intl.NumberFormat(
															"en-US"
														).format(item.price)}
													</span>
												</h2>
												<p>{item.summary}</p>

												<label className="input-group input-group-sm">
													<button
														onClick={() =>
															updateItemQuantity(
																item.id,
																item.quantity -
																	1
															)
														}
														className="btn btn-sm btn-circle"
													>
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
														value={item.quantity}
														onChange={(e) =>
															updateQuatity(
																e,
																item.id
															)
														}
														className="input text-center input-sm input-bordered w-12"
													/>
													<button
														onClick={() =>
															updateItemQuantity(
																item.id,
																item.quantity +
																	1
															)
														}
														className="btn btn-sm btn-circle"
													>
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
												<div>
													<p>
														<span className="font-bold">
															Total:{" "}
														</span>
														<span>
															&#8358;
															{Intl.NumberFormat(
																"en-US"
															).format(
																item.itemTotal
															)}
														</span>
													</p>
												</div>
												<div className="card-actions justify-end">
													<button
														onClick={() =>
															removeItem(item.id)
														}
														className="btn btn-sm btn-error"
													>
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
								))}
						</ul>
						<div className="max-w-lg mx-auto">
							<div className="divider"></div>
							<div className="flex justify-between">
								<p className="text-xl">Sub total:</p>
								<p className="text-xl font-bold">
									{!data.isEmpty && (
										<span>
											&#8358;
											{Intl.NumberFormat("en-US").format(
												data.cartTotal
											)}
										</span>
									)}
								</p>
							</div>
						</div>
						<div className="text-center my-5">
							<Link
								href="/checkout"
								className="btn btn-primary gap-2"
							>
								<svg
									className="w-5 h-5 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
									<path d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-216c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm72 24c0-13.3 10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24zm-24 56c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm120-56c0-13.3 10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24zm-24 56c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm120-56c0-13.3 10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24zm-24 56c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24z" />
								</svg>
								Checkout
							</Link>
						</div>
					</>
				)}
			</div>
		</UserWrapper>
	);
}

export default Cart;

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps({ req }) {
		const user = req.session.user;

		// const categories = await CategoryModel.find({});

		return {
			props: {
				user: user || null,
				// categories: JSON.parse(JSON.stringify(categories)),
			},
		};
	}
);
