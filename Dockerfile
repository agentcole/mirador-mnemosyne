FROM node:16-alpine

# web root
ARG DEPLOYMENT=/dist/mirador

# npm wants to build canvas from souce
RUN apk add --update --no-cache \
    python3 \
    pkgconfig \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

# copy data folders
# check .dockerignore!
WORKDIR /build
COPY ./mirador ./mirador/
COPY ./mirador-image-tools/ ./mirador-image-tools/
COPY ./mirador-annotations-0.5.0/ ./mirador-annotations-0.5.0/
COPY ./ada-tools/ ./ada-tools/
COPY ./mirador-integration-master ./mirador-integration-master/

# build mirador first (es exports are needed)
WORKDIR /build/mirador
RUN npm install --no-audit && npm run build && npm run build:es

# provide LocalStorageAdapter for mirador-intergration and ada-tools
WORKDIR /build/mirador-annotations-0.5.0 
RUN npm install --no-audit --legacy-peer-deps && npm run build

WORKDIR /build/ada-tools
RUN npm install --no-audit && npm run build

WORKDIR /build/mirador-image-tools
RUN npm install --no-audit && npm run build

# build webpack, provide external path
WORKDIR /build/mirador-integration-master
RUN npm install --no-audit && npm exec webpack -- \
    --config webpack/webpack.config.js \
    --env.deployment=$DEPLOYMENT
