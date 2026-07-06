#!/bin/bash
#
# Pashto Phonetic Keyboard by Pashto DAO — uninstaller
#
# Double-click to remove the keyboard from your Mac.

set -u

BUNDLE_NAME="PashtoDAOPhoneticKeyboard.bundle"

clear
echo "=============================================================="
echo "  Pashto Phonetic Keyboard — Uninstaller"
echo "  د پښتو فونېټيک کيبورډ لرې کوونکی"
echo "=============================================================="
echo

REMOVED=0

USER_COPY="$HOME/Library/Keyboard Layouts/$BUNDLE_NAME"
if [ -e "$USER_COPY" ]; then
    rm -rf "$USER_COPY"
    echo "Removed: $USER_COPY"
    echo "لرې شو: $USER_COPY"
    REMOVED=1
fi

SYSTEM_COPY="/Library/Keyboard Layouts/$BUNDLE_NAME"
if [ -e "$SYSTEM_COPY" ]; then
    echo "A system-wide copy exists. Your administrator password is needed to remove it."
    echo "يوه سيسټمي کاپي شته. د لرې کولو لپاره د اډمين پاسورډ ته اړتيا ده."
    sudo rm -rf "$SYSTEM_COPY" && { echo "Removed: $SYSTEM_COPY"; REMOVED=1; }
fi

echo
if [ "$REMOVED" -eq 1 ]; then
    echo "Done. Also remove the keyboard from:"
    echo "System Settings > Keyboard > Input Sources > Edit… (select it, click '−')"
    echo "بشپړ شو. کيبورډ له دې ځايه هم لرې کړئ:"
    echo "System Settings > Keyboard > Input Sources > Edit…"
else
    echo "The keyboard was not found. Nothing to remove."
    echo "کيبورډ ونه موندل شو. د لرې کولو لپاره هېڅ نشته."
fi

echo
echo "Press Enter to close.  |  د تړلو لپاره Enter کېکاږئ."
read -r
exit 0
