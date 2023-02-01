import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AppContext from "../../../store/AppContext";
import AdminWrapper from "../../../components/layout/admin/layout/adminWrapper";

function OrderDetails() {
	const router = useRouter();
	const orderId = router.query.orderId;
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});
	const [customer, setCustomer] = useState({});
	const {
		toast: { showToast },
	} = useContext(AppContext);

	useEffect(() => {
		async function loadData() {
			if (!orderId) return;
			try {
				const response = await axios(`/api/order/get/${orderId}`);

				// console.log(productId);

				if (response.data.ok) {
					console.log(response.data);
					setData(response.data.order);
					setCustomer(response.data.customer);
					setIsLoading(false);
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
			}
		}

		loadData();
	}, []);

	return (
		<AdminWrapper>
			<h2 className="text-4xl">Order Details</h2>
			<div className="space-y-4">
				{isLoading ? (
					<p className="bg-primary mx-auto max-w-[100px] p-1 rounded-full animate-ping">
						Loading...
					</p>
				) : (
					<>
						<p>
							User:{" "}
							<span className="font-bold">
								{customer.firstname} {customer.lastname}
							</span>
						</p>
						<p>
							Date:{" "}
							<span className="font-bold">10/12/2023 4:00pm</span>
						</p>
						<div>
							<h3>Products</h3>
							<ul className="list-disc list-inside">
								{data &&
									data.products &&
									data.products.length > 0 &&
									data.products.map((p) => (
										<li key={p._id}>
											{p.name}({p.price}) x{p.quantity} -
											&#8358;
											{Intl.NumberFormat("en-US").format(
												p.price * p.quantity
											)}
										</li>
									))}
							</ul>
							<p>
								Total:{" "}
								<span className="font-bold">
									&#8358;
									{Intl.NumberFormat("en-US").format(
										data.totalPrice
									)}
								</span>
							</p>
						</div>
						<div className="divider">Information</div>
						<p>
							Method of payment:{" "}
							<span className="font-bold">
								{data.method_of_payment === "pay-now"
									? "Paid with gateway"
									: "Pay on delivery"}
							</span>
						</p>
						<p>
							Method of Delivery:{" "}
							<span className="font-bold">
								{data.method_of_delivery === "home"
									? "Home delivery"
									: data.method_of_delivery === "pickup"
									? "Shop Pickup"
									: "Reservation"}
							</span>
						</p>
						<p>
							Address:{" "}
							<span className="font-bold">{data.address}</span>
						</p>
						<div className="divider">Update Order Status</div>
						<form action="/order-status">
							<div className="form-control w-full max-w-xs">
								<label className="label">Status</label>
								<select className="select select-bordered">
									<option
										disabled
										selected
									>
										Pick one
									</option>
									<option>Star Wars</option>
									<option>Harry Potter</option>
									<option>Lord of the Rings</option>
									<option>Planet of the Apes</option>
									<option>Star Trek</option>
								</select>
							</div>
							<button className="btn btn-primary mt-4">
								Update
							</button>
						</form>
					</>
				)}
			</div>
		</AdminWrapper>
	);
}

export default OrderDetails;
