// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

let lastCommand: string | null = null;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposables: Array<vscode.Disposable> = [];
  disposables.push(
    vscode.commands.registerCommand("tespoyo.testFile", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const path = vscode.workspace.asRelativePath(editor.document.uri.fsPath);
      let command = getTestFileCommandByLanguageId(editor.document.languageId);
      if (command === "") {
        return;
      }
      console.debug(path);
      command = command.replace(/\$\{file\}/g, path);

      await launchTestOnTerminal(command);
    })
  );
  disposables.push(
    vscode.commands.registerCommand("tespoyo.testLine", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const path = vscode.workspace.asRelativePath(editor.document.uri.fsPath);
      const line = editor.selection.active.line;
      let command = getTestLineCommandByLanguageId(editor.document.languageId);

      if (command === "") {
        return;
      }

      console.debug(path);
      command = command.replace(/\$\{file\}/g, path);
      command = command.replace(/\$\{line\}/g, line.toString());

      await launchTestOnTerminal(command);
    })
  );

  disposables.push(
    vscode.commands.registerCommand("tespoyo.testAll", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }
      const path = vscode.workspace.asRelativePath(editor.document.uri.fsPath);
      const line = editor.selection.active.line;
      let command = getTestAllCommandByLanguageId(editor.document.languageId);

      if (command === "") {
        return;
      }

      await launchTestOnTerminal(command);
    })
  );

  disposables.push(
    vscode.commands.registerCommand("tespoyo.testLast", async () => {
      const command = lastCommand;

      if (command === null) {
        return;
      }

      await launchTestOnTerminal(command);
    })
  );

  disposables.forEach((d) => context.subscriptions.push(d));
}

function getTestLineCommandByLanguageId(languageId: string): string {
  const config = vscode.workspace.getConfiguration("tespoyo.commands");
  const maybeCommand = config.get<string>(`${languageId}.line`);
  if (maybeCommand) {
    return maybeCommand;
  }

  switch (languageId) {
    case "javascript": {
      return "npm run test ${file}:${line}";
    }
    case "typescript": {
      return "npm run test ${file}:${line}";
    }
    case "ruby": {
      return "bin/test ${file}:${line}";
    }
    default: {
      vscode.window.showWarningMessage(
        `language ${languageId} is not supported`
      );
      return "";
    }
  }
}

function getTestFileCommandByLanguageId(languageId: string): string {
  const config = vscode.workspace.getConfiguration("tespoyo.commands");
  const maybeCommand = config.get<string>(`${languageId}.file`);
  if (maybeCommand) {
    return maybeCommand;
  }

  switch (languageId) {
    case "javascript": {
      return "npm run test ${file}";
    }
    case "typescript": {
      return "npm run test ${file}";
    }
    case "ruby": {
      return "bin/test ${file}";
    }
    default: {
      vscode.window.showWarningMessage(
        `language ${languageId} is not supported`
      );
      return "";
    }
  }
}

function getTestAllCommandByLanguageId(languageId: string): string {
  const config = vscode.workspace.getConfiguration("tespoyo.commands");
  const maybeCommand = config.get<string>(`${languageId}.all`);
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
      return "bin/test";
    }
    default: {
      vscode.window.showWarningMessage(
        `language ${languageId} is not supported`
      );
      return "";
    }
  }
}

async function launchTestOnTerminal(command: string) {
  let terminal = vscode.window.activeTerminal;
  if (vscode.window.activeTerminal === undefined) {
    terminal = vscode.window.createTerminal("test");
  }

  lastCommand = command;

  terminal?.show(true);
  terminal?.sendText(command, true);
}

// This method is called when your extension is deactivated
export function deactivate() {}
