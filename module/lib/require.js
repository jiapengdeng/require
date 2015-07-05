(function(global){
    /*解析data-main*/
    /*定义私有变量-----private*/
    /*
    * @Fn1:getData(dataStr，context) 通过传入的参数，得到在context作用域下的带有dataStr属性的元素，
    * 并以数组对象形式返回，数组元素中有Dom和value
    * */
    function getData(dataStr,context){
        if(arguments.length<=0){
            //没有传参数，直接返回空的对象
            return [];
        }else if(arguments.length===1){
            //传入一个参数，说明没有上下文环境，遍历所有Dom
            var aValue=[];
            var aElem=document.getElementsByTagName("*");
            for(var i=0;i<aElem.length;i++){
                if(aElem[i].getAttribute(dataStr)){
                    var oValue={};
                    oValue["dom"]=aElem[i];
                    var sourcePath=aElem[i].getAttribute(dataStr);
                    if(!hasType(sourcePath)){
                        oValue["value"]=aElem[i].getAttribute(dataStr)+".js";
                    }else{
                        oValue["value"]=aElem[i].getAttribute(dataStr);
                    }
                    aValue.push(oValue);
                }
            }
            return aValue;
        }else{
            var aValue=[];
            var aElem=document.getElementsByTagName(context);
            for(var i=0;i<aElem.length;i++){
                if(aElem[i].getAttribute(dataStr)){
                    var oValue={};
                    oValue["dom"]=aElem[i];
                    var sourcePath=aElem[i].getAttribute(dataStr);
                    if(!hasType(sourcePath)){
                        oValue["value"]=aElem[i].getAttribute(dataStr)+".js";
                    }else{
                        oValue["value"]=aElem[i].getAttribute(dataStr);
                    }
                    aValue.push(oValue);
                }
            }
            return aValue;
        }
    }
    /*
     * @Fn2:createScript(sourcePath) 获取所传入的资源路径，生成script去请求
     * */
    function createScript(sourcePath){
        var oScript=document.createElement("script");
        oScript.setAttribute("type","text/javascript");
        oScript.setAttribute("src",sourcePath);
        var aHead=document.getElementsByTagName("head");//只有一个head，所以数组只有一个值
        aHead[0].appendChild(oScript);
    }
    /*
     * @Fn3:hasType(str)判断传入的string有没有.js,如果没有，则加入.js后缀
     * */
    function hasType(str){
        var strReg=/\.js$/ig;
        return str.match(strReg);
    }
      /*对外接口defined，require函数对象，对象里定义config方法*/
    global.defined=function(){
        alert(0);
    };

    /*逻辑代码区*/
    var aScript=getData("data-main","script");//因为只有一个data-main入口，所以数组中只有一个值或去前一个，后面的被忽略
    createScript(aScript[0].value);

})(this)