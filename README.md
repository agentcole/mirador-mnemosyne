# Documentation Mnemosyne

## Libs

### Custom Mirador version for video annotations 
[https://dzkimgs.l.u-tokyo.ac.jp/videos/m3/video_inapage.html]

### Mirador Annotations: Custom modification for video annotations
based on [https://github.com/ProjectMirador/mirador-annotations]

### Ada Tools
Custom tools for AdA

### Mirador Image Tools
[https://github.com/ProjectMirador/mirador-image-tools]


## Build

### Install dependencies for each folder
```sh
cd ada-tools
npm install
npm run build
cd ../mirador-image-tools
npm install
npm run build
cd ../mirador
npm install
npm run build
cd ../mirador-integration-master
npm install
npm run build
cd ../mirador-integration-master
npm install
npm run webpack
```

Webpack: 
```sh
cd mirador-integration-master
npm run webpack # minified build is in webpack/ folder
```

If you want to build each library separately run
```sh
npm run build
```
in each directory.

If you run into an error try to use legacy support for your node version:


### Windows
- CMD
set NODE_OPTIONS=--openssl-legacy-provider
- Powershell
'$env:NODE_OPTIONS = "--openssl-legacy-provider"'

### Linux/Mac
export NODE_OPTIONS=--openssl-legacy-provider


## Modes
### Load collection
#mode=collection&id=84248591-afd4-4014-8b18-6089d34d6b12

### Load manifests directly
#mode=manifest&manifests=https://digitalartarchive.at/iiif/p/v3/manifest/gssg/Aa_025,https://digitalartarchive.at/iiif/p/v3/manifest/gssg/Aa_025