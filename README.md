# tespoyo

You can easily run test commands in the integrated terminal.



https://user-images.githubusercontent.com/22209702/229293077-02ea6cca-66e1-4aa1-88e7-8fe91bd2b8ca.mp4



## Extension Settings

You can define workspace-specific settings as follows.
( Command Palette -> `Preferences: Open Workspace Settings (JSON)` )

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
