// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const ReactNative = require('./languages/ReactNative/changeInline.js');
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

var outLineCss = "";
	let updateCss = vscode.commands.registerCommand('reactNativeCss.CssUpdate',function(){
		outLineCss = vscode.window.activeTextEditor.document.getText();
	// var codeLine =outLineCss.split("\n").length;
	// var css =	outLineCss.split("style={{")
	var reacNativeCss = ReactNative.changeInline(outLineCss);
	
		// var styleSheet = "";
		// for(var x = 1 ; x < css.length;x++){
		
		// 	var name = css[x-1].split("cn:")[css[x-1].split("cn:").length-1].split("]")[0];

		// 	data = "oner:{ \n "+	css[x].split("}}")[0] +"}, \n";
		// outLineCss =outLineCss.replace("{"+css[x].split("}}")[0]+"}",name);
		// 	styleSheet = styleSheet + data;
		// }

		
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,reacNativeCss.pageLine,0),reacNativeCss.pageContent);
		});
	
		vscode.window.showInformationMessage("It's done :)");
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
