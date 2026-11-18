import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";

import ProtectedRoute from "./router/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

/* ================= PUBLIC ================= */

import Login from "./pages/public/Login";

/* ================= AUTH ================= */

import ActivateAccount from "./pages/auth/ActivateAccount";
import SetPassword from "./pages/auth/SetPassword";
import ActivationSuccess from "./pages/auth/ActivationSuccess";

/* ================= ADMIN ================= */

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Documents from "./pages/admin/Documents";
import Agents from "./pages/admin/Agents";
import Logs from "./pages/admin/Logs";
import Settings from "./pages/admin/Settings";

/* ================= USER ================= */

import Library from "./pages/user/Library";
import RagAgent from "./pages/user/RagAgent";
import History from "./pages/user/History";

/* ================= COMMON ================= */

import Profile from "./pages/Profile";

function App() {

    return (

        <AuthProvider>

            <BrowserRouter>

                <Routes>

                    {/* ================= PUBLIC ================= */}

                    <Route 
                       path="/" 
                            element={<Login />} 
                             />

                         <Route 
                           path="/login" 
                          element={<Login />} 
                         />

                    <Route
                        path="/activate/:token"
                        element={<ActivateAccount />}
                    />

                    <Route
                        path="/set-password/:token"
                        element={<SetPassword />}
                    />

                    <Route
                        path="/activation-success"
                        element={<ActivationSuccess />}
                    />

                    {/* ================= ADMIN ================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN"]}
                            >
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/admin"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/admin/users"
                            element={<Users />}
                        />

                        <Route
                            path="/admin/documents"
                            element={<Documents />}
                        />

                        <Route
                            path="/admin/agents"
                            element={<Agents />}
                        />

                        <Route
                            path="/admin/logs"
                            element={<Logs />}
                        />
                        <Route
    path="/settings"
    element={<Settings />}
/>

                    </Route>

                    {/* ================= USER ================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={["USER"]}
                            >
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/library"
                            element={<Library />}
                        />

                        <Route
                            path="/rag"
                            element={<RagAgent />}
                        />

                        <Route
                            path="/history"
                            element={<History />}
                        />

                    </Route>

                    {/* ================= PROFILE ================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRoles={[
                                    "ADMIN",
                                    "USER",
                                ]}
                            >
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                    </Route>

                    {/* ================= 404 ================= */}

                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />

                </Routes>

            </BrowserRouter>

        </AuthProvider>

    );

}

export default App;