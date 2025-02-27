# tespoyo

`tespoyo` executes test commands in the integrated terminal.

https://github.com/user-attachments/assets/fba474df-01d4-468a-8d51-3220c56637de


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

example:

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
