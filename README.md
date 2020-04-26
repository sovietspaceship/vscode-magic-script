# Magic Script Visual Studio Code Extension

Run custom Visual Studio Code extension scripts from workspaces.

## Usage

Place `magic-script.<number>.js` files in your `.vscode` directory in any workspace. This extension exposes `magic-script.runMagicScript<number>` commands that executes it,
in the currently active workspace.

Replace `<number>` with one between 1 and 9. For example, `.vscode/magic-script.2.js` runs when `magic-script.runMagicScript2` is triggered.

Modules are only required to default-export a function, taking a single optional argument as the numeric index of the script. As the command runs within the editor,
magic scripts have full access to the vscode module, which can be installed globally or as a dev dependency in your workspace.

Check `examples/` for some examples.

## Binding to keys

See https://code.visualstudio.com/docs/getstarted/keybindings.

Search `Magic Script` to find the available commands.
