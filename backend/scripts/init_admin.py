from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User, UserRole


ADMIN_EMAIL = "admin@gmail.com"
ADMIN_PASSWORD = "Admin123"


def create_admin():
    db: Session = SessionLocal()

    try:
        existing_admin = (
            db.query(User)
            .filter(User.email == ADMIN_EMAIL)
            .first()
        )

        if existing_admin:
            print("Un administrateur existe déjà.")
            return

        admin = User(
            first_name="System",
            last_name="Administrator",
            email=ADMIN_EMAIL,
            password_hash=hash_password(ADMIN_PASSWORD),
            role=UserRole.ADMIN,
            is_active=True,
            activation_token=None,
            activation_expires=None,
        )

        db.add(admin)
        db.commit()

        print("======================================")
        print(" Administrateur créé avec succès")
        print("======================================")
        print(f"Email    : {ADMIN_EMAIL}")
        print(f"Password : {ADMIN_PASSWORD}")
        print("======================================")

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()