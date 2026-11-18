import { Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                        <FaShieldAlt className="text-white text-xl" />
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">
                            Intelligent Document Management Platform
                        </h1>
                        <p className="text-sm text-gray-500">
                            Administration des Douanes et Impôts Indirects
                        </p>
                    </div>
                </div>

                <Link
                    to="/login"
                    className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                    Sign In
                </Link>
            </div>
        </header>
    );
};

export default Navbar;