import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import {
    FiHome,
    FiUsers,
    FiFileText,
    FiCpu,
    FiClock,
    FiSettings,
    FiUser,
    FiLogOut,
    FiBookOpen,
    
} from "react-icons/fi";

import useAuth from "../../hooks/useAuth";

import SidebarItem from "./SidebarItem";

const Sidebar = () => {

    const {
        user,
        logout,
    } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    return (

        <aside
            className="
                w-64
                bg-slate-900
                text-white

                flex
                flex-col

                border-r
                border-slate-800
            "
        >

            {/* ================= LOGO ================= */}

           {/* ================= LOGO ================= */}

{/* ================= LOGO DIGIDOUANE ================= */}

<div
    className="
        px-6
        py-6
        border-b
        border-slate-800
    "
>
    <div
        className="
            flex
            items-center
            gap-3
        "
    >

        {/* Symbole DigiDouane */}

        <div
            className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
            "
        >

            {/* Cercle institutionnel */}

            <div
                className="
                    absolute
                    inset-0
                    rounded-full
                    border-2
                    border-blue-400/40
                "
            />

            {/* D */}

            <span
                className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-blue-400
                "
            >
                D
            </span>

        </div>


        {/* Identité */}

        <div>

            <h2
                className="
                    text-lg
                    font-bold
                    tracking-tight
                    text-white
                "
            >
                DigiDouane
            </h2>

            <p
                className="
                    mt-0.5
                    text-xs
                    text-slate-400
                "
            >
                Intelligence documentaire
            </p>

        </div>

    </div>
</div>
            {/* ================= MENU ================= */}

            <div
                className="
                    flex-1
                    overflow-y-auto

                    px-4
                    py-6

                    space-y-2
                "
            >

                {

                    isAdmin ? (

                        <>

                            <SidebarItem
                                to="/admin"
                                icon={<FiHome size={20} />}
                                label="Dashboard"
                            />

                            <SidebarItem
                                to="/admin/users"
                                icon={<FiUsers size={20} />}
                                label="Utilisateurs"
                            />

                            <SidebarItem
                                to="/admin/documents"
                                icon={<FiFileText size={20} />}
                                label="Documents"
                            />

                            

                           

                        </>

                    ) : (

                        <>

                            <SidebarItem
                                to="/library"
                                icon={<FiBookOpen size={20} />}
                                label="Bibliothèque"
                            />

                            <SidebarItem
                                to="/rag"
                                icon={<FiCpu size={20} />}
                                label=" Assistant documentaire"
                            />

                            

                        </>

                    )

                }

            </div>

            {/* ================= BAS SIDEBAR ================= */}

            <div
                className="
                    border-t
                    border-slate-800
                    p-4
                "
            >

               

                <div className="space-y-2">

                    <SidebarItem
                        to="/profile"
                        icon={<FiUser size={20} />}
                        label="Profil"
                    />

                    <button
                        onClick={logout}
                        className="
                            w-full

                            flex
                            items-center
                            gap-3

                            px-4
                            py-3

                            rounded-xl

                            text-red-400

                            hover:bg-slate-800

                            transition-all
                            duration-200
                        "
                    >

                        <FiLogOut size={20} />

                        <span>

                            Déconnexion

                        </span>

                    </button>

                </div>

            </div>

        </aside>

    );

};

export default Sidebar;