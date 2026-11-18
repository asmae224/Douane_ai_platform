const Button = ({
    children,
    type = "button",
    onClick,
    className = "",
    disabled = false,
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                inline-flex
                items-center
                justify-center

                px-6
                py-3

                rounded-xl

                bg-blue-600
                hover:bg-blue-700

                text-white
                font-medium

                transition
                duration-200

                disabled:bg-gray-400
                disabled:cursor-not-allowed
                disabled:hover:bg-gray-400

                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;