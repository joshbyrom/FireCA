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
  this.burn_prob = 0.665; // when neighbors are on fire
  this.burned_up_prob = 1.0;  
	this.lightning_prob = 0.0003;
	
	this.get_growth_prob_for_cell = function(cell) {
    var trees_nearby = 
      cell.get_neighbors_in_state(this.neighbor_range, 'tree-filled-land').length;
    
    if(trees_nearby === 0)  return this.growth_prob;
    else return (this.growth_prob * 0.5) * trees_nearby;
	};
  
  this.get_fire_prob_for_cell = function(cell) {
    if(cell.get_state() !== 'tree-filled-land') return 0;
   
    var burning_neighbors_len = 
      cell.get_neighbors_in_state(this.neighbor_range, 'on-fire').length;
    
    if(burning_neighbors_len === 0) return this.lightning_prob;
    else {
      return this.burn_prob;
    }
  };
	
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
    cell.enter_next_state();
		var state = cell.get_state();
		
		if(state === 'unknown' || state === 'empty-land') {
			var growth_chance = this.get_growth_prob_for_cell(cell);
      this.roll(cell, growth_chance, 'empty-land', 'tree-filled-land');
    } else if(state === 'tree-filled-land') {
      var burn_chance = this.get_fire_prob_for_cell(cell);
      this.roll(cell, burn_chance, 'tree-filled-land', 'on-fire');
    } else if(state === 'on-fire') {
      this.roll(cell, this.burned_up_prob, 'on-fire', 'empty-land');
    }
	};
  
  this.roll = function(cell, threshold, above, below) {
    if(Math.random() >= threshold) {
      cell.next_state = above;
    } else {
      cell.next_state = below;
    }
  };
}
