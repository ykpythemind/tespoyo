// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { relative } from "path";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "tespoyo" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "tespoyo.testFile",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const path = vscode.workspace.asRelativePath(editor.document.uri.fsPath);
      const line = editor.selection.active.line;
      let command = getTestCommandByLanguageId(editor.document.languageId);
      console.debug(path);
      command = command.replace(/\$\{file\}/g, path);
      command = command.replace(/\$\{line\}/g, line.toString());

      await vscode.commands.executeCommand(
        "workbench.action.terminal.sendSequence",
        {
          text: `${command}\n`,
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

function getTestCommandByLanguageId(languageId: string): string {
  const config = vscode.workspace.getConfiguration("tespoyo.languages");
  const maybeCommand = config.get<string>(`${languageId}.command`);
  if (maybeCommand) {
    return maybeCommand;
  }

  switch (languageId) {
    case "javascript": {
      return "npm run test";
    }
    case "typescript": {
      return "npm run test";
    }
    case "ruby": {
      return "bin/rspec ${file}:${line}";
    }
    default: {
      throw "not supported language";
    }
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
