from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel
from enum import Enum

class Priority(str, Enum):
    high = "High"
    medium = "Medium"
    low = "Low"

class ToDo(BaseModel):
    id: Optional[UUID] = uuid4()
    description: str
    isCompleted: bool
    priority: Priority
    