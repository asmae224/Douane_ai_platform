from sqlalchemy.orm import Session

from app.models.platform_settings import PlatformSettings
from app.api.routes.platform_settings import PlatformSettingsUpdate


class PlatformSettingsService:
    """
    Service responsable de la gestion
    des paramètres de la plateforme.
    """

    @staticmethod
    def get_settings(db: Session) -> PlatformSettings:
        """
        Retourne les paramètres actuels de la plateforme.
        """

        settings = (
            db.query(PlatformSettings)
            .first()
        )

        if not settings:
            raise ValueError(
                "Les paramètres de la plateforme sont introuvables."
            )

        return settings

    @staticmethod
    def update_settings(
        db: Session,
        settings_data: PlatformSettingsUpdate,
    ) -> PlatformSettings:
        """
        Met à jour les paramètres de la plateforme.
        """

        settings = (
            PlatformSettingsService.get_settings(db)
        )

        update_data = settings_data.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():
            setattr(settings, field, value)

        db.commit()
        db.refresh(settings)

        return settings