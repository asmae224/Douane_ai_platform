from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_admin
from app.models.user import User
from app.schemas.dashboard import DashboardStatistics
from app.services.dashboard_service import DashboardService


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/statistics",
    response_model=DashboardStatistics,
)
def get_dashboard_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    """
    Retourne les statistiques générales du Dashboard Admin.
    """

    return DashboardService.get_dashboard_statistics(db)