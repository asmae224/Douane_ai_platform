from datetime import datetime, timedelta, timezone
import secrets
import string

from jose import JWTError,jwt
from passlib.context import CryptContext

from app.core.config import settings


# ==========================================================
# PASSWORD HASHING
# ==========================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str) -> str:
    """
    Hash un mot de passe avant son stockage.
    """
    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    """
    Vérifie si le mot de passe fourni correspond au hash.
    """
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# ==========================================================
# JWT
# ==========================================================

def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None
) -> str:
    """
    Génère un JWT.
    """

    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = (
            datetime.now(timezone.utc)
            + timedelta(
                minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


# ==========================================================
# TEMPORARY PASSWORD
# ==========================================================

def generate_temporary_password(
    length: int = 12
) -> str:
    """
    Génère un mot de passe temporaire sécurisé.
    """

    alphabet = (
        string.ascii_letters +
        string.digits +
        "!@#$%&*?"
    )

    while True:

        password = "".join(
            secrets.choice(alphabet)
            for _ in range(length)
        )

        if (
            any(c.islower() for c in password)
            and any(c.isupper() for c in password)
            and any(c.isdigit() for c in password)
            and any(c in "!@#$%&*?" for c in password)
        ):
            return password


# ==========================================================
# ACTIVATION TOKEN
# ==========================================================

def generate_activation_token() -> str:
    """
    Génère un token sécurisé pour l'activation d'un compte.
    """

    return secrets.token_urlsafe(32)
def decode_access_token(token: str) -> dict:
    """
    Décode un JWT et retourne son contenu.
    """

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        return payload

    except JWTError:
        raise JWTError("Token invalide.")