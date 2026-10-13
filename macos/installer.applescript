-- Pashto Phonetic Keyboard by Pashto DAO: installer (compiled into an app by build_apps.sh)

set bundleName to "PashtoDAOPhoneticKeyboard.bundle"
set src to POSIX path of (path to resource bundleName)
if src ends with "/" then set src to text 1 thru -2 of src
set destDir to (POSIX path of (path to home folder)) & "Library/Keyboard Layouts"
set userOld to {bundleName, "PashtoDAOPKeyboardV2.keylayout", "PashtoDAOPKeyboard.keylayout", "Pashto Phonetic By Pashto DAO.keylayout", "Pashto Phonetic Keyboar By Pashto DAO.keylayout", "PashtoDAOPKeyboard.icns"}
set sysDir to "/Library/Keyboard Layouts/"
set sysOld to {"PashtoDAOPKeyboard.keylayout", "PashtoDAOPKeyboardV2.keylayout", "Pashto Phonetic By Pashto DAO.keylayout", "PashtoDAOPKeyboard.icns", bundleName}

display dialog "This installs the Pashto Phonetic Keyboard by Pashto DAO and removes any older version." & return & return & "دا به د پښتو DAO فونېټيک کيبورډ انسټال کړي او زوړ نسخې به لرې کړي." buttons {"Cancel", "Install"} default button "Install" with title "Pashto Phonetic Keyboard"

try
	-- 1. Remove older versions from the user's Library, then copy the new bundle.
	set cmd to "mkdir -p " & quoted form of destDir
	repeat with n in userOld
		set cmd to cmd & " && rm -rf " & quoted form of (destDir & "/" & n)
	end repeat
	set cmd to cmd & " && cp -R " & quoted form of src & " " & quoted form of destDir & "/"
	set cmd to cmd & " && xattr -dr com.apple.quarantine " & quoted form of (destDir & "/" & bundleName) & " 2>/dev/null; true"
	do shell script cmd

	-- 2. Older system-wide copies (v1/v2 installers) need an administrator password.
	set found to {}
	repeat with n in sysOld
		try
			do shell script "test -e " & quoted form of (sysDir & n)
			set end of found to quoted form of (sysDir & n)
		end try
	end repeat
	if (count of found) > 0 then
		set AppleScript's text item delimiters to " "
		set rmList to found as text
		set AppleScript's text item delimiters to ""
		display dialog "An older version is also installed for all users. Remove it? (needs your Mac password)" & return & return & "يوه زړه نسخه د ټولو کارونکو لپاره هم شته. لرې يې کړم؟" buttons {"Skip", "Remove"} default button "Remove" with title "Pashto Phonetic Keyboard"
		if button returned of result is "Remove" then
			do shell script "rm -rf " & rmList with administrator privileges
		end if
	end if
on error errMsg number errNum
	if errNum is -128 then return
	display dialog "Installation failed: " & errMsg & return & "نصب ناکام شو." buttons {"OK"} default button "OK" with icon stop with title "Pashto Phonetic Keyboard"
	return
end try

display dialog "Installed. One last step:" & return & return & "1. In Keyboard settings click Edit… next to Input Sources, then +." & return & "2. Choose Pashto, select Pashto Phonetic By Pashto DAO, click Add." & return & "3. If it is not listed, log out and back in, then repeat." & return & return & "انسټال شو. وروستی ګام: د Input Sources تر څنګ Edit… او بيا + کليک کړئ، Pashto وټاکئ، بيا Pashto Phonetic By Pashto DAO غوره کړئ او Add کليک کړئ. که نه ښکاري، Log Out وکړئ او بيا ننوځئ." buttons {"Done", "Open Keyboard Settings"} default button "Open Keyboard Settings" with title "Pashto Phonetic Keyboard"
if button returned of result is "Open Keyboard Settings" then
	open location "x-apple.systempreferences:com.apple.Keyboard-Settings.extension"
end if
