import React from 'react'

type ButtonPropsType = {
	name: string
	onClickHandler: () => void
	disabled?: boolean
	classes?: string
}

const Button: React.FC<ButtonPropsType> = props => {
	return (
		<button
			className={props.classes}
			disabled={props.disabled}
			onClick={props.onClickHandler}
		>
			{props.name}
		</button>
	)
}

export default Button
