/*
	Example #1:
	var table	= new KTable();
	var row		= new KRow();
	var cell	= new KCell('w1');
	row.add(cell);
	table.add(row);
	Bot.public(table);
	
	Example #2:
	var table	= new KTable();
	table.add(new KRow(new KCell('100', 'Hallo Welt'), new KCell('w1', 'Sonstiges')));
	Bot.public(table);
*/
function KTable() {
	this.javaClassName = 'KTable';	
	var _rows = [];
	
	this.add = function add(element) {
		_rows.push(element);
		return this;
	};
	
	this.toString = function toString() {
		var output = new KCode();
		output.append('°>{table');
		
		// first row fix
		if(_rows.length > 0) {
			output.append('|');
		}
		
		_rows.each(function(row, row_index) {
			row.getCells().each(function(cell, cell_index) {
				output.append('|').append(cell.getSize());
			});
			
			return false;
		});
		
		output.append('}<°');
		
		_rows.each(function(row, index) {
			output.append(row.toString(index == 0));
		});
		
		output.append('°>{endtable}<°');
		
		return output;
	};
}

function KRow() {
	this.javaClassName = 'KRow';	
	var _cells = [];
	
	function KRow() {
		_cells	= [];
	}
	
	this.add = function add(cell) {
		_cells.push(cell);
		return this;		
	};
	
	this.getCells = function getCells() {
		return _cells;
	};
	
	this.toString	= function toString(display) {
		display		= display || false;
		var output	= new KCode();
		
		if(!display) {
			output.append('°>{tr}<°');
		}
		
		_cells.each(function(cell) {
			output.append(cell);
		});
		
		return output;
	};
	
	KRow();
}

function KCell(size, content) {
	this.javaClassName = 'KCell';	
	var _size		= 0;
	var _content	= '';
	
	function KCell(size, content) {
		_size		= size || 0;
		_content	= content || '';
	}
	
	this.getSize = function getSize() {
		return _size;
	};
	
	this.toString	= function toString() {
		var output = new KCode();

		output.append('°>{tc}<°').append(_content);

		return output;
	};
	
	KCell(size, content);
}