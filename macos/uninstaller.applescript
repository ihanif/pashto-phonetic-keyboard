-- Pashto Phonetic Keyboard by Pashto DAO: uninstaller (compiled into an app by build_apps.sh)

set bundleName to "PashtoDAOPhoneticKeyboard.bundle"
set userCopy to (POSIX path of (path to home folder)) & "Library/Keyboard Layouts/" & bundleName
set sysCopy to "/Library/Keyboard Layouts/" & bundleName

display dialog "Remove the Pashto Phonetic Keyboard from this Mac?" & return & return & "د پښتو فونېټيک کيبورډ له دې مېک څخه لرې کړم؟" buttons {"Cancel", "Remove"} default button "Remove" with title "Pashto Phonetic Keyboard"

try
	do shell script "rm -rf " & quoted form of userCopy
	try
		do shell script "test -e " & quoted form of sysCopy
		do shell script "rm -rf " & quoted form of sysCopy with administrator privileges
	end try
on error errMsg number errNum
	if errNum is -128 then return
	display dialog "Removal failed: " & errMsg buttons {"OK"} default button "OK" with icon stop
	return
end try

display dialog "Removed. Also delete it from System Settings > Keyboard > Input Sources > Edit… (select it, click −)." & return & return & "لرې شو. له System Settings > Keyboard > Input Sources > Edit… څخه هم يې ړنګ کړئ." buttons {"Done"} default button "Done" with title "Pashto Phonetic Keyboard"
