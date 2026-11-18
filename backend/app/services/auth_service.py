from datetime import datetime

from jose import JWTError
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse


class AuthService:
    """
    Service responsable de l'authentification.
    """

    @staticmethod
    def login(
        db: Session,
        credentials: LoginRequest,
    ) -> TokenResponse:

        user = (
            db.query(User)
            .filter(User.email == credentials.email)
            .first()
        )

        if not user:
            raise ValueError(
                "Email ou mot de passe incorrect."
            )

        if not verify_password(
            credentials.password,
            user.password_hash,
        ):
            raise ValueError(
                "Email ou mot de passe incorrect."
            )

        if not user.is_active:
            raise ValueError(
                "Votre compte n'est pas encore activé."
            )

        access_token = create_access_token(
            data={
                "sub": user.email,
                "user_id": user.id,
                "role": user.role.value,
            }
        )

        return TokenResponse(
            access_token=access_token
        )

    @staticmethod
    def activate_account(
        db: Session,
        token: str,
    ) -> User:

        user = (
            db.query(User)
            .filter(User.activation_token == token)
            .first()
        )

        if not user:
            raise ValueError(
                "Lien d'activation invalide."
            )

        if user.activation_expires is None:
            raise ValueError(
                "Lien d'activation invalide."
            )

        if user.activation_expires < datetime.utcnow():
            raise ValueError(
                "Le lien d'activation a expiré."
            )

        return user

    @staticmethod
    def set_password(
        db: Session,
        token: str,
        new_password: str,
    ) -> User:

        user = (
            db.query(User)
            .filter(User.activation_token == token)
            .first()
        )

        if not user:
            raise ValueError(
                "Lien d'activation invalide."
            )

        if user.activation_expires is None:
            raise ValueError(
                "Lien d'activation invalide."
            )

        if user.activation_expires < datetime.utcnow():
            raise ValueError(
                "Le lien d'activation a expiré."
            )

        user.password_hash = hash_password(
            new_password
        )

        user.is_active = True
        user.activation_token = None
        user.activation_expires = None

        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def get_current_user(
        db: Session,
        token: str,
    ) -> User:

        try:
            payload = decode_access_token(token)
        except JWTError:
            raise ValueError(
                "Token invalide."
            )

        email = payload.get("sub")

        if not email:
            raise ValueError(
                "Token invalide."
            )

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if not user:
            raise ValueError(
                "Utilisateur introuvable."
            )

        return user