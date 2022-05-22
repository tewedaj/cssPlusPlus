



 var changeInline = (pageContent) =>{
    // React Native has a function
    // styleSheet where all of the CSS for the page is added
   
    var editedPageContenet = pageContent;
    var cssContent = "";

    var pageLine = pageContent.split("\n").length;
    var inlineCss = pageContent.split("style={{");

    for(var x = 1; x < inlineCss.length;x++){
        var name = getName(inlineCss[x-1]);

         cssContent = cssContent+ name.split(".")[1] +":{ \n "+
         getCssContent(inlineCss[x]) 
         +"}, \n";
       
         editedPageContenet =  removeInlineCss(editedPageContenet,inlineCss[x],name);   

    }

    var pageContentDone = editedPageContenet + "\n \n \n StyleSsheet=({ "+ cssContent  + "}) "

   return {
       pageLine: pageLine,
        pageContent: pageContentDone
   }


}

var getName = (inlineCss) => {
    var name = inlineCss.split("cn:")[inlineCss.split("cn:").length-1].split("]")[0];

    return "styles."+name.trim();
}

var getCssContent = (inlineCss) => {
    var cssContent = inlineCss.split("}}")[0];
    return cssContent;
}

var removeInlineCss = (pageContent,inlineCss,name) =>{
    var pageContentEdited  =pageContent.replace("{"+inlineCss.split("}}")[0]+"}",name);    
return pageContentEdited;
}

module.exports = {
    changeInline:changeInline
}