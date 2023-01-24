import { useState, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import AppContext from "../../../store/AppContext";
import AdminWrapper from "../../../components/layout/admin/layout/adminWrapper";
import { withSessionSsr } from "../../../lib/withSession";
import CategoryModel from "../../../models/category";
import FoodModel from "../../../models/food";

function Food({ categoriesData, food }) {
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const categories = categoriesData;
	const [isLoading, setIsLoading] = useState(false);
	const [foodDetails, setFoodDetails] = useState({
		name: "",
		short: "",
		desc: "",
		price: "",
		categories: [],
	});

	// console.log(food);
	function toggleCategory({ id }) {
		if (foodDetails.categories.includes(id)) {
			const newCategories = foodDetails.categories.filter(
				(i) => i !== id
			);
			setFoodDetails({ ...foodDetails, categories: [...newCategories] });
		} else {
			setFoodDetails({
				...foodDetails,
				categories: [...foodDetails.categories, id],
			});
		}
	}

	const [foodList, setFoodList] = useState(food);

	async function addFood(e) {
		e.preventDefault();

		if (isLoading) return;

		setIsLoading(true);
		try {
			const response = await axios.post("/api/product/create", {
				...foodDetails,
			});

			console.log(response);
			if (response.data.ok) {
				// setNewCategory("");
				// const { name, _id } = response.data.category;
				// setCategories([
				// 	{ name, id: _id, numberOfFood: 0 },
				// 	...categories,
				// ]);
				setFoodDetails({
					name: "",
					short: "",
					desc: "",
					price: "",
					categories: [],
				});
				setFoodList([response.data.food, ...foodList]);
				showToast({
					alert_type: "success",
					message: "Food added successfully",
				});
				setIsLoading(false);
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
			// console.log(error);
			setIsLoading(false);
			showToast({
				alert_type: "danger",
				message: errorMsg,
			});
		}
	}
	return (
		<AdminWrapper>
			<form
				onSubmit={addFood}
				action="/admin/categories/add"
				className="bg-slate-700 px-5 py-5 mx-auto rounded-lg"
			>
				<h2 className="mb-4">Add new food item</h2>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Name of food item</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
						name="name"
						value={foodDetails.name}
						onChange={(e) =>
							setFoodDetails({
								...foodDetails,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">
							Price per portion / item (&#8358;)
						</span>
					</label>
					<input
						type="number"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
						name="price"
						value={foodDetails.price}
						onChange={(e) =>
							setFoodDetails({
								...foodDetails,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Short Summary</span>
					</label>
					<input
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full max-w-xs"
						name="short"
						value={foodDetails.short}
						onChange={(e) =>
							setFoodDetails({
								...foodDetails,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<label className="label">
						<span className="label-text-alt">30 char left</span>
					</label>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Description</span>
					</label>
					<textarea
						className="textarea textarea-bordered h-24"
						placeholder="Bio"
						name="desc"
						value={foodDetails.desc}
						onChange={(e) =>
							setFoodDetails({
								...foodDetails,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control flex-row gap-4 my-5 flex-wrap">
					{categories.map((c) => (
						<label
							key={c.id}
							className="flex justify-center gap-2"
							htmlFor={`${c.name}-${c._id}`}
						>
							<span>{c.name}</span>
							<input
								id={`${c.name}-${c._id}`}
								type="checkbox"
								checked={foodDetails.categories.includes(c._id)}
								className="checkbox"
								name="category"
								onChange={() => toggleCategory({ id: c._id })}
							/>
						</label>
					))}
				</div>
				<button
					disabled={isLoading}
					className={`btn btn-primary ${
						isLoading && "btn-disabled animate-pulse"
					}`}
				>
					Add
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-plus"
					>
						<line
							x1={12}
							y1={5}
							x2={12}
							y2={19}
						/>
						<line
							x1={5}
							y1={12}
							x2={19}
							y2={12}
						/>
					</svg>
				</button>
			</form>
			<div className="overflow-x-auto">
				<table className="table w-full">
					{/* <!-- head --> */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Number of Items</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{foodList.map((item, i) => (
							<tr key={item._id}>
								<th>{i + 1}</th>
								<td>{item.name}</td>
								<td>
									<span className="badge badge-primary">
										{item.number_of_item}
									</span>
								</td>
								<td>
									<Link href={`/admin/food/${item._id}`}>
										<button className="btn btn-sm btn-primary">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												// width={24}
												// height={24}
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
												className="feather feather-eye w-4 h-4"
											>
												<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
												<circle
													cx={12}
													cy={12}
													r={3}
												/>
											</svg>
										</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</AdminWrapper>
	);
}

export default Food;

export const getServerSideProps = withSessionSsr(handler);

async function handler({ req }) {
	const user = req.session.user;

	if (!user || user.type !== "admin") {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const categories = await CategoryModel.find({});
	const food = await FoodModel.find({});
	// console.log(food);

	return {
		props: {
			food: JSON.parse(JSON.stringify(food)),
			categoriesData: JSON.parse(JSON.stringify(categories)),
		},
	};
}
