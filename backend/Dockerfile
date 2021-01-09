FROM rustpython:latest as builder
COPY pyext-suffixtrie pyext
WORKDIR pyext
RUN rustup target add x86_64-unknown-linux-gnu
RUN cargo build --release --target x86_64-unknown-linux-gnu

FROM python:3.7-slim
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt
COPY --from=builder /pyext/target/x86_64-unknown-linux-gnu/release/libsuffixtrie.so /backend/suffixtrie.so
COPY ./api ./api
COPY config.json ./config.json
COPY texts ./texts
COPY partial_canon_tree.sst ./
CMD gunicorn --bind=0.0.0.0:1000 --timeout 600 --pythonpath ./ -- api:app
