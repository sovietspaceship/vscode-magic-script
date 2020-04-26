import * as vscode from 'vscode';

import { exists } from 'fs';
import { join } from 'path';

const N_SCRIPTS = 9;

const MAGIC_SCRIPT_PATH = '.vscode/magic-script.$n.js';

type MagicScript = (scriptIndex: number) => Promise<void>;

export function activate(context: vscode.ExtensionContext) {
	if (!vscode.workspace.rootPath) {
		return vscode.window.showErrorMessage('No active workspace to execute magic script from');
	}
	for (let i = 1; i <= N_SCRIPTS; i++) {
		const magicScriptFilename = MAGIC_SCRIPT_PATH.replace('$n', i.toString());
		const scriptPath: string = join(vscode.workspace.rootPath, magicScriptFilename);
		const disposable = vscode.commands.registerCommand(`magic-script.runMagicScript${i}`, async () => {
			if (await fileExists(scriptPath)) {
				const magicScript: MagicScript = require(scriptPath);
				try {
					await magicScript(i);
				} catch (error) {
					vscode.window.showErrorMessage(`Failed to execute magic script ${i}: `, error.message);
					throw error;
				}
			} else {
				vscode.window.showErrorMessage(`No ${magicScriptFilename} found, please create one and try again.`);
			}
		});
		context.subscriptions.push(disposable);
	}
}

async function fileExists(filename: string): Promise<boolean> {
	return new Promise(resolve => exists(filename, resolve));
}

export function deactivate() { }
