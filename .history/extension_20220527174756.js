// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { posix } = require('path');
const ReactNative = require('./languages/ReactNative/changeInline.js');
const ReactJs = require('./languages/ReactJs/changeInline.js');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {



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


	


	let ReactJsNoName = vscode.commands.registerCommand('inlineCssChanger.reactJsNoNameChanger',async function(){
		//code to use latter
		
		
		var pageContent = vscode.window.activeTextEditor.document.getText();
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = activeEditorUri+"styles/styles.js";
		var cssContentOld = await vscode.workspace.fs.readFile(extenralCss);
		var cssContentString = Buffer.from(cssContentOld).toString('utf8');
		var reactJs = ReactJs.changeInline(pageContent,cssContentString);

		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,reactJs.pageLine,0),"import {styles} from './styles/styles.js'; \n" +reactJs.pageContent);
		});
		var cssContent = reactJs.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri+"styles/", 'styles.js') });
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");


	})


	let ReactJsWithName = vscode.commands.registerCommand('inlineCssChanger.reactJsWithName', async function(){

	
		var pageContent = vscode.window.activeTextEditor.document.getText();
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri+"styles/", 'styles.js') });

		var cssContentExists = await vscode.workspace.fs.readDirectory(fileLocation);
		
		var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";

		var reactJs = ReactJs.changeInline(pageContent,cssContentExists);

		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,reactJs.pageLine,0),"import {styles} from './styles/styles.js'; \n" +reactJs.pageContent);
		});
		var cssContent = reactJs.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
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
	context.subscriptions.push(ReactJsNoName);
}



// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
