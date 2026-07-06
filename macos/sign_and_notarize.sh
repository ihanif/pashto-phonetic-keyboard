#!/bin/bash
#
# Maintainer script: sign, notarize, and staple the keyboard DMG.
#
# One-time setup (interactive, do these before first run):
#   1. Create a "Developer ID Application" certificate:
#      Xcode > Settings > Accounts > select your team >
#      Manage Certificates… > + > Developer ID Application
#   2. Store notarization credentials (needs an app-specific password
#      from https://account.apple.com and your team ID from
#      https://developer.apple.com/account):
#      xcrun notarytool store-credentials notary \
#          --apple-id you@example.com --team-id TEAMID
#
# Usage: ./sign_and_notarize.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUNDLE="$SCRIPT_DIR/PashtoDAOPhoneticKeyboard.bundle"
DMG="$SCRIPT_DIR/PashtoDAOPhoneticKeyboard_v3.dmg"
NOTARY_PROFILE="notary"

IDENTITY="$(security find-identity -v -p codesigning \
    | grep -o '"Developer ID Application: [^"]*"' | head -1 | tr -d '"')"

if [ -z "$IDENTITY" ]; then
    echo "ERROR: No 'Developer ID Application' certificate found in the keychain."
    echo "Create one first (see the setup notes at the top of this script)."
    exit 1
fi
echo "Signing with: $IDENTITY"

# 1. Sign the keyboard bundle and the installer scripts.
codesign --force --timestamp --sign "$IDENTITY" "$BUNDLE"
codesign --force --timestamp --sign "$IDENTITY" \
    "$SCRIPT_DIR/Install Pashto Keyboard.command" \
    "$SCRIPT_DIR/Uninstall Pashto Keyboard.command"
codesign --verify --strict "$BUNDLE"
echo "Bundle signed."

# 2. Rebuild the DMG so it contains the signed files, then sign it.
"$SCRIPT_DIR/build_installer_dmg.sh"
codesign --force --timestamp --sign "$IDENTITY" "$DMG"
echo "DMG signed."

# 3. Notarize and wait for Apple's verdict (usually 1-5 minutes).
echo "Submitting to Apple for notarization…"
xcrun notarytool submit "$DMG" --keychain-profile "$NOTARY_PROFILE" --wait

# 4. Staple the notarization ticket so the DMG verifies offline.
xcrun stapler staple "$DMG"

# 5. Final check: this is what Gatekeeper will run on the user's Mac.
spctl -a -t open --context context:primary-signature -v "$DMG"
echo
echo "Done. Distributable, notarized DMG: $DMG"
