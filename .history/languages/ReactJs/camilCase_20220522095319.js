var cssMap ={
    
        "borderRadius": "border-radius",
        "backgroundColor":"background-color",
        "fontSize": "font-size",
        "fontWeight":"font-weight",
        "zIndex":"z-index",
        "marginTop":"margin-top",
        "marginRight":"margin-right",

    
}

//this code is directly stolen
const kebabCase = (str) => {
    var newStr = str;
    for(var x = 0; x < str.split(":");x++){
        str.split(":")[0].split(",");
        newStr = newStr.replace(str.split(":")[0].split(","),str.match(/[A-Z][a-z]+/g)
        .join('-')
        .toLowerCase())
    }
    
    return newStr;
}

module.exports ={ 
    kebabCase:kebabCase
}