// components/users/UsersTable.jsx
import { useEffect, useState } from "react";
import {FiEdit2, FiTrash2, FiAlertTriangle,} from "react-icons/fi";
import Modal from "../common/Modal";
import UserForm from "./UserForm";
import Button from "../common/Button";
import Input from "../common/Input";
import Table from "../common/Table";
import Badge from "../common/Badge";
import Alert from "../common/Alert";
import userService from "../../services/userService";

const UsersTable = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingForm, setLoadingForm] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formError, setFormError] = useState(null);
    const [notification, setNotification] = useState(null);
    
    // États pour la confirmation de suppression
    const [userToDeactivate, setUserToDeactivate] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const showNotification = (type, message, duration = 5000) => {
        setNotification({ type, message });
        if (duration > 0) {
            setTimeout(() => {
                setNotification(null);
            }, duration);
        }
    };

    const hideNotification = () => {
        setNotification(null);
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getUsers();
            // Filtrer pour n'afficher que les utilisateurs actifs
            const activeUsers = data.filter(user => user.is_active === true);
            setUsers(activeUsers);
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs:", error);
            showNotification("error", "Impossible de charger la liste des utilisateurs.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (formData) => {
        try {
            setLoadingForm(true);
            setFormError(null);
            await userService.createUser(formData);
            await fetchUsers();
            setOpenModal(false);
            showNotification("success", " Utilisateur créé avec succès !");
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 
                               error.response?.data?.message ||
                               "Erreur lors de la création de l'utilisateur.";
            setFormError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoadingForm(false);
        }
    };

    const handleUpdateUser = async (formData) => {
        try {
            setLoadingForm(true);
            setFormError(null);
            await userService.updateUser(editingUser.id, formData);
            await fetchUsers();
            setOpenModal(false);
            setEditingUser(null);
            setIsEditing(false);
            showNotification("success", " Utilisateur modifié avec succès !");
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 
                               error.response?.data?.message ||
                               "Erreur lors de la modification de l'utilisateur.";
            setFormError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoadingForm(false);
        }
    };

    // Ouvre la modale de confirmation
    const openDeactivateConfirmation = (user) => {
        setUserToDeactivate(user);
        setOpenConfirmModal(true);
    };

    // Ferme la modale de confirmation
    const closeDeactivateConfirmation = () => {
        setUserToDeactivate(null);
        setOpenConfirmModal(false);
    };

    // Fonction pour désactiver un utilisateur (soft delete) après confirmation
    const handleDeactivateUser = async () => {
        if (!userToDeactivate) return;
        
        try {
            await userService.updateUser(userToDeactivate.id, { is_active: false });
            await fetchUsers();
            closeDeactivateConfirmation();
            showNotification(
                "success", 
                `L'utilisateur ${userToDeactivate.first_name} ${userToDeactivate.last_name} a été désactivé avec succès.`
            );
        } catch (error) {
            console.error("Erreur lors de la désactivation:", error);
            closeDeactivateConfirmation();
            showNotification("error", " Impossible de désactiver l'utilisateur.");
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsEditing(true);
        setFormError(null);
        setOpenModal(true);
    };

  const filteredUsers = users.filter((user) => {

    if (!search.trim()) return true;

    const keyword = search.trim().toLowerCase();

    const fullName =
        `${user.first_name} ${user.last_name}`.toLowerCase();

    return (
        fullName.includes(keyword) ||
        user.first_name.toLowerCase().includes(keyword) ||
        user.last_name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    );

});

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-slate-600">Chargement des utilisateurs...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Notification globale */}
            {notification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <Alert
                        type={notification.type}
                        message={notification.message}
                        onClose={hideNotification}
                    />
                </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="w-full md:w-96">
                    <Input
                        placeholder="Rechercher par nom ou email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button
                    onClick={() => {
                        setEditingUser(null);
                        setIsEditing(false);
                        setFormError(null);
                        setOpenModal(true);
                    }}
                    className="whitespace-nowrap"
                >
                    + Nouvel utilisateur
                </Button>
            </div>

            {/* Indicateur du nombre d'utilisateurs */}
            <div className="text-sm text-slate-500">
                {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} actif{filteredUsers.length > 1 ? 's' : ''}
            </div>

            {/* Table */}
            <Table>
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Nom complet
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Email
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Rôle
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Statut
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Date de création
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-6 py-12 text-center text-slate-500"
                            >
                                {search ? "Aucun utilisateur ne correspond à votre recherche." : "Aucun utilisateur actif trouvé."}
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {user.first_name} {user.last_name}
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge
                                        color={user.role === "ADMIN" ? "blue" : "gray"}
                                    >
                                        {user.role === "ADMIN" ? "Administrateur" : "Utilisateur"}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge color="green">
                                        Actif
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {new Date(user.created_at).toLocaleDateString("fr-FR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* Modifier */}
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                            title="Modifier"
                                        >
                                            <FiEdit2 size={18} />
                                        </button>

                                        {/* Supprimer (Désactivation) avec confirmation */}
                                        <button
                                            disabled={user.role === "ADMIN"}
                                            onClick={() => openDeactivateConfirmation(user)}
                                            className={`
                                                p-2 rounded-lg transition-all
                                                ${
                                                    user.role === "ADMIN"
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                                                        : "text-red-600 hover:bg-red-50"
                                                }
                                            `}
                                            title={
                                                user.role === "ADMIN"
                                                    ? "Impossible de supprimer un administrateur"
                                                    : "Supprimer"
                                            }
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            {/* Modal Création/Modification */}
            <Modal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setEditingUser(null);
                    setIsEditing(false);
                    setFormError(null);
                }}
                title={isEditing ? "Modifier l'utilisateur" : "Créer un utilisateur"}
            >
                {formError && (
                    <div className="mb-4">
                        <Alert
                            type="error"
                            message={formError}
                            onClose={() => setFormError(null)}
                        />
                    </div>
                )}
                <UserForm
                    initialData={editingUser}
                    onSubmit={isEditing ? handleUpdateUser : handleCreateUser}
                    onCancel={() => {
                        setOpenModal(false);
                        setEditingUser(null);
                        setIsEditing(false);
                        setFormError(null);
                    }}
                    loading={loadingForm}
                />
            </Modal>

            {/* Modal de Confirmation de suppression */}
            <Modal
    isOpen={openConfirmModal}
    onClose={closeDeactivateConfirmation}
    title="Supprimer un utilisateur"
>
    <div className="space-y-6">

        <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">

           <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
    <FiAlertTriangle
        size={24}
        className="text-red-600"
    />
</div>

            <div>

                <p className="font-semibold text-slate-800">
                    Confirmez-vous la suppression de ce compte ?
                </p>

                <p className="mt-2 text-sm text-slate-600">
                    L'utilisateur ne pourra plus accéder à la plateforme jusqu'à sa réactivation.
                </p>

            </div>

        </div>

        <div className="flex justify-end gap-3 border-t pt-5">

            <Button
                variant="secondary"
                onClick={closeDeactivateConfirmation}
            >
                Annuler
            </Button>

            <Button
                onClick={handleDeactivateUser}
                className="bg-red-600 hover:bg-red-700"
            >
                Confirmer la suppression
            </Button>

        </div>

    </div>
</Modal>
        </div>
    );
};

export default UsersTable;