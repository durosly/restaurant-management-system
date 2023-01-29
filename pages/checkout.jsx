import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";
import UserWrapper from "../components/layout/userWrapper";
import { withSessionSsr } from "../lib/withSession";
import AppContext from "../store/AppContext";

function Checkout({ user }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { isEmpty, items, cartTotal, emptyCart } = useCart();
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const [data, setData] = useState({
		method_of_delivery: "",
		method_of_payment: "",
		address: "",
		reference: new Date().getTime().toString(),
		items,
		total: cartTotal,
	});

	const config = {
		reference: new Date().getTime().toString(),
		email: user.email,
		amount: cartTotal * 100,
		publicKey: "pk_test_1595d971481e77bb7ac48baa7b9b6d8c8730c70f",
	};

	const initializePayment = usePaystackPayment(config);

	const [paymentComplete, setPaymentComplete] = useState(false);

	function onSuccess() {
		setPaymentComplete(true);
		createCheckout();
	}

	function onClose() {
		showToast({
			alert_type: "danger",
			message: "Payment process was not completed",
		});
	}

	useEffect(() => {
		if (isEmpty) router.push("/menu");
	}, []);

	function checkout() {
		if (data.method_of_payment === "pay-now") {
			initializePayment(onSuccess, onClose);
		} else if (data.method_of_payment === "pay-cash") {
			createCheckout();
		} else {
			showToast({
				alert_type: "danger",
				message: "Select a payment method",
			});
		}
	}

	async function createCheckout() {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const response = await axios.post("/api/order/create", data);
			if (response.data.ok) {
				showToast({
					alert_type: "success",
					message: "Order created",
				});
				emptyCart();
				router.push("/order");
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

			showToast({
				alert_type: "danger",
				message: errorMsg,
			});
			setIsLoading(false);
		}
	}

	return (
		<UserWrapper user={user}>
			<div className="container mx-auto px-2">
				<h2 className="text-6xl text-center my-5">Checkout</h2>

				<div className="max-w-3xl mx-auto space-y-5 mb-5">
					<div className="space-y-2">
						<h3 className="text-xl">Method of delivery</h3>
						<div className="flex flex-col md:flex-row gap-5">
							<div className="md:w-1/3">
								<input
									type="radio"
									name="delivery"
									className="peer/home hidden"
									id="home"
									value={data.method_of_delivery}
									checked={data.method_of_delivery === "home"}
									onChange={() =>
										setData({
											...data,
											method_of_delivery: "home",
										})
									}
								/>
								<label
									className="flex gap-2 cursor-pointer border peer-checked/home:border-info px-5 py-4 peer-checked/home:text-info rounded-xl"
									htmlFor="home"
								>
									<svg
										className="w-12 h-12 fill-current"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 640 512"
									>
										{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
										<path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM208 416c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zm272 48c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z" />
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
									value={data.method_of_delivery}
									checked={
										data.method_of_delivery === "pickup"
									}
									onChange={() =>
										setData({
											...data,
											method_of_delivery: "pickup",
										})
									}
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
										<path d="M432 96c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z" />
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
									name="reserve"
									className="peer/reserve hidden"
									id="reserve"
									value={data.method_of_delivery}
									checked={
										data.method_of_delivery === "reserve"
									}
									onChange={() =>
										setData({
											...data,
											method_of_delivery: "reserve",
										})
									}
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
					{data.method_of_delivery === "home" && (
						<div className="space-y-2">
							<h3 className="text-xl">Address</h3>
							<input
								type="text"
								placeholder="Enter address"
								className="input input-bordered w-full max-w-xs"
								value={data.address}
								onChange={(e) =>
									setData({
										...data,
										address: e.target.value,
									})
								}
							/>
						</div>
					)}
					<div className="space-y-2">
						<h3 className="text-xl">Payment method</h3>
						<div>
							<button
								onClick={() =>
									setData({
										...data,
										method_of_payment: "pay-now",
									})
								}
								disabled={data.method_of_payment === "pay-now"}
								className="btn btn-primary gap-5 mb-5 sm:mb-auto mr-5"
							>
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
							<button
								onClick={() =>
									setData({
										...data,
										method_of_payment: "pay-cash",
									})
								}
								disabled={data.method_of_payment === "pay-cash"}
								className="btn btn-primary gap-5"
							>
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
						{data.method_of_payment === "pay-now" &&
							paymentComplete && (
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
										Paid now
									</span>
								</div>
							)}

						{data.method_of_payment === "pay-now" &&
							!paymentComplete && (
								<div className="flex gap-2">
									<svg
										className="w-5 h-5 fill-error"
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
										// className="feather feather-x-circle"
									>
										<circle
											cx={12}
											cy={12}
											r={10}
										/>
										<line
											x1={15}
											y1={9}
											x2={9}
											y2={15}
										/>
										<line
											x1={9}
											y1={9}
											x2={15}
											y2={15}
										/>
									</svg>

									<span className="text-error">Pay now</span>
								</div>
							)}
						{data.method_of_payment === "pay-cash" && (
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
						)}
					</div>
					<div className="divider"></div>

					<button
						onClick={checkout}
						className="btn btn-primary"
					>
						Checkout
					</button>
				</div>
			</div>
		</UserWrapper>
	);
}

export default Checkout;

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
