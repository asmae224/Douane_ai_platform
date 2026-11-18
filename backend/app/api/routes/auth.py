from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.auth import (
    LoginRequest,
    MessageResponse,
    SetPasswordRequest,
    TokenResponse,
)

from app.schemas.user import UserResponse
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

security = HTTPBearer()


# ==========================================================
# Connexion
# ==========================================================

@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    try:
        return AuthService.login(
            db,
            credentials,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )


# ==========================================================
# Activation du compte
# ==========================================================

@router.get(
    "/activate/{token}",
    response_model=MessageResponse,
)
def activate_account(
    token: str,
    db: Session = Depends(get_db),
):
    try:
        AuthService.activate_account(
            db,
            token,
        )

        return MessageResponse(
            message="Compte activé avec succès."
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


# ==========================================================
# Définition du mot de passe
# ==========================================================

@router.post(
    "/set-password",
    response_model=MessageResponse,
)
def set_password(
    request: SetPasswordRequest,
    db: Session = Depends(get_db),
):
    try:
        AuthService.set_password(
            db,
            request.token,
            request.new_password,
        )

        return MessageResponse(
            message="Mot de passe enregistré avec succès."
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


# ==========================================================
# Utilisateur connecté
# ==========================================================

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    try:

        user = AuthService.get_current_user(
            db,
            credentials.credentials,
        )

        return user

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )