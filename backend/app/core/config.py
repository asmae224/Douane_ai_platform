from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ===========================
    # APPLICATION
    # ===========================
    APP_NAME: str
    DEBUG: bool
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # ===========================
    # DATABASE
    # ===========================
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

    # ===========================
    # MISTRAL AI
    # ===========================
    MISTRAL_API_KEY: str = ""
    MISTRAL_MODEL: str

    # ===========================
    # EMAIL (SMTP)
    # ===========================
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_NAME: str
    SMTP_FROM_EMAIL: str = ""

    # ===========================
    # DATABASE URL
    # ===========================
    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg://"
            f"{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}"
            f"/{self.DB_NAME}"
        )

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()