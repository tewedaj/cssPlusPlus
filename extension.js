// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { posix } = require('path');
const ReactNative = require('./languages/ReactNative/changeInline.js');
const ReactJs = require('./languages/ReactJs/changeInline.js');
const htmlD = require('./languages/html/changeInline.js');
const Angular = require('./languages/Angular/changeInline.js');
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
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.js";
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.js') });

		var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
		var cssContentString = Buffer.from(cssContentOld).toString('utf8');
		
		var reactJs = ReactJs.changeInline(pageContent,cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,reactJs.pageLine,0),"import {styles} from './styles/styles.js'; \n" +reactJs.pageContent);
		});
		var cssContent = reactJs.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.js') });
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");


	})


	let ReactJsWithName = vscode.commands.registerCommand('inlineCssChanger.reactJsWithName', async function(){

		var pageContent = vscode.window.activeTextEditor.document.getText();
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.js";
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.js') });

		var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
		var cssContentString = Buffer.from(cssContentOld).toString('utf8');
		
		var reactJs = ReactJs.changeInline(pageContent,cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,reactJs.pageLine,0),"import {styles} from './styles/styles.js'; \n" +reactJs.pageContent);
		});
		var cssContent = reactJs.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.js') });
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");


	})


	let htmlRandom = vscode.commands.registerCommand('inlineCssChanger.htmlRandom', async function(){

		var pageContent = vscode.window.activeTextEditor.document.getText();
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.css";
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.css') });

		try{
			var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
			var cssContentString = Buffer.from(cssContentOld).toString('utf8');

		}catch{
			var cssContentOld = "";
			var cssContentString = "";
		}
		
		var htmlResponse = htmlD.changeInline(pageContent?pageContent : "",cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,htmlResponse.pageLine,0),htmlResponse.pageContent.replace(`<link rel="stylesheet" href="./styles/styles.css">`,"")?.replace("<head>",`<head> \n <link rel="stylesheet" href="./styles/styles.css">`));
		});
		
		var cssContent = htmlResponse.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%3A").join(":")+"styles/", 'styles.css') });
	
		console.log("Location: ", fileLocation);
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");


	})



	



	let htmlWithName = vscode.commands.registerCommand('inlineCssChanger.htmlWithName', async function(){

		var pageContent = vscode.window.activeTextEditor.document.getText();
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.css";
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.css') });

		try{
			var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
			var cssContentString = Buffer.from(cssContentOld).toString('utf8');

		}catch{
			var cssContentOld = "";
			var cssContentString = "";
		}
		
		var htmlResponse = htmlD.changeInline(pageContent?pageContent : "",cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,htmlResponse.pageLine,0),htmlResponse.pageContent.replace(`<link rel="stylesheet" href="./styles/styles.css">`,"").replace("<head>",`<head> \n <link rel="stylesheet" href="./styles/styles.css">`));
		});
		
		var cssContent = htmlResponse.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.css') });
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");


	})


	
	 
	let AngularRandom = vscode.commands.registerCommand('inlineCssChanger.AngularRandom', async function(){

		var pageContent = vscode.window.activeTextEditor.document.getText();
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var cssName = vscode.window.activeTextEditor.document.uri.toString();

			cssName = cssName.split("/")[cssName.split("/").length - 1].replace("html","css");
			
			
		
			var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.css";
		

		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://"), cssName) });

		try{
			var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
			var cssContentString = Buffer.from(cssContentOld).toString('utf8');

		}catch{
			var cssContentOld = "";
			var cssContentString = "";
		}
		
		var angularResponse = Angular.changeInline(pageContent?pageContent : "",cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,angularResponse.pageLine,0),angularResponse.pageContent);
		});
		
		var cssContent = angularResponse.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://"),cssName ) });
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");


	})




	let AngularWithName = vscode.commands.registerCommand('inlineCssChanger.AngularWithName', async function(){
		var pageContent = vscode.window.activeTextEditor.document.getText();
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var cssName = vscode.window.activeTextEditor.document.uri.toString();

			cssName = cssName.split("/")[cssName.split("/").length - 1].replace("html","css");
			
			
		
			var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.css";
		

		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://"), cssName) });

		try{
			var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
			var cssContentString = Buffer.from(cssContentOld).toString('utf8');

		}catch{
			var cssContentOld = "";
			var cssContentString = "";
		}
		
		var angularResponse = Angular.changeInline(pageContent?pageContent : "",cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,angularResponse.pageLine,0),angularResponse.pageContent);
		});
		
		var cssContent = angularResponse.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://"),cssName ) });
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");

	})


	let AngularUpdate = vscode.commands.registerCommand('inlineCssChanger.AngularUpdate', async function(){
		var pageContent = vscode.window.activeTextEditor.document.getText();
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var cssName = vscode.window.activeTextEditor.document.uri.toString();

			cssName = cssName.split("/")[cssName.split("/").length - 1].replace("html","css");
			
			
		
			var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.css";
		

		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://"), cssName) });

		try{
			var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
			var cssContentString = Buffer.from(cssContentOld).toString('utf8');

		}catch{
			var cssContentOld = "";
			var cssContentString = "";
		}
		
		var angularResponse = Angular.updateExternalCss(pageContent?pageContent : "",cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,angularResponse.pageLine,0),angularResponse.pageContent);
		});
		
		var cssContent = angularResponse.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://"),cssName ) });
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");

	})




	let ReactJsUpdateExternal = vscode.commands.registerCommand('inlineCssChanger.reactJsUpdateExternal', async function(){

		var pageContent = vscode.window.activeTextEditor.document.getText();
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.js";
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.js') });

		var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
		var cssContentString = Buffer.from(cssContentOld).toString('utf8');
		
		var reactJs = ReactJs.updateExternalCss(pageContent,cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,reactJs.pageLine,0), reactJs.pageContent);
		});
		var cssContent = reactJs.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.js') });
	
		await vscode.workspace.fs.writeFile(fileLocation,writeWord);
		vscode.window.showInformationMessage("It's done :)");


	})



	let HtmlUpdateExternal = vscode.commands.registerCommand('inlineCssChanger.htmlUpdateExternal', async function(){

		var pageContent = vscode.window.activeTextEditor.document.getText();
		var cssValue = vscode.window.activeTextEditor.document.uri._fsPath.toString();
			cssValue = cssValue.replace(cssValue.split("/")[cssValue.split("/").length-1],"");
			cssValue = cssValue.replace(cssValue.split("/")[0],"");
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var activeEditorUri = vscode.window.activeTextEditor.document.uri.toString();
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[activeEditorUri.split("/").length-1],"");
			activeEditorUri = activeEditorUri.replace(activeEditorUri.split("/")[0],"");
			var styleUri = activeEditorUri + "/styles/";
		var extenralCss = cssValue+"styles/styles.js";
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.css') });

		// var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
		// var cssContentString = Buffer.from(cssContentOld).toString('utf8');

		try{
			var cssContentOld = await vscode.workspace.fs.readFile(fileLocation);
			var cssContentString = Buffer.from(cssContentOld).toString('utf8');

		}catch{
			var cssContentOld = "";
			var cssContentString = "";
		}



		
		var htmlResponse = htmlD.updateExternalCss(pageContent,cssContentString);
		vscode.window.activeTextEditor.edit((editBuilder) => {
			editBuilder.replace(new vscode.Range(0,0,htmlResponse.pageLine,0), htmlResponse.pageContent);
		});
		var cssContent = htmlResponse.cssContent;
		var writeWord = Buffer.from(cssContent,'utf8');
		var folderUri = vscode.workspace.workspaceFolders[0].uri;
		var fileLocation = folderUri.with({path: posix.join(activeEditorUri.split("%20").join(" ").split("c%3a").join("C://")+"styles/", 'styles.css') });
	
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
	context.subscriptions.push(ReactJsWithName);
	context.subscriptions.push(ReactJsUpdateExternal);
	context.subscriptions.push(htmlRandom);
	context.subscriptions.push(HtmlUpdateExternal);
	context.subscriptions.push(htmlWithName);
	context.subscriptions.push(AngularWithName);
	context.subscriptions.push(AngularRandom);
	context.subscriptions.push(AngularUpdate);
}



// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
