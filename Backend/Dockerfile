# 
FROM python:3.9

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./app /code/app

#
WORKDIR /code/app

ARG BACKEND_INTERNAL_PORT=8080
ENV BACKEND_INTERNAL_PORT=$BACKEND_INTERNAL_PORT

EXPOSE ${BACKEND_INTERNAL_PORT}

CMD [ "sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${BACKEND_INTERNAL_PORT}" ]