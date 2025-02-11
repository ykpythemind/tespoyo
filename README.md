# tespoyo

An extension that sends and executes test commands to the integrated terminal, which has been our most recent focus.
You can easily run test commands in the integrated terminal.

[![Screenshot](https://raw.githubusercontent.com/ykpythemind/tespoyo/main/misc/screenshot.mp4)](https://raw.githubusercontent.com/ykpythemind/tespoyo/main/misc/screenshot.mp4)

### [日本語]

最後にフォーカスをあてた統合ターミナルでテストコマンドを実行してくれる拡張機能です。

## Commands

- `tespoyo: Run test (current line)`
- `tespoyo: Run test (current file)`
- `tespoyo: Run all tests`
- `tespoyo: Run the most recent test`
- `tespoyo: Initialize workspace settings for current language`

## Workspace settings

You can define workspace-specific settings as follows.

Command Palette -> `tespoyo: Initialize workspace settings for current language`

```json
{
  "[ruby]": {
    "tespoyo": {
      "commands": {
        "ruby": {
          "line": "bundle exec rake test ${file}:${line}",
          "file": "bundle exec rake test ${file}",
          "all": "bundle exec rake test"
        }
      }
    }
  }
}
```

## Release Notes

### 1.0.3

Workspace設定を入れてくれるコマンドを追加

### 1.0.2

Bug fix

### 1.0.0

Initial release

## Release

```
vsce publish
```

## TODO

- [ ] js support
- [ ] go support
