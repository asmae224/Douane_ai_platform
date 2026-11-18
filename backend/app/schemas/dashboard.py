from pydantic import BaseModel


class UserStatistics(BaseModel):
    total: int
    active: int
    inactive: int


class DocumentStatistics(BaseModel):
    total: int
    uploaded: int
    indexed: int
    failed: int


class DashboardStatistics(BaseModel):
    users: UserStatistics
    documents: DocumentStatistics