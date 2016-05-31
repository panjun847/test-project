var EMPTY_OBJ={};
var undef;
var _toString = Object.prototype.toString,
  _hasOwnProperty = Object.prototype.hasOwnProperty,
   NULL_TYPE = 'Null',
  UNDEFINED_TYPE = 'Undefined',
  BOOLEAN_TYPE = 'Boolean',
  NUMBER_TYPE = 'Number',
  STRING_TYPE = 'String',
  OBJECT_TYPE = 'Object',
  FUNCTION_CLASS = '[object Function]',
  BOOLEAN_CLASS = '[object Boolean]',
  NUMBER_CLASS = '[object Number]',
  STRING_CLASS = '[object String]',
  ARRAY_CLASS = '[object Array]',
  DATE_CLASS = '[object Date]';

if(!Function.prototype.bind){
  Function.prototype.bind = function(object) {
    var __method = this;
    var argc=Array.prototype.slice.call(arguments,1);
    return function() {
      return __method.apply(object, argc.concat( Array.prototype.slice.call(arguments,0)));
    }
  };
}

Array.prototype.each = Array.prototype.forEach;
function extend(dest, source) {
    if(!source){
      source=dest;
      dest={};
    }
    for (var property in source){
      if(!(property in EMPTY_OBJ)){
        dest[property] = source[property];
      }
    }
    return dest;
};
function toArray(arr){
  if(isArray(arr)){return arr}
  var res=false;
  try{
    res=Array.prototype.slice.call(arr,0);
  }catch(e){
    
  }
  return res;
}
function isArray(object) {
  return _toString.call(object) === ARRAY_CLASS;
}
function isFunction(object) {
  return _toString.call(object) === FUNCTION_CLASS;
}

function isString(object) {
  return _toString.call(object) === STRING_CLASS;
}

function isNumber(object) {
  return _toString.call(object) === NUMBER_CLASS;
}

function isDate(object) {
  return _toString.call(object) === DATE_CLASS;
}

function isUndefined(object) {
  return typeof object === "undefined";
}

/*create Class*/
var Class={
  create:function(){
    var parent=null;
    var argc=toArray(arguments);
    if(isFunction(argc[0])){parent=argc.shift()}

    function res(){
      this.init && this.init.apply(this,arguments);
    }
    function sub(){}
    if(parent){
      sub.prototype=parent.prototype;
      res.prototype=new sub();
    }
    res.superclass=parent;
    for (var i = 0, length = argc.length; i < length; i++){
      extend(res.prototype,argc[i]);
    }
    res.prototype.constructor=res;
    return res;
  }
}