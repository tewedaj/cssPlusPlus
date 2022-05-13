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

console.log('Congratulations, your extension "inlineCssChanger" is now active!');

let disposable = vscode.commands.registerCommand('inlineCssChanger.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from react-native-css!');
	});


//Update  React Native inline CSS with Name
	let updateCss = vscode.commands.registerCommand('inlineCssChanger.CssUpdate',function(){
		var pageContent = vscode.window.activeTextEditor.document.getText();

	var reacNativeCss = ReactNative.changeInline(pageContent);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,reacNativeCss.pageLine,0),reacNativeCss.pageContent);
		});
	
		vscode.window.showInformationMessage("It's done :)");
	})


//Update  React Native inline CSS with out Name
let ReactNativeNoName = vscode.commands.registerCommand('inlineCssChanger.inlineCssChangerUpdateNoName',function(){
	var pageContent = vscode.window.activeTextEditor.document.getText();

var reacNativeCss = ReactNative.changeInlineRandom(pageContent);
	vscode.window.activeTextEditor.edit((editBuilder) => {
		editBuilder.replace(new vscode.Range(0,0,reacNativeCss.pageLine,0),reacNativeCss.pageContent);
	});

	vscode.window.showInformationMessage("It's done :)");
})


//Update  React Native External Css
let externalCssReactNative = vscode.commands.registerCommand('inlineCssChanger.inlineCssChangerExternalUpdate',function(){
	var pageContent = vscode.window.activeTextEditor.document.getText();

var reacNativeCss = ReactNative.updateExternalCss(pageContent);
	vscode.window.activeTextEditor.edit((editBuilder) => {
		editBuilder.replace(new vscode.Range(0,0,reacNativeCss.pageLine,0),reacNativeCss.pageContent);
	});

	vscode.window.showInformationMessage("It's done :)");
})


	context.subscriptions.push(disposable);
	context.subscriptions.push(updateCss);;
	context.subscriptions.push(ReactNativeNoName);
	context.subscriptions.push(externalCssReactNative);
}



// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
