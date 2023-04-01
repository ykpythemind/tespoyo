# tespoyo

You can easily run test commands in the integrated terminal.

[![Screenshot](https://raw.githubusercontent.com/ykpythemind/tespoyo/main/misc/screenshot.mp4)](https://raw.githubusercontent.com/ykpythemind/tespoyo/main/misc/screenshot.mp4)

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
