import { useState, useContext } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import AppContext from "../../../store/AppContext";

function RemarkReply({ r }) {
	const {
		toast: { showToast },
	} = useContext(AppContext);
	const [remark, setRemark] = useState(r.rating.remark.msg);
	const [reply, setReply] = useState(r.rating?.reply?.msg || "");
	const [showReplyField, setShowReplyField] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [newReply, setNewReply] = useState("");

	async function sendReply(e) {
		e.preventDefault();

		if (isLoading) return;

		setIsLoading(true);

		try {
			const response = await axios.post(
				`/api/review/${r._id}/reply-review`,
				{ msg: newReply }
			);

			// console.log(productId);

			if (response.data.ok) {
				console.log(response.data);
				setReply(newReply);
				setNewReply("");
				setIsLoading(false);
				setShowReplyField(false);
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
		<>
			<div className="chat chat-start">
				<div className="chat-bubble chat-bubble-primary">
					{remark}
					{!reply && (
						<button
							onClick={() => setShowReplyField(!showReplyField)}
							className="btn btn-xs ml-2"
						>
							{showReplyField ? (
								<svg
									className="h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line
										x1={18}
										y1={6}
										x2={6}
										y2={18}
									/>
									<line
										x1={6}
										y1={6}
										x2={18}
										y2={18}
									/>
								</svg>
							) : (
								<svg
									className="h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
									<path d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z" />
								</svg>
							)}
						</button>
					)}
					<p className="text-xs text-right">
						{DateTime.fromISO(
							r.rating.remark.created_at
						).toRelative()}
					</p>
				</div>
			</div>
			{showReplyField && (
				<form
					onSubmit={sendReply}
					action="/reply"
				>
					<input
						type="text"
						name="reply"
						id="reply"
						className="input input-bordered w-full max-w-xs"
						value={newReply}
						onChange={(e) => setNewReply(e.target.value)}
					/>
					<button className="btn btn-primary">Done</button>
				</form>
			)}
			{reply && (
				<div className="chat chat-end">
					<div className="chat-bubble chat-bubble-secondary">
						{reply}
						<p className="text-xs text-right">
							{DateTime.fromISO(
								r.rating.reply.created_at
							).toRelative()}
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default RemarkReply;
