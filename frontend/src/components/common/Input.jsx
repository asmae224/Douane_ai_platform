const Input = ({
    label,
    error,
    className = "",
    ...props
}) => {
    return (
        <div className="w-full">

            {label && (
                <label
                    htmlFor={props.name}
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3

                    text-gray-900
                    placeholder:text-gray-400

                    outline-none

                    transition
                    duration-200

                    focus:border-blue-600
                    focus:ring-2
                    focus:ring-blue-100

                    disabled:bg-gray-100
                    disabled:cursor-not-allowed

                    ${className}
                `}
            />

            {error && (
                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Input;