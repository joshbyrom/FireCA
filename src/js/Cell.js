/**
 * @author Josh Byrom (joshbyrom.com)
 */
var Cell = function (cellspace, column, row){
	var cellspace = cellspace;
	
	var column = column;
	var row = row;
	
	
	var private = new Object();
	
	//---------------------------------//
	//		Neighbors
	//---------------------------------//
	private.neighbors = {};
	private.cache_neighbors = function(range) {
		private.neighbors.range = cellspace.get_neighbors(range);
	};
	
	var get_neighbors = function(range) {
		if (private_stuff.neighbors.range) return private_stuff.neighbors.range;
		
		private_stuff.cache_neighbors(range);
		
		return private_stuff.neighbors.range;
	};
	// -- end of neighbors section
	
	var as_string = function() {
		return 'Cell at ' + column + ', ' + row;
	};
};


