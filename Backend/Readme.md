#Dev
python3 -m uvicorn main:app --host 0.0.0.0 --port 8080 --reload

#Build
docker build --tag 'hafizz/todo-python-backend' .
docker images 
docker run -d --name todo-backend -p 8080:80 'hafizz/todo-python-backend'
