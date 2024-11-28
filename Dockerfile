FROM node:16-alpine

# web root
ARG DEPLOYMENT=/dist/mirador

# Add before npm install
RUN apk add --no-cache chromium

# Set Puppeteer to use system Chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PHANTOMJS_SKIP_DOWNLOAD=true

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

# build mirador first (es exports are needed)
WORKDIR /build/mirador
RUN npm install --no-audit && npm run build && npm run build:es

WORKDIR /build/ada-tools
RUN npm install --no-audit && npm run build

WORKDIR /build/mirador-image-tools
RUN npm install --no-audit && npm run build

ARG API_URL
ENV API_URL=$API_URL

ARG TITLE
ENV TITLE=$TITLE

WORKDIR /build/mirador-annotations-0.5.0 
RUN npm install --no-audit --legacy-peer-deps && API_URL=$API_URL TITLE=$TITLE npm run build:custom
