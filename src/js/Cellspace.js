/**
 * @author Josh (joshbyrom.com)
 */
var Cellspace = function(number_of_columns, number_of_rows) {
	var number_of_columns = number_of_columns;
	var number_of_rows = number_of_rows;
	
	var cells = {};
	
	//-----------------------------//
	//			Initialization
	//-----------------------------//
	var init = function() {
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
	var guarded_get = function(guarded) {
		var shell = function(column, row) {
			if(this.cells.length == 0) {
				this.init();
				return guarded(column, row);
			} else {
				var realColumn = (this.number_of_columns + column) % this.number_of_columns;
				var realRow = (this.number_of_rows + row) % this.number_of_rows;
				return guarded(realColumn, realRow);
			}
		};
		
		return shell;
	};
	
	var get_cell_at = guarded_get(function(column, row) {
		return this.cells[i][k] || shell(column, row);
	});
	
	var get_neighbors = function(column, row, range) {
		var result = {};
		var half_range = range * 0.5;
		
		var startColumn = column - half_range;
		var endColumn = column + half_range;
		
		var startRow = row - half_range;
		var endRow = row + half_range;
		
		result.cells = new Array();
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
		
		result.top = startRow;
		result.left = startColumn;
		result.width = Math.abs(endColumn - startColumn);
		result.height = Math.abs(endRow - startRow);
		return result;
	};
};
