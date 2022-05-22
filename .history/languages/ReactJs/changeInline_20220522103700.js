const {kebabCase} =require("./camilCase.js");



updateExternalCss = (pageContent) =>{
    
    var editedPageContenet = pageContent;
    var cssContent = "";
    var styleSheetExternalContent = pageContent.split("StyleSheet.create({");
    var cssContentNotClean = pageContent.split("style={");
    var pageLine = pageContent.split("\n").length;
    console.log("ok ok am not ok: y] ", cssContentNotClean);

    for(var x = 1; x < cssContentNotClean.length;x++){
        if(isExternalCss(cssContentNotClean[x])){
            console.log("ok ok am not ok: ");
        
            var name =  getExternalCssName(cssContentNotClean[x]);
            console.log("ok ok am not ok: ", name);

            var parameters = getParameters(cssContentNotClean[x]);
             editedPageContenet = addCssToExternalCss(editedPageContenet,styleSheetExternalContent[1],name,parameters);
      
          }

    }
    console.log(editedPageContenet);

    return {
        pageLine: pageLine,
         pageContent: editedPageContenet
    }

}


addCssToExternalCss = (pageContent,externalCss,name,parameters) =>{
    if(externalCss.includes(name) && parameters != '' && parameters != null){
        externalCss =externalCss.split(name)[1];
        externalCss =externalCss.split("}")[0];
      return  pageContent.replace(externalCss,externalCss+", \n "+parameters.split(",").join(", \n"));
    }
    return pageContent;
}

addBigCssToExternalCss = (pageContent,externalCss,bigCss) => {
  externalCss = externalCss.split("})")[0];
  console.log("KKKKK: " , externalCss);
  var commaExists = lastCharIsComma(externalCss);
//   var commaExists = externalCss.trim().charAt(externalCss.trim().length-1) == ","?  true : false;
  console.log("abbbbb: ", commaExists);
  console.log("AMMMM: ",externalCss.trim().charAt(externalCss.trim().length-1) );
  return pageContent.replace(externalCss, commaExists? externalCss + bigCss : externalCss+ ","+bigCss);
}

lastCharIsComma = (content) => {
  var commaExists = content.trim().charAt(content.trim().length-1) == ","?  true : false;
return commaExists;
}

isExternalCss = (cssContent) => {
    var css = cssContent.split("}")[0];

        return !css.includes("{");
    
    

}

getParameters = (cssContent) => {
    var params = cssContent.split("INParam:")[1];
    if(!params){
        //some error meseage
    }else{
        params = params.split("]")[0];

        return params.trim();
    }
    return "";
}

getExternalCssName = (cssContent) => {
    var cssName = cssContent.split("}")[0];
    
    return cssName.split(".")[1];
}

// changeCamleCase = (cssContent) => {
//     var changedCssContent = cssContent;
//     console.log("THE LENGTH: " ,cssContent.length );
//     for(var x = 0; x < cssContent.length; x++){
//         // console.log("okok: ", cssContent[x])
//         if(isChar(cssContent[x])){
//             if(isUpperCase(cssContent[x])){
//                 console.log("not ok");
//                 changedCssContent = changedCssContent.replace(changedCssContent[x],"-"+changedCssContent[x]);
//                 // changedCssContent[x] = "-"+changedCssContent[x];
//                 console.log(changedCssContent);
                
//             }
//         }
      
//     }
// console.log("THIS IS CSSCONTENT: ", cssContent)
//     return changedCssContent;
// }

var isUpperCase = (character) => { 
    if(character.toUpperCase() === character){
    console.log(character);

        //upercase
        return true;
    }else{
        //lowercase
        return false;
    }

}


 var changeInline = (pageContent) =>{
    // React Native has a function
    // styleSheet where all of the CSS for the page is added
   
    var editedPageContenet = pageContent;
    var cssContent = "";
    var styleSheetExternalContent = pageContent.split("StyleSheet.create({");

    var pageLine = pageContent.split("\n").length;
    var inlineCss = pageContent.split("style={{");
    var names = [];

    for(var x = 1; x < inlineCss.length;x++){
        var name = getName(inlineCss[x-1],names);
            names.push(name);
         cssContent = cssContent+ name.split(".")[1] +":{ \n "+
         getCssContent(inlineCss[x]) 
         +"}, \n";
       
         editedPageContenet =  removeInlineCss(editedPageContenet,inlineCss[x],name);   

    }

    // if(styleSheetExists(pageContent)){
    //     console.log("AKAKAKAKA");
    //     editedPageContenet = addBigCssToExternalCss(editedPageContenet,styleSheetExternalContent[1],cssContent);
    //         var pageContentDone = editedPageContenet;
    // }else{

    var pageContentDone = editedPageContenet;
// }

  

   return {
       pageLine: pageLine,
        pageContent: pageContentDone,
        cssContent: "export const styles = { \n "+ cssContent.split(",").join(", \n") +" \n}"
   }


}


var isChar = (char) => {
    var albhabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
if(albhabet.indexOf(char.toLowerCase()) >= 0){
    return true;
}else{
    return false;
}
}




var generateRandomFourlatterWord = (names)=> {
    var albhabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var word = "";
    for(var x = 0 ; x < 5;x++){
        word = word + albhabet[Math.floor(Math.random() * 25)];
    }

    if(names.includes(word)){
          generateRandomFourlatterWord();
        
    }

    return word;
}




var changeInlineRandom = (pageContent) =>{
    // React Native has a function
    // styleSheet where all of the CSS for the page is added
   
    var editedPageContenet = pageContent;
    var cssContent = "";
    var styleSheetExternalContent = pageContent.split("StyleSheet.create({");
    var pageLine = pageContent.split("\n").length;
    var inlineCss = pageContent.split("style={{");
    var generatedNames = [];

    for(var x = 1; x < inlineCss.length;x++){
        
        var name = generateRandomFourlatterWord(generatedNames);
        
        generatedNames.push(name);  
       
         cssContent = cssContent+ name+":{ \n "+
         getCssContent(inlineCss[x]) 
         +"}, \n";
       
         editedPageContenet =  removeInlineCss(editedPageContenet,inlineCss[x],"styles."+name);   
         
        }
        
        if(styleSheetExists(pageContent)){
            console.log("AKAKAKAKA");
            editedPageContenet = addBigCssToExternalCss(editedPageContenet,styleSheetExternalContent[1],cssContent);
                var pageContentDone = editedPageContenet;
        }else{

        var pageContentDone = editedPageContenet + "\n \n \n  const styles = StyleSheet.create({ \n "+ cssContent.split(",").join(", \n")  + "}) "
    }

   return {
       pageLine: pageLine,
        pageContent: pageContentDone
   }


}

var getName = (inlineCss,names) => {
    var name = inlineCss.split("cn:")[inlineCss.split("cn:").length-1].split("]")[0];
    if(inlineCss.split("cn:").length > 1){

        return "styles."+name.trim();
    }else{
        return "styles."+generateRandomFourlatterWord(names)

    }
}

var styleSheetExists = (pageContent) =>{
    if(pageContent.split("StyleSheet.create({").length > 1){
        console.log("true: ",pageContent.split("StyleSheet.create({").length.toString() );
        return true;
    }else{
        return false;
    }
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
    changeInline:changeInline,
    changeInlineRandom:changeInlineRandom,
    updateExternalCss:updateExternalCss
}