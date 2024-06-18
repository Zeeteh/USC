var KCODE_GROUPS_INSTANCES = 0;

function KGroup() {
	this.javaClassName = 'KGroup';	
	var _groups 		= [ undefined ];
	var _show			= 0;
	var _layout_box		= false;
	
	this.add = function add(content) {
		_groups.push(content);
		return this;		
	};
	
	this.remove = function remove(index) {
		delete _groups[index];
		return this;		
	};
	
	this.update = function update(index, content) {
		_groups[index] = content;
		return this;		
	};
	
	this.show = function show(index) {
		_show = index;
		return this;		
	};
	
	this.enableBoxLayout = function enableBoxLayout(state) {
		_layout_box = state;
		return this;		
	};
	
	this.getNavigation = function getNavigation(titles) {
		titles		= (titles == undefined ? [] : titles);
		var buffer	= new StringBuffer();
		var size	= _groups.size();
		buffer.append('°12BB+0000°_°>LEFT<°');
		
		_groups.each(function(content, index) {
			if(content == undefined) {
				return;
			}
			
			var entry	= parseInt(index, 10) + 1;
			var title	= (titles[entry - 2] == undefined ? 'Tab ' + entry : titles[entry  - 2]);
			
			if(_layout_box) {
				// @ToDo Use KLink + KImage
				var left	= 'layout/tab_i_l...w_8.mx_-1.png';
				var middle	= 'layout/tab_i_c...label_' + title + '.mw_' + (title.length * 1.12) + '.png'; // xrepeat
				var right	= 'layout/tab_i_r.png';
				
				buffer.append('°>' + left + '<°').append('°>' + middle + '|' + middle + '<>--<>|/tp-showgrp ' + entry + '<°');
				// >{noxrep}<
				buffer.append('°>' + right + '<°');
			} else {
				buffer.append('°>' + title + '|/tp-showgrp ' + entry + '<°');
			
				if(entry < size) {
					buffer.append(' - ');
				}
			}
		});
		
		buffer.append('°>LEFT<°_°r##°');
		
		return buffer.toString();
	};
	
	this.getTabCommand = function getTabCommand(index) {
		return '/tp-showgrp ' + index;
	};
	
	this.switchTab = function switchTab(index) {
		return '°>{setdisplaygroup}' + index + '<°';
	};
	
	this.toString = function toString() {
		var buffer = new StringBuffer();
		
		buffer.append('°>{addDisplayGroup}').append(_show).append('<°');

		_groups.each(function(content, index) {
			if(content == undefined) {
				return;
			}
			
			buffer.append('°>{displayGroup}').append(parseInt(index, 10)).append('<°').append(content).append('°>{displayGroupEnd}<°');
		});
		
		return buffer.toString();
	};
};