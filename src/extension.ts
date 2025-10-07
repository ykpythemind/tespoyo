// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { languageDefault } from "./default";

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
    vscode.commands.registerCommand(
      "tespoyo.initWorkspaceSettings",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }

        const config = vscode.workspace.getConfiguration("tespoyo", {
          languageId: editor.document.languageId,
        });

        const commands = config.get("commands");
        if (
          commands !== undefined &&
          isObject(commands) &&
          commands !== null &&
          !isObjectEmpty(commands)
        ) {
          vscode.window.showInformationMessage(
            "tespoyo workspace settings already initialized"
          );
          return;
        }

        const c = languageDefault[editor.document.languageId];
        if (!c) {
          vscode.window.showWarningMessage(
            `language ${editor.document.languageId} is not supported`
          );
          return;
        }

        await config.update("commands", c, false, true);
        await config.update("trimPrefixes", [], false);

        vscode.window.showInformationMessage(
          "tespoyo workspace settings initialized"
        );
        await vscode.commands.executeCommand(
          "workbench.action.openWorkspaceConfigFile" // its not working...
        );
      }
    )
  );

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
      command = command.replace(/\$\{file\}/g, betterPath(path));

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
      const line = editor.selection.active.line + 1; // zero based + 1
      let command = getTestLineCommandByLanguageId(editor.document.languageId);

      if (command === "") {
        return;
      }

      console.debug(path);
      command = command.replace(/\$\{file\}/g, betterPath(path));
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
      // const path = vscode.workspace.asRelativePath(editor.document.uri.fsPath);
      // const line = editor.selection.active.line;
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

function betterPath(path: string): string {
  const config = vscode.workspace.getConfiguration("tespoyo");
  const testRootDirs = config.get<Array<string>>("testRootDirs") || [];

  for (const prefix of testRootDirs) {
    if (path.startsWith(prefix)) {
      return path.replace(new RegExp(`^${prefix}/?`), "");
    }
  }

  return path;
}

function getTestLineCommandByLanguageId(languageId: string): string {
  const config = vscode.workspace.getConfiguration("tespoyo.commands", {
    languageId: languageId,
  });

  const maybeCommand = config.get<string>("line");
  if (maybeCommand) {
    return maybeCommand;
  }

  const defaultCommand = languageDefault[languageId]?.line;
  if (defaultCommand) {
    return defaultCommand;
  }

  vscode.window.showWarningMessage(`language ${languageId} is not supported`);
  return "";
}

function getTestFileCommandByLanguageId(languageId: string): string {
  const config = vscode.workspace.getConfiguration("tespoyo.commands", {
    languageId: languageId,
  });

  const maybeCommand = config.get<string>("file");
  if (maybeCommand) {
    return maybeCommand;
  }

  const defaultCommand = languageDefault[languageId]?.file;
  if (defaultCommand) {
    return defaultCommand;
  }

  vscode.window.showWarningMessage(`language ${languageId} is not supported`);
  return "";
}

function getTestAllCommandByLanguageId(languageId: string): string {
  const config = vscode.workspace.getConfiguration("tespoyo.commands", {
    languageId: languageId,
  });

  const maybeCommand = config.get<string>("all");
  if (maybeCommand) {
    return maybeCommand;
  }

  const defaultCommand = languageDefault[languageId]?.all;
  if (defaultCommand) {
    return defaultCommand;
  }

  vscode.window.showWarningMessage(`language ${languageId} is not supported`);
  return "";
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

const isObjectEmpty = (obj: Object) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};
function isObject(value: any) {
  return value !== null && typeof value === "object";
}

// This method is called when your extension is deactivated
export function deactivate() {}
