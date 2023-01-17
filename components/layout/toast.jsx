import { useContext } from "react";
import AppContext from "../../app/AppContext";

function Toast() {
	const {
		toast: { isShown, type, hideToast },
	} = useContext(AppContext);
	return (
		<>
			{isShown && (
				<div className="toast toast-top">
					<div className="alert alert-success shadow-lg">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Your purchase has been confirmed!</span>
						</div>
						<div className="flex-none">
							<button
								onClick={hideToast}
								className="btn btn-sm btn-circle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512"
									className="fill-white w-4 h-4"
								>
									{/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
									<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Toast;
