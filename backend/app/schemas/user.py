from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr

from app.models.user import UserRole


# ==========================================================
# Création d'un utilisateur
# ==========================================================

class UserCreate(BaseModel):
    """
    Données envoyées par l'administrateur
    lors de la création d'un utilisateur.
    """

    first_name: str
    last_name: str
    email: EmailStr
    role: UserRole = UserRole.USER


# ==========================================================
# Modification d'un utilisateur
# ==========================================================

class UserUpdate(BaseModel):
    """
    Données pouvant être modifiées
    par l'administrateur.
    """

    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    role: UserRole | None = None
    is_active: bool | None = None


# ==========================================================
# Réponse d'un utilisateur
# ==========================================================

class UserResponse(BaseModel):
    """
    Informations renvoyées au frontend.
    """

    id: int
    first_name: str
    last_name: str
    email: EmailStr
    role: UserRole
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================================
# Liste des utilisateurs
# ==========================================================

class UserListResponse(BaseModel):
    """
    Liste des utilisateurs.
    """

    users: list[UserResponse]