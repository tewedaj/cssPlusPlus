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
const kebabCase = str => str
        .match(/[A-Z][a-z]+/g)
        .join('-')
        .toLowerCase();

module.exports ={ 
    kebabCase:kebabCase
}