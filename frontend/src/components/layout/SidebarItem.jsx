import { NavLink } from "react-router-dom";

const SidebarItem = ({
    to,
    icon,
    label,
}) => {

    return (

        <NavLink
            to={to}
            end={to === "/admin"}
            className={({ isActive }) => `

                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-xl

                transition-all
                duration-200

                ${
                    isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                }

            `}
        >

            <span className="text-lg">
                {icon}
            </span>

            <span className="font-medium">
                {label}
            </span>

        </NavLink>

    );

};

export default SidebarItem;