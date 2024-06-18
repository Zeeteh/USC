function KInput(input, defaultValue, validateOptions) {
	this.javaClassName = 'KInput';
	var _input			= '';
	var _default		= undefined;
	var _validate		= {};

	function KInput(input, defaultValue, validateOptions) {
		if(input === undefined) {
			return;
		}
		
		_input = input;
		if(defaultValue === undefined) {
			return;
		}
		
		_default = defaultValue;
		
		if(validateOptions === undefined) {
			return;
		}
		
		_validate = validateOptions;
		
		return this;		
	};



	// Call the Constructor
	KInput(input, defaultValue, validateOptions);
}