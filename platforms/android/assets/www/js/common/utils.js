;
var Store=(function(){
  
  function setLocalStorage(key,value){
    if(typeof value==='object'){
      value=JSON.stringify(value);
    }
    try{
      localStorage.setItem(key,value)
    }catch(e){
      //ignore
    }
  }
 
  function getLocalStorage(key){
    var result={};
    try{
      result=JSON.parse( localStorage.getItem(key) )||{};
    }catch(e){
      //ignore;
    }
    return result;
  }
   
  var all_key="mybooks";
  var _data=getLocalStorage(all_key);

  return {
    get:function(key){
      return _data[key] || getLocalStorage(all_key)[key]
    },
    remove:function(key){
      var old=getLocalStorage(all_key);
      delete _data[key];
      delete old[key];
      delete old[key+"_time"];
      setLocalStorage(all_key,old);
    },
    getAll:function(){
      return _data;
    },
    add:function(key,value){
      _data[key]=value;
      var old=getLocalStorage(all_key);
      old[key]=value;
      old[key+"_time"]=+new Date
      setLocalStorage(all_key,old);
    }
  }
})();