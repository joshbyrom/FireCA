/**
 * @author Josh (joshbyrom.com)
 */

var View = function(cellspace, canvas) {
	this.cellspace = cellspace;
	this.canvas = canvas;
	
	this.element = document.getElementById(this.canvas);
	this.context = this.element.getContext('2d');
	
	this.fill_colors = {
		'unknown' : 'white',
		'tree-filled-land' : 'green',
		'empty-land' : '#CC9900',
		'on-fire' : '#FF0000'
	};
	
	this.min_width = 5;
	this.min_height = 5;
	
	this.set_width_height = function() {
		this.cell_width = this.element.width / this.cellspace.number_of_columns;
		this.cell_height = this.element.height / this.cellspace.number_of_rows;
		
		this.cell_width = Math.max(this.cell_width, this.min_width);
		this.cell_height = Math.max(this.cell_height, this.min_height);
	};
	
	this.set_width_height();
	
	this.draw_cell = function(cell) {
		var x = cell.column * this.cell_width;
		var y = cell.row * this.cell_height;
		var color = this.fill_colors[cell.get_state()];
		
		this.context.fillStyle = color;
		this.context.lineWidth = 1;
		this.context.strokeStyle = 'black';
		
		this.context.beginPath();
		this.context.rect(x, y, this.cell_width, this.cell_height);
		this.context.closePath();
		
		this.context.fill();
		this.context.stroke();
	};
	
	this.draw = function() {
		var xlen = this.cellspace.number_of_columns;
		var ylen = this.cellspace.number_of_rows;
		
		var cell = null;
		for(var x = 0; x < xlen; ++x) {
			for(var y = 0; y < ylen; ++y) {
				cell = this.cellspace.get_cell_at(x, y);
				this.draw_cell(cell);
			}
		}
	};
}
