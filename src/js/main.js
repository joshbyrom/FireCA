/**
 * @author Josh
 */


function main(element_id) {
	var cellspace = new Cellspace(100, 100);
	
	var view = new View(cellspace, element_id);
	
	var sim = new Simulation(null, view);
	sim.start(1000, 1);
}
