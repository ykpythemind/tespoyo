# tespoyo

You can easily run test commands in the integrated terminal.

[![Image from Gyazo](https://i.gyazo.com/c6b31643c78d888b85a4935d8ef07a60.gif)](https://gyazo.com/c6b31643c78d888b85a4935d8ef07a60)

## Extension Settings

You can define workspace-specific settings as follows.

```json
{
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
```

## Release Notes

### 1.0.2

Bug fix

### 1.0.0

Initial release
