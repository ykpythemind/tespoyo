# tespoyo

You can easily run test commands in the integrated terminal.

<p align="center">
  <video src="misc/screenshot.mp4" width="640" height="360" controls>
</p>


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

## Release

```
vsce publish
```
