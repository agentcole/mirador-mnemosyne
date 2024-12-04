# Mnemosyne Mirador Viewer for Donau Universität Krems

## Introduction
The Custom Mirador Viewer "Mnemosyne", developed for the Donau Universität Krems, is a robust tool designed for complex data analysis with a focus on visual analysis. This project aims to replace the existing Lightbox viewer with the Mirador viewer, which adheres to the standards of the International Image Interoperability Framework (IIIF) [IIIF](https://iiif.io). This transition ensures that the analytical features available in the previous system are maintained and enhanced in the new Mirador environment. The web design has been updated to align with the ADA’s visual identity, providing a seamless user experience.

## Features

### Existing Functionality
- **Panel Management:** Side-by-side display of windows/panels with stacking and overlapping capabilities, and scalability.
- **Metadata Display:** Basic information and metadata about the artwork, along with assigned keywords, are displayed.
- **Workspace Management:** Import/export and editing of workspaces.
- **Image Shopping Cart:** Allows users to manage selected images similar to a shopping cart system.

### New Features
- **Layered Image Display:** Supports the layering of multiple images with controls for opacity, overlay, and blending.
- **Screen Recording Tools:** Includes screen recordings, screenshots, exports, and downloads utilizing Web APIs.
- **Interactive Marking Tools:** Features for coloring marked areas and displaying brightness values (histogram).
- **Video Annotations:** Facilitates color and brightness sampling directly from images.

### Design and Integration
- **Web Design:** The interface has been redesigned to match ADA's new aesthetic, ensuring responsiveness and consistency across devices.
- **Database Integration:** Connected to the ADA (Archive of Digital Art) GSSG (Graphische Sammlung Stift Göttweig) databases for enhanced data access and management.

## Installation

### Node Version Management with NVM
It's important to use Node.js version 16 for compatibility with all project dependencies. We recommend using `nvm` (Node Version Manager) to easily switch between Node versions. Follow these steps to install `nvm` and use Node 16:

1. **Install NVM (Linux/MacOS):** [https://github.com/nvm-sh/nvm]
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# or install with homebrew (MacOS only)
brew install nvm
```
2. **Install NVM (Windows):** [https://github.com/coreybutler/nvm-windows#readme]
3. **Load NVM:**
```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```
4. **Install and use Node.js version 16:**
```bash
nvm install 16
nvm use 16
```

### Project Setup
```bash
# Clone the repository
git clone https://github.com/zbw-krems/mirador-mnemosyne

# Navigate to the project directory
cd mirador-mnemosyne

# Navigate to custom mirador and install dependencies
cd mirador/
npm install

# Build mirador 
npm run build
npm run build:es

# Install ada tools
cd ../ada-tools/
npm install
npm run build

# Install image tools
cd ../mirador-image-tools
npm install
npm run build

# Install mirador annotations and use as build
cd ../mirador-annotations-0.5.0/
npm install --legacy-peer-deps
npm run build 

```

### Docker Build
```sh
# setup build with versioned DEPLOYMENT folder, terminate with slash!
# API_URL and MANIFEST_URL is optional, only relevant for index.html
docker compose build \
    --build-arg=DEPLOYMENT=/dist/mirador-`git log --format='%H' -1`/ \
    --build-arg=API_URL="https://myapi.com" \
    --build-arg=MANIFEST_URL="https://example.com/iiif/object/"

# use docker compose to extract files to ./dist
docker compose up
```


## Usage

### Load collection
#mode=collection&id=84248591-afd4-4014-8b18-6089d34d6b12

### Load manifests directly
#mode=manifest&manifests=https://digitalartarchive.at/iiif/p/v3/manifest/gssg/Aa_025,https://digitalartarchive.at/iiif/p/v3/manifest/gssg/Aa_025

## External libraries & plugins in use

- **Custom Mirador version for video annotations:** [https://dzkimgs.l.u-tokyo.ac.jp/videos/m3/video_inapage.html]
- **Mirador Image Tools:** [https://github.com/ProjectMirador/mirador-image-tools]
- **Mirador Annotations:** Custom modification for video annotations based on [https://github.com/ProjectMirador/mirador-annotations]
- **Mirador Integrations:** Integrating Mirador 3 with modern frontend build systems [https://github.com/ProjectMirador/mirador-integration]
- **Ada Tools:** Custom tools for ADA to load and save workspaces, as well as screenrecordings


# Contributing

Contributions to the Mnemosyne Mirador Viewer are welcome! If you have suggestions or issues, please open an issue in this repository. For direct contributions, please fork the repository and use a new branch for your submissions.

# License

This project is licensed under the MIT License.

# Acknowledgements

This tool was developed with the support of the Donau Universität Krems and ADA, adhering to IIIF standards to ensure a comprehensive and functional viewer that meets academic and research needs.
