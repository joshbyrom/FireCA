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
		for(var i = 0; i < number_of_columns; ++i) {
			this.cells[i] = new Array();
			for(var k = 0; k < number_of_rows; ++k) {
				this.cells[i][k] = new Cell(this, i, k);
			}
		}
	};
	
	//------------------------------//
	// Neighbors and Cell Retrieval //
	//------------------------------//
	this.get_cell_at = function(column, row) {
		if(this.cells.length == 0) {
			this.init();
			return this.get_cell_at(column, row);
		} else {
			var realColumn = (this.number_of_columns + column) % this.number_of_columns;
			var realRow = (this.number_of_rows + row) % this.number_of_rows;
			return this.cells[realColumn][realRow];
		}
	};

	
	this.get_neighbors = function(column, row, range) {
		var result = {};
		var real_range = Math.abs(range);
		var half_range = real_range * 0.5;
		
		var startColumn = column - half_range;
		var endColumn = column + half_range;
		
		var startRow = row - half_range;
		var endRow = row + half_range;
		
		result.cells = new Array();

		if(range > 0) {
			for(var i = startColumn; i < endColumn; ++i) {
				result.cells.push(new Array());
				for(var j = startRow; j < endRow; ++j) {
					var cell = this.get_cell_at(i, j);
					
					if(i == column && j == row) {
						result.center = cell;
					}
					
					result.cells[result.cells.length - 1].push(cell);
				}
			}
		}
		
		result.top = startRow;
		result.left = startColumn;
		result.width = real_range;
		result.height = real_range;
		return result;
	};
};
