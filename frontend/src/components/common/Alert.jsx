import {
    FiCheckCircle,
    FiAlertCircle,
    FiInfo,
    FiAlertTriangle,
    FiX,
} from "react-icons/fi";

const Alert = ({
    type = "success",
    message,
    onClose,
}) => {

    const variants = {

        success: {
            icon: <FiCheckCircle size={20} />,
            className:
                "bg-green-50 border-green-300 text-green-700",
        },

        error: {
            icon: <FiAlertCircle size={20} />,
            className:
                "bg-red-50 border-red-300 text-red-700",
        },

        warning: {
            icon: <FiAlertTriangle size={20} />,
            className:
                "bg-yellow-50 border-yellow-300 text-yellow-700",
        },

        info: {
            icon: <FiInfo size={20} />,
            className:
                "bg-blue-50 border-blue-300 text-blue-700",
        },

    };

    return (

        <div
            className={`
                flex
                items-center
                justify-between

                px-5
                py-4

                rounded-xl

                border

                ${variants[type].className}
            `}
        >

            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >

                {variants[type].icon}

                <span
                    className="
                        font-medium
                    "
                >

                    {message}

                </span>

            </div>

            {

                onClose && (

                    <button
                        onClick={onClose}
                        className="
                            hover:opacity-70
                        "
                    >

                        <FiX size={18} />

                    </button>

                )

            }

        </div>

    );

};

export default Alert;