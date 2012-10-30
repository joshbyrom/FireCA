/**
 * @author Josh (joshbyrom.com)
 */


var Logic = function(cellspace) {
	this.cellspace = cellspace;
	this.neighbor_range = 1;
	
	//--------------------//
	//    probabilities   //
	//--------------------//
	this.growth_prob = 0.05;
	this.lightning_prob = 0.0003;
	
	this.get_growth_prob_for_cell = function(cell) {
		return (1 + cell.get_neighbors_in_state(this.neighbor_range, 'tree-filled-land').length) * this.growth_prob;
	}
	
	// update
	this.update = function() {
		var xlen = this.cellspace.number_of_columns;
		var ylen = this.cellspace.number_of_rows;
		
		var cell = null;
		for(var x = 0; x < xlen; ++x) {
			for(var y = 0; y < ylen; ++y) {
				cell = this.cellspace.get_cell_at(x, y);
				this.handle_cell(cell);
			}
		}
	};
	
	this.handle_cell = function(cell) {
		var state = cell.get_state();
		
		if(state === 'unknown') {
			var growth = this.get_growth_prob_for_cell(cell);
			var chance = Math.random();
			if(chance < growth) {
				cell.state = 'tree-filled-land';
			} else {
				cell.state = 'empty-land';
			}
		}
	};
}
