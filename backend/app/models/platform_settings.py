
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.core.database import Base


class PlatformSettings(Base):
    __tablename__ = "platform_settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(100),
        nullable=False,
        default="PRJ_MCP",
    )

    description = Column(
        Text,
        nullable=False,
        default="Plateforme intelligente de gestion documentaire",
    )

    language = Column(
        String(10),
        nullable=False,
        default="fr",
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

