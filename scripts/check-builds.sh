#!/bin/bash

# Exit the script if any command fails
set -e

# Build the package
echo "Building & pack"
pnpm run build
pnpm pack

# Get the name of the packed file (assuming there's only one .tgz file)
PACKAGE_FILE=$(ls *.tgz)

# Preact
echo "# Installing for preact"
cd ./frameworks/preact/
pnpm install ../../"$PACKAGE_FILE"
pnpm run build
git checkout -- package.json pnpm-lock.yaml
cd ../../

# React
echo "# Installing for react"
cd ./frameworks/react/
pnpm install ../../"$PACKAGE_FILE"
pnpm run build
git checkout -- package.json pnpm-lock.yaml
cd ../../

# Solid
echo "# Installing for solid"
cd ./frameworks/solid/
pnpm install ../../"$PACKAGE_FILE"
pnpm run build
git checkout -- package.json pnpm-lock.yaml
cd ../../

# Removal
rm "$PACKAGE_FILE"

# Undo git changes to package.json and lock files
