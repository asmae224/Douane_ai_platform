from pydantic import BaseModel, ConfigDict, EmailStr


# ==========================================================
# Connexion
# ==========================================================

class LoginRequest(BaseModel):
    """
    Données envoyées lors de la connexion.
    """

    email: EmailStr
    password: str


# ==========================================================
# Réponse JWT
# ==========================================================

class TokenResponse(BaseModel):
    """
    Réponse retournée après une authentification réussie.
    """

    access_token: str
    token_type: str = "bearer"


# ==========================================================
# Utilisateur connecté
# ==========================================================

class CurrentUserResponse(BaseModel):
    """
    Informations de l'utilisateur connecté.
    """

    id: int
    first_name: str
    last_name: str
    email: EmailStr
    role: str

    model_config = ConfigDict(
        from_attributes=True
    )


# ==========================================================
# Activation du compte
# ==========================================================

class ActivateAccountRequest(BaseModel):
    """
    Données envoyées lors de l'activation du compte.
    """

    token: str


# ==========================================================
# Définition du mot de passe
# ==========================================================

class SetPasswordRequest(BaseModel):
    """
    L'utilisateur choisit son mot de passe définitif.
    """

    token: str
    new_password: str


# ==========================================================
# Réponse générique
# ==========================================================

class MessageResponse(BaseModel):
    """
    Message simple retourné par l'API.
    """

    message: str