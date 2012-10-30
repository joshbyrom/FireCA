/**
 * @author Josh (joshbyrom.com)
 */

var Simulation = function(logic, view) {
	this.logic = logic;
	this.view = view;
	
	this.infinite = false;
	this.running = false;
	this.delay = 0;
	this.repeats = 0;
	
	this.step = function(t) {
		(function(fun, t) {
			fun.view.draw();
			
			if(fun.running && (fun.infinite || t < fun.repeats)) {
				var last_step_fun = function() { 
					fun.step(t+1);
				};
				
				fun.last_step_fun = last_step_fun;
				setTimeout(last_step_fun, fun.delay);
			}
		})(this, t);
	};
	
	this.start = function(delay, repeats) {
		this.delay = delay;
		this.repeats = repeats;
		
		this.running = true;
		this.step(0);
	};
	
	this.stop = function() {
		if(this.last_step_fun)
			clearInterval(this.last_step_fun);
		this.running = false;
	};
}
