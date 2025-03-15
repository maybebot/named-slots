#!/bin/bash

# Exit the script if any command fails
set -e

# Build the package
echo "Building & pack"
npm run build
npm pack

# Get the name of the packed file (assuming there's only one .tgz file)
PACKAGE_FILE=$(ls *.tgz)

# Preact
echo "# Installing for preact"
cd ./frameworks/preact/
npm install ../../"$PACKAGE_FILE"
npm run build
git checkout -- package.json package-lock.json
cd ../../

# React
echo "# Installing for react"
cd ./frameworks/react/
npm install ../../"$PACKAGE_FILE"
npm run build
git checkout -- package.json package-lock.json
cd ../../

# Solid
echo "# Installing for solid"
cd ./frameworks/solid/
npm install ../../"$PACKAGE_FILE"
npm run build
git checkout -- package.json package-lock.json
cd ../../

# Removal
rm "$PACKAGE_FILE"

# Undo git changes to package.json and lock files
