import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { withSessionSsr } from "../lib/withSession";
import UserWrapper from "../components/layout/userWrapper";

function Cart({ user }) {
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
		<UserWrapper user={user}>
			<h2 className="text-6xl text-center my-5">Cart</h2>
			<div className="container">
				{data.isEmpty ? (
					<div className="text-center bg-slate-600 max-w-lg mx-auto rounded-2xl shadow-2xl mb-4 p-4">
						<svg
							className="max-w-sm mx-auto"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							data-name="Layer 1"
							viewBox="0 0 896 747.97143"
						>
							<title>empty_cart</title>
							<path
								d="M193.634,788.75225c12.42842,23.049,38.806,32.9435,38.806,32.9435s6.22712-27.47543-6.2013-50.52448-38.806-32.9435-38.806-32.9435S181.20559,765.7032,193.634,788.75225Z"
								transform="translate(-152 -76.01429)"
								fill="#2f2e41"
							/>
							<path
								d="M202.17653,781.16927c22.43841,13.49969,31.08016,40.3138,31.08016,40.3138s-27.73812,4.92679-50.17653-8.57291S152,772.59636,152,772.59636,179.73811,767.66958,202.17653,781.16927Z"
								transform="translate(-152 -76.01429)"
								fill="#661ae6"
							/>
							<rect
								x="413.2485"
								y="35.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="513.2485"
								y="37.40779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="452.2485"
								y="37.40779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="484.2485"
								y="131.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="522.2485"
								y="113.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="583.2485"
								y="113.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="670.2485"
								y="176.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="708.2485"
								y="158.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="769.2485"
								y="158.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="656.2485"
								y="640.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="694.2485"
								y="622.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="755.2485"
								y="622.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="417.2485"
								y="319.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="455.2485"
								y="301.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="516.2485"
								y="301.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="461.2485"
								y="560.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="499.2485"
								y="542.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="560.2485"
								y="542.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="685.2485"
								y="487.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="723.2485"
								y="469.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="784.2485"
								y="469.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<polygon
								points="362.06 702.184 125.274 702.184 125.274 700.481 360.356 700.481 360.356 617.861 145.18 617.861 134.727 596.084 136.263 595.347 146.252 616.157 362.06 616.157 362.06 702.184"
								fill="#2f2e41"
							/>
							<circle
								cx="156.78851"
								cy="726.03301"
								r="17.88673"
								fill="#3f3d56"
							/>
							<circle
								cx="333.10053"
								cy="726.03301"
								r="17.88673"
								fill="#3f3d56"
							/>
							<circle
								cx="540.92726"
								cy="346.153"
								r="11.07274"
								fill="#3f3d56"
							/>
							<path
								d="M539.38538,665.76747H273.23673L215.64844,477.531H598.69256l-.34852,1.10753Zm-264.8885-1.7035H538.136l58.23417-184.82951H217.95082Z"
								transform="translate(-152 -76.01429)"
								fill="#2f2e41"
							/>
							<polygon
								points="366.61 579.958 132.842 579.958 82.26 413.015 418.701 413.015 418.395 413.998 366.61 579.958"
								fill="#f2f2f2"
							/>
							<polygon
								points="451.465 384.7 449.818 384.263 461.059 341.894 526.448 341.894 526.448 343.598 462.37 343.598 451.465 384.7"
								fill="#2f2e41"
							/>
							<rect
								x="82.2584"
								y="458.58385"
								width="345.2931"
								height="1.7035"
								fill="#2f2e41"
							/>
							<rect
								x="101.45894"
								y="521.34377"
								width="306.31852"
								height="1.7035"
								fill="#2f2e41"
							/>
							<rect
								x="254.31376"
								y="402.36843"
								width="1.7035"
								height="186.53301"
								fill="#2f2e41"
							/>
							<rect
								x="385.55745"
								y="570.79732"
								width="186.92877"
								height="1.70379"
								transform="translate(-274.73922 936.23495) rotate(-86.24919)"
								fill="#2f2e41"
							/>
							<rect
								x="334.45728"
								y="478.18483"
								width="1.70379"
								height="186.92877"
								transform="translate(-188.46866 -52.99638) rotate(-3.729)"
								fill="#2f2e41"
							/>
							<rect
								y={745}
								width={896}
								height={2}
								fill="#2f2e41"
							/>
							<path
								d="M747.41068,137.89028s14.61842,41.60627,5.62246,48.00724S783.39448,244.573,783.39448,244.573l47.22874-12.80193-25.86336-43.73993s-3.37348-43.73992-3.37348-50.14089S747.41068,137.89028,747.41068,137.89028Z"
								transform="translate(-152 -76.01429)"
								fill="#a0616a"
							/>
							<path
								d="M747.41068,137.89028s14.61842,41.60627,5.62246,48.00724S783.39448,244.573,783.39448,244.573l47.22874-12.80193-25.86336-43.73993s-3.37348-43.73992-3.37348-50.14089S747.41068,137.89028,747.41068,137.89028Z"
								transform="translate(-152 -76.01429)"
								opacity="0.1"
							/>
							<path
								d="M722.87364,434.46832s-4.26731,53.34138,0,81.07889,10.66828,104.5491,10.66828,104.5491,0,145.08854,23.4702,147.22219,40.53945,4.26731,42.6731-4.26731-10.66827-12.80193-4.26731-17.06924,8.53462-19.20289,0-36.27213,0-189.8953,0-189.8953l40.53945,108.81641s4.26731,89.61351,8.53462,102.41544-4.26731,36.27213,10.66827,38.40579,32.00483-10.66828,40.53945-14.93559-12.80193-4.26731-8.53462-6.401,17.06924-8.53462,12.80193-10.66828-8.53462-104.54909-8.53462-104.54909S879.69728,414.1986,864.7617,405.664s-24.537,6.16576-24.537,6.16576Z"
								transform="translate(-152 -76.01429)"
								fill="#2f2e41"
							/>
							<path
								d="M761.27943,758.78388v17.06924s-19.20289,46.39942,0,46.39942,34.13848,4.8083,34.13848-1.59266V763.05119Z"
								transform="translate(-152 -76.01429)"
								fill="#2f2e41"
							/>
							<path
								d="M887.16508,758.75358v17.06924s19.20289,46.39941,0,46.39941-34.13848,4.80831-34.13848-1.59266V763.02089Z"
								transform="translate(-152 -76.01429)"
								fill="#2f2e41"
							/>
							<circle
								cx="625.28185"
								cy="54.4082"
								r="38.40579"
								fill="#a0616a"
							/>
							<path
								d="M765.54674,201.89993s10.66828,32.00482,27.73752,25.60386l17.06924-6.401L840.22467,425.9337s-23.47021,34.13848-57.60869,12.80193S765.54674,201.89993,765.54674,201.89993Z"
								transform="translate(-152 -76.01429)"
								fill="#661ae6"
							/>
							<path
								d="M795.41791,195.499l9.60145-20.26972s56.54186,26.67069,65.07648,35.20531,8.53462,21.33655,8.53462,21.33655l-14.93559,53.34137s4.26731,117.351,4.26731,121.61834,14.93559,27.73751,4.26731,19.20289-12.80193-17.06924-21.33655-4.26731-27.73751,27.73752-27.73751,27.73752Z"
								transform="translate(-152 -76.01429)"
								fill="#3f3d56"
							/>
							<path
								d="M870.09584,349.12212l-6.401,59.74234s-38.40579,34.13848-29.87117,36.27214,12.80193-6.401,12.80193-6.401,14.93559,14.93559,23.47021,6.401S899.967,355.52309,899.967,355.52309Z"
								transform="translate(-152 -76.01429)"
								fill="#a0616a"
							/>
							<path
								d="M778.1,76.14416c-8.51412-.30437-17.62549-.45493-24.80406,4.13321a36.31263,36.31263,0,0,0-8.5723,8.39153c-6.99153,8.83846-13.03253,19.95926-10.43553,30.92537l3.01633-1.1764a19.75086,19.75086,0,0,1-1.90515,8.46261c.42475-1.2351,1.84722.76151,1.4664,2.01085L733.543,139.792c5.46207-2.00239,12.25661,2.05189,13.08819,7.80969.37974-12.66123,1.6932-27.17965,11.964-34.59331,5.17951-3.73868,11.73465-4.88,18.04162-5.8935,5.81832-.935,11.91781-1.82659,17.49077.08886s10.31871,7.615,9.0553,13.37093c2.56964-.88518,5.44356.90566,6.71347,3.30856s1.33662,5.2375,1.37484,7.95506c2.73911,1.93583,5.85632-1.9082,6.97263-5.07112,2.62033-7.42434,4.94941-15.32739,3.53783-23.073s-7.72325-15.14773-15.59638-15.174a5.46676,5.46676,0,0,0,1.42176-3.84874l-6.48928-.5483a7.1723,7.1723,0,0,0,4.28575-2.25954C802.7981,84.73052,782.31323,76.29477,778.1,76.14416Z"
								transform="translate(-152 -76.01429)"
								fill="#2f2e41"
							/>
							<path
								d="M776.215,189.098s-17.36929-17.02085-23.62023-15.97822S737.80923,189.098,737.80923,189.098s-51.20772,17.06924-49.07407,34.13848S714.339,323.51826,714.339,323.51826s19.2029,100.28179,2.13366,110.95006,81.07889,38.40579,83.21254,25.60386,6.401-140.82123,0-160.02412S776.215,189.098,776.215,189.098Z"
								transform="translate(-152 -76.01429)"
								fill="#3f3d56"
							/>
							<path
								d="M850.89294,223.23648h26.38265S895.6997,304.31537,897.83335,312.85s6.401,49.07406,4.26731,49.07406-44.80675-8.53462-44.80675-2.13365Z"
								transform="translate(-152 -76.01429)"
								fill="#3f3d56"
							/>
							<path
								d="M850,424.01429H749c-9.85608-45.34-10.67957-89.14649,0-131H850C833.70081,334.115,832.68225,377.62137,850,424.01429Z"
								transform="translate(-152 -76.01429)"
								fill="#f2f2f2"
							/>
							<path
								d="M707.93806,368.325,737.80923,381.127s57.60868,8.53462,57.60868-14.93559-57.60868-10.66827-57.60868-10.66827L718.60505,349.383Z"
								transform="translate(-152 -76.01429)"
								fill="#a0616a"
							/>
							<path
								d="M714.339,210.43455l-25.60386,6.401L669.53227,329.91923s-6.401,29.87117,4.26731,32.00482S714.339,381.127,714.339,381.127s4.26731-32.00483,12.80193-32.00483L705.8044,332.05288,718.60633,257.375Z"
								transform="translate(-152 -76.01429)"
								fill="#3f3d56"
							/>
							<rect
								x="60.2485"
								y="352.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="98.2485"
								y="334.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="159.2485"
								y="334.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="109.2485"
								y="56.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="209.2485"
								y="58.40779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="148.2485"
								y="58.40779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="250.2485"
								y="253.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="350.2485"
								y="255.40779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="289.2485"
								y="255.40779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="12.2485"
								y="252.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="112.2485"
								y="254.40779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="51.2485"
								y="254.40779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="180.2485"
								y="152.90779"
								width={140}
								height={2}
								fill="#f2f2f2"
							/>
							<rect
								x="218.2485"
								y="134.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
							<rect
								x="279.2485"
								y="134.90779"
								width={2}
								height="18.5"
								fill="#f2f2f2"
							/>
						</svg>

						<p>No item in cart</p>
					</div>
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
								disabled={data.isEmpty}
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
