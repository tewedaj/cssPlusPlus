var cssMap ={
    
        "borderRadius": "border-radius",
        "backgroundColor":"background-color",
        "fontSize": "font-size",
        "fontWeight":"font-weight",
        "zIndex":"z-index",
        "marginTop":"margin-top",
        "marginRight":"margin-right",
        "marginTop":"margin-top",
        "marginBottom":"margin-bottom",

    
}

// //this code is directly stolen
const kebabCase = (str) => {
    var newStr = str;
    for(var x = 0; x < str.split(":").length;x++){
       console.log("HHAHHAHHAHA: ", str.split(":")[x].split(",")[1]);
       console.log("fgdh: ", str.split(":")[x].split(",")[1]);
        if(!str.split(":")[x].split(",")[1]){
console.log("this is undefined");
        }else{
            console.log("this is not undefiend");
            newStr = newStr.replace(str.split(":")[x].split(",")[1],str.split(":")[x].split(",")[1].match(/[A-Z][a-z]+/g)
            ?.join('-')
            .toLowerCase())
        }
    }
    
    return newStr;
}

module.exports ={ 
    kebabCase:kebabCase
}