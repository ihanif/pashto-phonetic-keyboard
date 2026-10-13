#!/bin/bash
# Maintainer script: compile the installer and uninstaller apps into ./build
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
rm -rf build && mkdir build
osacompile -o "build/Install Pashto Keyboard.app" installer.applescript
osacompile -o "build/Uninstall Pashto Keyboard.app" uninstaller.applescript
cp -R PashtoDAOPhoneticKeyboard.bundle "build/Install Pashto Keyboard.app/Contents/Resources/"
echo "Built apps in $(pwd)/build"
