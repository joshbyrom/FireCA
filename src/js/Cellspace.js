/**
 * @author Josh (joshbyrom.com)
 */
var Cellspace = function(number_of_columns, number_of_rows) {
	this.number_of_columns = Math.max(number_of_columns, 1);
	this.number_of_rows = Math.max(number_of_rows, 1);
	
  this.cells = [];
	//-----------------------------//
	//			Initialization
	//-----------------------------//
	this.init = function() {
		this.cells = new Array();
		
		var tmp = null;
		for(var i = 0; i < number_of_columns; ++i) {
			tmp = new Array();
			
			for(var k = 0; k < number_of_rows; ++k) {
				tmp.push(new Cell(this, i, k));
			}
			
			this.cells.push(tmp);
		}
	};
	
	//------------------------------//
	// Neighbors and Cell Retrieval //
	//------------------------------//
	this.get_cell_at = function(column, row) {
		if(this.cells === undefined) this.init();
		
		if(this.cells.length === 0) {
			this.init();
			return this.get_cell_at(column, row);
		} else {
			var real_column = (this.number_of_columns + column) % this.number_of_columns;
			var real_row = (this.number_of_rows + row) % this.number_of_rows;
			
			return this.cells[real_column][real_row];
		}
	};

	
	this.get_neighborhood = function(column, row, range) {
		var result = {};
		var real_range = Math.abs(range);
		var half_range = Math.round(real_range * 0.5);
		
		var start_column = column - half_range;
		var end_column = column + half_range;
		
		var start_row = row - half_range;
		var end_row = row + half_range;
		
		result.cells = new Array();

		if(range > 0) {
			var column_array = new Array();
			for(var i = start_column; i <= end_column; ++i) {
				var cell = null;
				for(var j = start_row; j <= end_row; ++j) {
					cell = this.get_cell_at(i, j);
					
					if(i === column && j === row) {
						result.center = cell;
					}
					
					column_array.push(cell);
				}
				
				result.cells.push(column_array);
				column_array = new Array();
			}
		}
		
		result.top = start_row;
		result.left = start_column;
		result.width = real_range;
		result.height = real_range;
		return result;
	};
};
