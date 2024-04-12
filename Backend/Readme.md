# Dev
`python3 -m uvicorn main:app --host 0.0.0.0 --port 8080 --reload`

# Build
```docker build --tag 'hafizz/todo-python-backend' .```

```docker images``` //check if image is built 

```docker run -d --name todo-backend -p 8080:80 'hafizz/todo-python-backend'``` // run using daemon mode. If you face any problem try without daemon mode.

```docker ps``` // Check if running properly.
