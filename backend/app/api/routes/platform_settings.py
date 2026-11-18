from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_admin
from app.models.user import User
from app.schemas.platform_settings import (
    PlatformSettingsResponse,
    PlatformSettingsUpdate,
)
from app.services.platform_settings_service import (
    PlatformSettingsService,
)


router = APIRouter(
    prefix="/platform-settings",
    tags=["Platform Settings"],
)


@router.get(
    "",
    response_model=PlatformSettingsResponse,
)
def get_platform_settings(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Retourne les paramètres actuels de la plateforme.
    """

    try:
        return PlatformSettingsService.get_settings(db)

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.put(
    "",
    response_model=PlatformSettingsResponse,
)
def update_platform_settings(
    settings_data: PlatformSettingsUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Modifie les paramètres de la plateforme.
    """

    try:
        return PlatformSettingsService.update_settings(
            db,
            settings_data,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )