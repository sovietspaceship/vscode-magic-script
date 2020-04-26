const vscode = require('vscode');

const options = {
    'Switch To Header'() {
        const currentFile = vscode.window.activeTextEditor.document.uri;
        const header = vscode.Uri.parse(currentFile.fsPath.replace(/.h$/, '.cpp'));
        return vscode.workspace.openTextDocument(header);
    },
    'Switch To Implementation'() {
        const currentFile = vscode.window.activeTextEditor.document.uri;
        const header = vscode.Uri.parse(currentFile.fsPath.replace(/.cpp$/, '.h'));
        return vscode.workspace.openTextDocument(header);
    },
    'Reverse Line'() {
        const activeSelection = vscode.window.activeTextEditor.selection.active;
        const currentLine = vscode.window.activeTextEditor.document.lineAt(activeSelection.line);
        const reversedLineText = currentLine.text.split('').reverse().join('');
        return vscode.window.activeTextEditor.edit(editBuilder => {
            editBuilder.replace(currentLine.range, reversedLineText);
        });
    }
};

module.exports = async function () {
    const option = await vscode.window.showQuickPick(Object.keys(options));

    options[option] && await options[option]();
};
