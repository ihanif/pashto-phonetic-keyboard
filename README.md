# Pashto Phonetic Keyboard | پښتو فونیټیک کیبورډ

Phonetic Pashto keyboards for typing with the Latin key positions you already
know (s → س, p → پ, and so on). Two versions live in this repository:

- **Browser extension** (this folder) — a Chrome extension with a virtual
  on-screen keyboard that works in any text field on any website.
- **macOS keyboard layout** ([`macos/`](macos/)) — a native system keyboard
  with automatic right-to-left switching. See its
  [README](macos/README.md) for install steps, or download the ready-made
  installer from the [releases page](../../releases).

## Browser extension

### Features

- Type in Pashto using phonetic mapping (English keyboard layout)
- Virtual on-screen keyboard
- Works with all text input areas on any website
- Supports keyboard shortcuts (Ctrl/Cmd+C, Ctrl/Cmd+V, etc.)
- Preserves normal page scrolling
- Uses correct Pashto punctuation

### Usage

1. Click the پښتو ⚡ button to enable phonetic typing
2. Toggle the keyboard with the ⌨️ button
3. Type using phonetic mapping (e.g. 's' becomes 'س')

### Keyboard mapping

| English | Pashto | | English | Pashto |
|---------|--------|-|---------|--------|
| a | ا | | A | آ |
| b | ب | | B | ب |
| c | چ | | C | ث |
| ... | ... | | ... | ... |

### Recent changes (v1.0.1)

- Fixed scrolling issues on websites like Claude.ai
- Added support for keyboard shortcuts (Cmd+A, Cmd+C, etc.)
- Fixed Pashto punctuation (period)
- Improved keyboard overlay positioning
- Added visual feedback for keyboard buttons

## macOS keyboard layout

A native keyboard layout bundle made with Ukelele. Once installed, it appears
in System Settings under Pashto input sources, and macOS switches the writing
direction to right-to-left automatically when you select it.

Quick start: download the DMG from the [releases page](../../releases), open
it, and double-click *Install Pashto Keyboard.command*. Full instructions,
including Pashto-language steps and uninstall, are in
[`macos/README.md`](macos/README.md).

## License

MIT License.
