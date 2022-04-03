import { useState } from "react";
import { addPizzaToCart } from "../Cart/CartSlice";
// classname
import cn from "classnames";
import Button from "../UI/Button";

// Constant
const availableTypes = ["тонкое", "традиционное"];
const availableSizes = [26, 30, 40];

const PizzaBlock = ({ id, name, imageUrl, price, sizes, types, dispatch, addedCount }) => {
	const [activeType, setActiveType] = useState(types[0]);
	const [selectedSize, setSelectedSize] = useState(sizes[0]);

	const onSelectType = (index) => {
		if (index === activeType) return;
		setActiveType(index);
	};

	const onSelectSize = (size) => {
		if (size === selectedSize) return;
		setSelectedSize(size);
	};

	const onAddPizza = () => {
		const object = {
			id,
			name,
			imageUrl,
			price,
			size: selectedSize,
			type: availableTypes[activeType],
		};
		dispatch(addPizzaToCart(object));
	};

	return (
		<div className="pizza-block">
			<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
			<h4 className="pizza-block__title">{name}</h4>
			<div className="pizza-block__selector">
				<ul>
					{availableTypes.map((type, index) => (
						<li
							key={type}
							className={cn(null, {
								active: activeType === index,
								disabled: !types.includes(index),
							})}
							onClick={() => {
								onSelectType(index);
							}}
						>
							{type}
						</li>
					))}
				</ul>
				<ul>
					{availableSizes.map((size, index) => {
						return (
							<li
								key={`${size}_${index}`}
								className={cn(null, {
									active: selectedSize === size,
									disabled: !sizes.includes(size),
								})}
								onClick={() => {
									onSelectSize(size);
								}}
							>
								{size} см.
							</li>
						);
					})}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {price} ₽</div>
				<Button className="button--add" outline onClick={onAddPizza}>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{addedCount && <i>{addedCount}</i>}
				</Button>
			</div>
		</div>
	);
};

export default PizzaBlock;
