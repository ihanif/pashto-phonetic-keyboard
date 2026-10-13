#!/bin/bash
#
# Maintainer script: package the V3 keyboard, installer, and README
# into a distributable disk image (DMG).
#
# Usage: ./build_installer_dmg.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VOLUME_NAME="Pashto Phonetic Keyboard v3"
DMG_NAME="PashtoDAOPhoneticKeyboard_v3.dmg"

STAGING="$(mktemp -d -t pashtodao_dmg)"
trap 'rm -rf "$STAGING"' EXIT

[ -d "$SCRIPT_DIR/build" ] || "$SCRIPT_DIR/build_apps.sh"
cp -R "$SCRIPT_DIR/build/Install Pashto Keyboard.app" \
      "$SCRIPT_DIR/build/Uninstall Pashto Keyboard.app" "$STAGING/"
cp "$SCRIPT_DIR/README.md" "$STAGING/"

# Strip Finder metadata so the DMG is clean. Only the quarantine flag is
# removed; other xattrs may hold codesign signatures for the scripts.
find "$STAGING" -name ".DS_Store" -delete
xattr -dr com.apple.quarantine "$STAGING" 2>/dev/null || true

hdiutil create -ov -format UDZO -fs HFS+ \
    -volname "$VOLUME_NAME" \
    -srcfolder "$STAGING" \
    "$SCRIPT_DIR/$DMG_NAME"

echo
echo "Built: $SCRIPT_DIR/$DMG_NAME"
