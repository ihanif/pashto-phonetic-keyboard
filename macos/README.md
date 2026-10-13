# Pashto phonetic keyboard by Pashto DAO — version 3

A phonetic Pashto keyboard layout for macOS. Type Pashto using the Latin key
positions you already know (p → پ, t → ت, and so on).

## What's new in version 3

- Automatic right-to-left typing. The keyboard is now packaged as a proper
  macOS bundle registered with the Pashto language ("ps"), so when you select
  it, macOS switches the writing direction to right-to-left by itself.
  Punctuation now lands at the correct end of the sentence with no manual
  fixing.
- One-click installer that needs no administrator password.
- The keyboard icon now appears correctly in the input menu.
- Cleaned-up bundle: removed a duplicate layout file and a stray copy of
  Apple's own Afghan Pashto layout that cluttered the input source list.

## How to install

1. Download and open the disk image (or folder).
2. Double-click **Install Pashto Keyboard.command**.
   - If macOS asks "Are you sure you want to open it?", click *Open*.
3. Follow the steps shown in the window. System Settings opens automatically:
   - Click *Edit…* next to Input Sources, then *+*.
   - Choose *Pashto* in the language list, select
     *Pashto Phonetic By Pashto DAO*, and click *Add*.
4. If the keyboard is not listed, log out of your Mac, log back in, and
   repeat step 3.

Switch between keyboards with the input menu in the menu bar, or with
Control-Space.

## څنګه يې انسټال کړو

۱. ډاونلوډ شوی فایل پرانيزئ.

۲. په **Install Pashto Keyboard.command** باندې دوه ځله کليک وکړئ.
که مېک وپوښتي چې ايا غواړئ پرانيزئ، *Open* کليک کړئ.

۳. سيسټم سېټېنګز به پخپله پرانيستل شي. د Input Sources تر څنګ په *Edit…*
کليک وکړئ، بيا *+*، په لیست کې *Pashto* وټاکئ، *Pashto Phonetic By
Pashto DAO* غوره کړئ او *Add* کليک کړئ.

۴. که کيبورډ په لیست کې نه ښکاري، له سيسټم څخه ووځئ (Log Out) او بيا
ننوځئ، بيا درېيم ګام تکرار کړئ.

## How to uninstall

Double-click **Uninstall Pashto Keyboard.command**, then remove the keyboard
from System Settings > Keyboard > Input Sources > Edit… (select it and click
the minus button).

## Files in this folder

| File | Purpose |
|------|---------|
| `PashtoDAOPhoneticKeyboard.bundle` | The keyboard layout itself |
| `Install Pashto Keyboard.command` | Double-click installer |
| `Uninstall Pashto Keyboard.command` | Double-click uninstaller |
| `build_installer_dmg.sh` | For maintainers: packages this folder into a DMG |

## For maintainers

The keyboard layout was made with [Ukelele](https://software.sil.org/ukelele/).
To edit it, open `PashtoDAOPhoneticKeyboard.bundle/Contents/Resources/Pashto
Phonetic By Pashto DAO.keylayout` in Ukelele. Keep these invariants when
editing:

- The bundle's `Info.plist` must keep `TISIntendedLanguage` set to `ps`.
  That entry is what makes macOS treat the keyboard as right-to-left.
- The `.icns` icon file must have the same base name as the `.keylayout`
  file, or the icon will not show in the input menu.
- If you rename the layout (the `name=` attribute in the keylayout), the
  `KLInfo_<name>` key in `Info.plist` and the entry in
  `Resources/en.lproj/InfoPlist.strings` must be renamed to match.
- Give any new layout a unique negative `id`.

To build a distributable disk image:

```bash
./build_installer_dmg.sh
```
