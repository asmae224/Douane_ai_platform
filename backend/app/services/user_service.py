from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.core.security import (
    generate_activation_token,
    generate_temporary_password,
    hash_password,
)
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.services.email_service import EmailService


class UserService:
    """
    Service responsable de la gestion des utilisateurs.
    """

    @staticmethod
    def create_user(
        db: Session,
        user_data: UserCreate,
    ) -> User:

        existing_user = (
            db.query(User)
            .filter(User.email == user_data.email)
            .first()
        )

        if existing_user:
            raise ValueError(
                "Un utilisateur avec cette adresse email existe déjà."
            )

        temporary_password = generate_temporary_password()

        user = User(
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            email=user_data.email,
            password_hash=hash_password(temporary_password),
            role=user_data.role,
            is_active=False,
            activation_token=generate_activation_token(),
            activation_expires=datetime.utcnow() + timedelta(hours=24),
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        EmailService.send_activation_email(
            first_name=user.first_name,
            email=user.email,
            temporary_password=temporary_password,
            activation_token=user.activation_token,
        )

        return user

    @staticmethod
    def get_all_users(db: Session) -> list[User]:
        """
        Retourne tous les utilisateurs.
        """
        return (
            db.query(User)
            .order_by(User.created_at.desc())
            .all()
        )

    @staticmethod
    def get_user_by_id(
        db: Session,
        user_id: int,
    ) -> User:

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not user:
            raise ValueError(
                "Utilisateur introuvable."
            )

        return user

    @staticmethod
    def update_user(
        db: Session,
        user_id: int,
        user_data: UserUpdate,
    ) -> User:

        user = UserService.get_user_by_id(
            db,
            user_id,
        )

        if (
            user_data.email
            and user_data.email != user.email
        ):
            existing_user = (
                db.query(User)
                .filter(User.email == user_data.email)
                .first()
            )

            if existing_user:
                raise ValueError(
                    "Cette adresse email est déjà utilisée."
                )

        update_data = user_data.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():
            setattr(user, field, value)

        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def delete_user(
        db: Session,
        user_id: int,
    ) -> User:

        user = UserService.get_user_by_id(
            db,
            user_id,
        )

        user.is_active = False

        db.commit()
        db.refresh(user)

        return user