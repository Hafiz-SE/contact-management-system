from typing import List
from uuid import UUID, uuid4
from fastapi import FastAPI
from models import Priority, ToDo
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db: List[ToDo] = [
    ToDo(id = uuid4(), 
         description = "Cook Lunch",
         priority = Priority.high,
         isCompleted = False),
    ToDo(id = uuid4(), 
         description = "Workout",
         priority = Priority.medium,
         isCompleted = True)
]

@app.get("/list")
async def fetch_todo():
    return db

@app.post("/register")
async def register_todo(todo: ToDo): 
    for db_todo in db: 
        if (todo.id == db_todo.id):
                print(todo.id)
                print(db_todo.id)
                return {"error": "Todo id exists"}
    db.append(todo)
    return {"id" : todo.id}

@app.delete("/id/{todo_id}")
async def delete_todo(todo_id: UUID):
    for todo in db: 
        if todo_id == todo.id:
            db.remove(todo)
            return  
    return {"error": "Todo not found"}  

@app.put("/edit")
async def update_todo(todo: ToDo):
    for idx, db_todo in enumerate(db): 
        if todo.id == db_todo.id:
            todo.id = db_todo.id
            db[idx] = todo  
    return {"error": "Todo not found"}