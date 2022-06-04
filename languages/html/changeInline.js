



const updateExternalCss = (pageContent,cssContentS) =>{
    
    var editedPageContenet = pageContent;
    var cssContentd = cssContentS;
    var styleSheetExternalContent = cssContentS;
    var cssContentNotClean = pageContent.split(`class="`);
    
    // var cssContentNotClean = cssContent;
    var pageLine = pageContent.split("\n").length;
    console.log("ok ok am not ok: y] ", cssContentNotClean);

    for(var x = 1; x < cssContentNotClean.length;x++){
      
            console.log("ok ok am not ok: ");
            editedPageContenet = removeParameters(editedPageContenet,cssContentNotClean[x]);
            var name =  getExternalCssName(cssContentNotClean[x]);
            console.log("ok ok am not ok: ", name);


            var parameters = getParameters(cssContentNotClean[x]);
            console.log("ok ok am not o1: ", parameters);

            cssContentd = addCssToExternalCss(editedPageContenet,cssContentd,name,parameters);
      
          

    }
    

    return {
        pageLine: pageLine,
         pageContent: editedPageContenet,
         cssContent: cssContentd.replace(",,",",")
    }

}


const addCssToExternalCss = (pageContent,externalCss,name,parameters) =>{
    externalCss = externalCss.toString();
    if(externalCss.includes(name) && parameters != '' && parameters != null){
    var    externalCssSingle =externalCss.split(name)[1];
    externalCssSingle =externalCssSingle.split("}")[0];
    var comma = lastCharIsComma(externalCssSingle);
      return  externalCss.replace(externalCssSingle,comma?externalCssSingle +" \n "+parameters.split(";").join("; \n") : externalCssSingle +" \n "+parameters.split(";").join("; \n"));
    }else{
        console.log("ERRRR: ");
    }
    return externalCss;
}

const addBigCssToExternalCss = (pageContent,externalCss,bigCss) => {
//   externalCss = externalCss.split("})")[0];
   
    if(externalCss.length > 1){
        console.log("KKKKK: " , externalCss);
        var commaExists = lastCharIsComma(externalCss);
      //   var commaExists = externalCss.trim().charAt(externalCss.trim().length-1) == ","?  true : false;
        console.log("abbbbb: ", commaExists);
        console.log("AMMMM: ",externalCss.trim().charAt(externalCss.trim().length-1) );
        return{
            pageContent: pageContent,
            cssContent: externalCss.replace(/}/, commaExists? "}" + bigCss : "}"+bigCss),
            
        } 
      
    }
}

const lastCharIsComma = (content) => {
  var commaExists = content.trim().charAt(content.trim().length-1) == ","?  true : false;
return commaExists;
}

const isExternalCss = (cssContent) => {
    var css = cssContent.split("}")[0];

        return !css.includes("{");
    
    

}

const getParameters = (cssContent) => {
    var params = cssContent.split("cnd:")[1];
    if(!params){
        //some error meseage
    }else{
        params = params.split("]")[0];

        return params.trim();
    }
    return "";
}

const getExternalCssName = (cssContent) => {
    console.log("Name");
    var cssName = cssContent.split(`"`)[0];
    console.log(cssName);
    return cssName;
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


 var changeInline = (pageContent,cssUnedited) =>{
    // React Native has a function
    // styleSheet where all of the CSS for the page is added
   
    var editedPageContenet = pageContent;
    var cssContent = "";
    var styleSheetExternalContent = cssUnedited;

    var pageLine = pageContent.split("\n").length;
    var inlineCss = pageContent.split(`style="`);
    var names = [];

    for(var x = 1; x < inlineCss.length;x++){
        var name = getName(inlineCss[x-1],names);
            names.push(name);
            cssContent = `${cssContent} .${name.replace(`"`,"").replace(`"`,"")}{ \n 
                ${ getCssContent(inlineCss[x])}
                 } \n`;
       
         editedPageContenet =  removeInlineCss(editedPageContenet,inlineCss[x],name);   

    }

    if(styleSheetExternalContent.length > 0){
        console.log("AKAKAKAKA");
        editedPageContenet = addBigCssToExternalCss(editedPageContenet,styleSheetExternalContent,cssContent);
            var pageContentDone = editedPageContenet.pageContent;
            cssContent = editedPageContenet.cssContent;
    }else{
    cssContent =  cssContent.split(";").join("; \n") ;
    // cssContent = cssContent.split(",").join(", \n") +" \n}";

    var pageContentDone = editedPageContenet;
    
}




   return {
       pageLine: pageLine,
        pageContent: pageContentDone,
        cssContent: cssContent.replace(",,",",").split("=").join(":")
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
    var inlineCss = pageContent.split(`style="`);
    var generatedNames = [];

    for(var x = 1; x < inlineCss.length;x++){
        
        var name = generateRandomFourlatterWord(generatedNames);
        
        generatedNames.push(name);  
       
        cssContent = `${cssContent} .${name.replace(`"`,"").replace(`"`,"")}{ \n 
            ${ getCssContent(inlineCss[x])}
             } \n`;
       
         editedPageContenet =  removeInlineCss(editedPageContenet,inlineCss[x],name);   
         
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

        return `"`+name.trim()+`"`;
    }else{
        return `"`+generateRandomFourlatterWord(names)+`"`

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
    var cssContent = inlineCss.split(`"`)[0];
    return cssContent;
}

var removeInlineCss = (pageContent,inlineCss,name) =>{
    var pageContentEdited  =pageContent.replace(`style="${inlineCss.split(`"`)[0]}"`,"class="+name+"");    
return pageContentEdited;
}

var removeParameters = (pageContent,paramStyles) =>{
    var pageContentEdited = pageContent;
    var parameters = paramStyles.split("cnd:")[1];
    if(parameters){
    var parameters = parameters.split("]");
    if(parameters.length > 0){

        pageContentEdited = pageContent.replace(parameters[0],"");
    }
}

    return pageContentEdited;
}

module.exports = {
    changeInline:changeInline,
    changeInlineRandom:changeInlineRandom,
    updateExternalCss:updateExternalCss
}