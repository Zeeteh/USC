function isTypeOf(object, toCheck) {
	var type = undefined;
	
	try {
		if(typeof(object.javaClassName) != 'undefined') {
			type = object.javaClassName;
		} else {
			type = typeof(object);
		}
	} catch(e) {
		/* Do Nothing */
	}
	
	return (toCheck === undefined) ? type : (toCheck == type);
}

function AND(b1, b2) {
	return ((b1) && (b2));
}


function OR(b1, b2) {
	return ((b1) || (b2));
}

function NOT(b1) {
	return !(b1);
}

function XOR(b1, b2){ 
   return ((b1) == true && (b2) == false) || ((b1) == false && (b2) == true);
}

function clone(src) {
	function mixin(dest, source, copyFunc) {
		var name, s, i, empty = {};
		for(name in source){
			s = source[name];
			if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
				dest[name] = copyFunc ? copyFunc(s) : s;
			}
		}
		return dest;
	}

	// null, undefined, any non-object, or function
	if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
		return src;
	}

	// Date
	if(src instanceof Date){
		return new Date(src.getTime());
	}

	// RegExp	
	if(src instanceof RegExp){
		return new RegExp(src);
	}
	
	//Array
	if(src instanceof Array){
		return [].concat(src);
	}
	
	/*
	 *	KFrameWork Classes
	*/
	
	//StringBuffer
	if(src instanceof StringBuffer) {
		return new StringBuffer(src.toString());
	}
	
	//KCode
	if(src instanceof KCode) {
		return new KCode().append(src.toString());
	}

	//KButton
	if(src instanceof KButton) {
		return new KButton(src.getText(), src.getCommand()).setId(src.getId()).setProperties(src.getProperties());
	}
	
	
	// generic objects
	return mixin(src.constructor ? new src.constructor() : {}, src, clone);
}
