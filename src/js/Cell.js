/**
 * @author Josh Byrom (joshbyrom.com)
 */
var Cell = function (cellspace, column, row){
	this.cellspace = cellspace;
	
	this.column = column;
	this.row = row;
	
	this.get_state = function() {
		return this.state || 'unknown';
	};
	
  this.next_state = this.get_state();
  this.enter_next_state = function() {
    this.state = this.next_state;
  };
  
  
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
	
	this.get_neighbors_in_state = function(range, state) {
		var neighbors = this.get_neighbors(range);
		
		var result = new Array();
		if(neighbors.length === 0) return result;
		
		for(var i = 0; i < neighbors.length; ++i) {
			for(var j = 0; j < neighbors[i].length; ++j) {
				if(neighbors[i][j].get_state() === state) {
					result.push(neighbors[i][j]);
				}
			}
		}
		
		return result;
	}
	
	// -- end of neighbors section
	
	this.as_string = function() {
		return 'Cell at ' + this.column + ', ' + this.row + '; in State: ' + this.get_state();
	};
};


