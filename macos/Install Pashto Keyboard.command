#!/bin/bash
#
# Pashto Phonetic Keyboard by Pashto DAO — installer (v3)
#
# Double-click this file to install. It copies the keyboard bundle into
# your personal Library folder, so no administrator password is needed.

set -u

BUNDLE_NAME="PashtoDAOPhoneticKeyboard.bundle"
LAYOUT_MENU_NAME="Pashto Phonetic By Pashto DAO"
DEST_DIR="$HOME/Library/Keyboard Layouts"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_BUNDLE="$SCRIPT_DIR/$BUNDLE_NAME"

say_both() {
    # English line, then Pashto line
    echo "$1"
    echo "$2"
    echo
}

fail() {
    echo
    echo "ERROR: $1"
    echo "تېروتنه: $2"
    echo
    echo "Press Enter to close.  |  د تړلو لپاره Enter کېکاږئ."
    read -r
    exit 1
}

clear
echo "=============================================================="
echo "  Pashto Phonetic Keyboard by Pashto DAO — Installer (v3)"
echo "  د پښتو DAO فونېټيک کيبورډ انسټالر (درېیم نسخه)"
echo "=============================================================="
echo

[ -d "$SOURCE_BUNDLE" ] || fail \
    "Could not find '$BUNDLE_NAME' next to this installer. Keep both files in the same folder." \
    "د '$BUNDLE_NAME' فولډر ونه موندل شو. دا فایل او انسټالر باید په يوه فولډر کې وي."

# 1. Remove older versions from the user's Library so only v3 remains.
mkdir -p "$DEST_DIR" || fail "Could not create '$DEST_DIR'." "فولډر جوړ نه شو."

for old in \
    "$DEST_DIR/$BUNDLE_NAME" \
    "$DEST_DIR/PashtoDAOPKeyboardV2.keylayout" \
    "$DEST_DIR/PashtoDAOPKeyboard.keylayout" \
    "$DEST_DIR/Pashto Phonetic By Pashto DAO.keylayout" \
    "$DEST_DIR/Pashto Phonetic Keyboar By Pashto DAO.keylayout" \
    "$DEST_DIR/PashtoDAOPKeyboard.icns"
do
    if [ -e "$old" ]; then
        rm -rf "$old"
        say_both "Removed old version: $(basename "$old")" \
                 "زوړ نسخه لرې شوه: $(basename "$old")"
    fi
done

# 2. Copy the new bundle.
cp -R "$SOURCE_BUNDLE" "$DEST_DIR/" || fail \
    "Copying the keyboard failed." \
    "د کيبورډ کاپي کول ناکام شول."

# 3. Clear the quarantine flag Safari adds to downloads, so macOS loads the layout.
xattr -dr com.apple.quarantine "$DEST_DIR/$BUNDLE_NAME" 2>/dev/null

# 4. Warn if an old copy is still installed system-wide (from the v1/v2 installer).
LEFTOVERS=""
for old in \
    "/Library/Keyboard Layouts/PashtoDAOPKeyboard.keylayout" \
    "/Library/Keyboard Layouts/PashtoDAOPKeyboardV2.keylayout" \
    "/Library/Keyboard Layouts/Pashto Phonetic By Pashto DAO.keylayout" \
    "/Library/Keyboard Layouts/PashtoDAOPKeyboard.icns"
do
    [ -e "$old" ] && LEFTOVERS="$LEFTOVERS  $old"$'\n'
done

if [ -n "$LEFTOVERS" ]; then
    echo "NOTE: An older version is still installed for all users:"
    echo "$LEFTOVERS"
    echo "To remove it, your administrator password is needed."
    echo "يادونه: يوه زړه نسخه لا هم په سيسټم کې شته. د لرې کولو لپاره د اډمين پاسورډ ته اړتيا ده."
    echo
    printf "Remove it now? (y/n)  |  اوس يې لرې کړم؟ (y=هو / n=نه): "
    read -r ANSWER
    if [ "$ANSWER" = "y" ] || [ "$ANSWER" = "Y" ]; then
        sudo rm -rf \
            "/Library/Keyboard Layouts/PashtoDAOPKeyboard.keylayout" \
            "/Library/Keyboard Layouts/PashtoDAOPKeyboardV2.keylayout" \
            "/Library/Keyboard Layouts/Pashto Phonetic By Pashto DAO.keylayout" \
            "/Library/Keyboard Layouts/PashtoDAOPKeyboard.icns" \
            && say_both "Old system-wide version removed." "زړه نسخه له سيسټم څخه لرې شوه."
    fi
    echo
fi

say_both "The keyboard was installed successfully." \
         "کيبورډ په برياليتوب سره انسټال شو."

echo "--------------------------------------------------------------"
echo "  NEXT STEPS  |  راتلونکي ګامونه"
echo "--------------------------------------------------------------"
echo
echo "  1. System Settings will now open at the Keyboard page."
echo "     سيسټم سېټېنګز به اوس د کيبورډ پاڼه پرانيزي."
echo
echo "  2. Click 'Edit…' next to Input Sources, then click '+'."
echo "     د Input Sources تر څنګ په 'Edit…' کليک وکړئ، بيا په '+' کليک وکړئ."
echo
echo "  3. Choose 'Pashto' in the language list, select"
echo "     '$LAYOUT_MENU_NAME', and click 'Add'."
echo "     په لیست کې 'Pashto' وټاکئ، بيا '$LAYOUT_MENU_NAME' وټاکئ او 'Add' کليک کړئ."
echo
echo "  4. If the keyboard does not appear in the list, log out of your"
echo "     Mac and log back in, then repeat steps 2 and 3."
echo "     که کيبورډ په لیست کې نه ښکاري، له سيسټم څخه ووځئ (Log Out)"
echo "     او بيا ننوځئ، بيا دويم او درېيم ګامونه تکرار کړئ."
echo
echo "Because this keyboard is registered as Pashto, macOS switches"
echo "typing direction to right-to-left automatically when you select it."
echo "دا کيبورډ د پښتو په توګه ثبت دی، نو کله چې يې وټاکئ، مېک به"
echo "د ليکلو لوری په اتوماتيک ډول ښي-څخه-کيڼ ته واړوي."
echo

# Open the Keyboard settings pane (Ventura+ URL, with a fallback for older macOS).
open "x-apple.systempreferences:com.apple.Keyboard-Settings.extension" 2>/dev/null \
    || open -b com.apple.systempreferences 2>/dev/null

echo "Press Enter to close this window.  |  د تړلو لپاره Enter کېکاږئ."
read -r
exit 0
