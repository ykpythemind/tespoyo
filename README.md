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

### Test Root Dirs

`tespoyo.testRootDirs` に指定したディレクトリがパスの先頭にある場合、それをトリムしたパスを対象にテストコマンドを実行します。 monorepo環境で便利です

example:

```sh
$ pwd
/path/to/workspace/server

# no testRootDirs config
# it is not working when you are in the server directory, not in the workspace root
$ bundle exec rspec server/spec/foo_spec.rb

# with testRootDirs config: ["server"]
$ bundle exec rspec spec/foo_spec.rb
```

## Release Notes

### 1.0.4

monorepo環境でテストコマンドを実行したいときに便利なオプション `tespoyo.testRootDirs` を追加.

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
