/**
 * @author Josh Byrom (joshbyrom.com)
 */
var Cell = function (cellspace, column, row){
	this.cellspace = cellspace;
	
	this.column = column;
	this.row = row;
	
	this.get_state = function() {
		return this.state || 'unknown';
	}
	
	//---------------------------------//
	//		Neighbors
	//---------------------------------//
	this.neighbors = {};
	this.cache_neighbors = function(range) {
		this.neighbors.range = this.cellspace.get_neighborhood(this.column, this.row, range).cells;
	};
	
	this.get_neighbors = function(range) {
		if (this.neighbors.range) return this.neighbors.range;
		
		this.cache_neighbors(range);
		
		return this.neighbors.range;
	};
	// -- end of neighbors section
	
	this.as_string = function() {
		return 'Cell at ' + this.column + ', ' + this.row + '; in State: ' + this.get_state();
	};
};


