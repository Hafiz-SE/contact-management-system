from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel
from enum import Enum

class Priority(str, Enum):
    high = "High"
    medium = "Medium"
    low = "Low"

class ToDo(BaseModel):
    id: Optional[UUID] = None  # Default value is None
    description: str
    isCompleted: bool
    priority: Priority

    def __init__(self, **data):
        super().__init__(**data)
        if self.id is None:
            self.id = uuid4()
