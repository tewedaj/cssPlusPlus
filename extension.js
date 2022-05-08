// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

console.log('Congratulations, your extension "reactNativeCss" is now active!');

let disposable = vscode.commands.registerCommand('reactNativeCss.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from react-native-css!');
	});


	let updateCss = vscode.commands.registerCommand('reactNativeCss.CssUpdate',function(){
		var test = vscode.window.activeTextEditor.document.getText();
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.insert(new vscode.Position(0,0),test+"ok ok ok")
		});
	
		vscode.window.showInformationMessage(test);
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(updateCss);
}



// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
