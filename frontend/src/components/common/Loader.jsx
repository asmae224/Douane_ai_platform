import { FiLoader } from "react-icons/fi";

const Loader = ({
    message = "Chargement...",
}) => {
    return (
        <div className="flex items-center justify-center gap-3 py-6">
            <FiLoader
                size={20}
                className="animate-spin text-blue-600"
            />

            <span className="text-sm text-gray-500">
                {message}
            </span>
        </div>
    );
};

export default Loader;