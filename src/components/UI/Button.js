import cn from "classnames";

const Button = ({ onClick, className, outline, children }) => {
	return (
		<button
			className={cn("button", className, {
				"button--outline": outline,
			})}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
