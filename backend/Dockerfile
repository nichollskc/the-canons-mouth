FROM python:3.7
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt
COPY ./api ./api
CMD gunicorn --bind=localhost:5000 --timeout 600 --pythonpath ./ -- api:app 
