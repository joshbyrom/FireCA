/**
 * @author Josh
 */


function main(element_id) {
	console.log("Inside Main Function");
	
	var space = new Cellspace(100, 100);
	console.log(space.number_of_columns + ', ' + space.number_of_rows);
	console.log(space.get_cell_at(49, 49).as_string());
}
