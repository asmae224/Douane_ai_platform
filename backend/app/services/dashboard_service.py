from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.user import User
from app.models.document import Document, DocumentStatus


class DashboardService:
    """
    Service responsable des statistiques
    du Dashboard Administrateur.
    """

    @staticmethod
    def get_dashboard_statistics(db: Session) -> dict:
        """
        Retourne les statistiques générales
        de la plateforme pour le Dashboard Admin.
        """

        # ==================================================
        # STATISTIQUES UTILISATEURS
        # ==================================================

        total_users = (
            db.query(func.count(User.id))
            .scalar()
        )

        active_users = (
            db.query(func.count(User.id))
            .filter(User.is_active.is_(True))
            .scalar()
        )

        inactive_users = (
            db.query(func.count(User.id))
            .filter(User.is_active.is_(False))
            .scalar()
        )

        # ==================================================
        # STATISTIQUES DOCUMENTS
        # ==================================================

        total_documents = (
            db.query(func.count(Document.id))
            .scalar()
        )

        uploaded_documents = (
            db.query(func.count(Document.id))
            .filter(
                Document.status == DocumentStatus.UPLOADED
            )
            .scalar()
        )

        indexed_documents = (
            db.query(func.count(Document.id))
            .filter(
                Document.status == DocumentStatus.INDEXED
            )
            .scalar()
        )

        failed_documents = (
            db.query(func.count(Document.id))
            .filter(
                Document.status == DocumentStatus.FAILED
            )
            .scalar()
        )

        # ==================================================
        # RESULTAT
        # ==================================================

        return {
            "users": {
                "total": total_users,
                "active": active_users,
                "inactive": inactive_users,
            },

            "documents": {
                "total": total_documents,
                "uploaded": uploaded_documents,
                "indexed": indexed_documents,
                "failed": failed_documents,
            },
        }