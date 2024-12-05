FROM node:16-alpine

# path relative to web root
# slash must terminate path
ARG DEPLOYMENT=/dist/mirador/

# api URL in demo $DEPLOYMENY/index.html
ARG API_URL=http://localhost:5000

# prefix for manifest url to convert object numbers to manifest
# slash must terminate path!
ARG MANIFEST_URL="https://example.com/iiif/object/"

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

WORKDIR /build/mirador-annotations-0.5.0 
# deploymeny path for 
RUN npm install --no-audit --legacy-peer-deps &&\
    npm exec nwb -- build-react-app \
        --webpack.publicPath="$DEPLOYMENT" \
        --webpack.html.templateParameters.apiURL="$API_URL" \
        --webpack.html.templateParameters.mainifestURL="$MANIFEST_URL" &&\
    echo $DEPLOYMENT > dist/webpath.txt
