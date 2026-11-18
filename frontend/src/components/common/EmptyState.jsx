import { FiInbox } from "react-icons/fi";

const EmptyState = ({
    title = "Aucun élément",
    message = "Aucune donnée disponible.",
}) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-12">

            <div
                className="
                    flex
                    items-center
                    justify-center
                    w-14
                    h-14
                    rounded-2xl
                    bg-gray-100
                    text-gray-400
                    mb-4
                "
            >
                <FiInbox size={26} />
            </div>

            <h3 className="text-base font-semibold text-gray-800">
                {title}
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500">
                {message}
            </p>

        </div>
    );
};

export default EmptyState;