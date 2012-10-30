/**
 * @author Josh (joshbyrom.com)
 */

function main(element_id) {
	var cellspace = new Cellspace(100, 100);
	var logic = new Logic(cellspace);
	var view = new View(cellspace, element_id);
  
	var sim = new Simulation(logic, view);
  sim.infinite = true;
	sim.start(1000, 0);
}
