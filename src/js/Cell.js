/**
 * @author Josh Byrom (joshbyrom.com)
 */
var Cell = function (cellspace, column, row){
	var cellspace = cellspace;
	
	var column = column;
	var row = row;
	
	var get_state = function() {
		return this.state || 'unknown';
	}
	
	//---------------------------------//
	//		Neighbors
	//---------------------------------//
	var neighbors = {};
	var cache_neighbors = function(range) {
		this.neighbors.range = cellspace.get_neighbors(this.column, this.row, range);
	};
	
	var get_neighbors = function(range) {
		if (this.neighbors.range) return this.neighbors.range;
		
		this.cache_neighbors(range);
		
		return this.neighbors.range;
	};
	// -- end of neighbors section
	
	var as_string = function() {
		return 'Cell at ' + this.column + ', ' + this.row + '; in State: ' + this.get_state();
	};
};


