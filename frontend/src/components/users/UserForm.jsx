// components/users/UserForm.jsx
import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const UserForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    loading = false,
}) => {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: "USER",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                first_name: initialData.first_name || "",
                last_name: initialData.last_name || "",
                email: initialData.email || "",
                role: initialData.role || "USER",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Prénom"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                placeholder=" prénom"
                disabled={loading}
            />

            <Input
                label="Nom"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                placeholder=" nom"
                disabled={loading}
            />

            <Input
                label="Adresse email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder=" l’adresse email"
                disabled={loading}
            />
<div>
    <label className="block mb-2 font-medium text-slate-700">
        Rôle
    </label>

    <div className="space-y-3">

        <label className="flex items-center gap-3">
            <input
                type="radio"
                name="role"
                value="USER"
                checked={form.role === "USER"}
                onChange={handleChange}
                disabled={
                    loading ||
                    (initialData && initialData.role === "ADMIN")
                }
            />
            Utilisateur
        </label>

        <label className="flex items-center gap-3">
            <input
                type="radio"
                name="role"
                value="ADMIN"
                checked={form.role === "ADMIN"}
                onChange={handleChange}
                disabled={
                    loading ||
                    (initialData && initialData.role === "ADMIN")
                }
            />
            Administrateur
        </label>

    </div>

</div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading 
                        ? "En cours..." 
                        : initialData 
                            ? "Enregistrer" 
                            : "Créer l'utilisateur"
                    }
                </Button>
            </div>
        </form>
    );
};

export default UserForm;