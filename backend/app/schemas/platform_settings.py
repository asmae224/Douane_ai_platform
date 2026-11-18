from datetime import datetime

from pydantic import BaseModel


class PlatformSettingsUpdate(BaseModel):
    name: str
    description: str
    language: str


class PlatformSettingsResponse(BaseModel):
    id: int
    name: str
    description: str
    language: str
    updated_at: datetime

    class Config:
        from_attributes = True