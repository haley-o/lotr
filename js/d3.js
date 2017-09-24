// JavaScript Document

// Here is our set-up

width = window.innerWidth;
height= window.innerHeight;

// The map method creates a new array with the results of calling a provided function on every element in the calling array
// callback: Function that produces an element of the new Array, taking three arguments:
 // currentValue
// The current element being processed in the array.
// index
// The index of the current element being processed in the array.
// array
// The array map was called upon.
// .range(150) is the number of circles


// var nodes = d3.range(3).map(function(){ return {radius: Math.random() * 14 + 8}; }),
// 	//In a node tree, the top node is called the root (or root node)
	// root = nodes[0];

var root = nodes;

// root.radius = 0;
// root.fixed = true;

var nodes = [],
n = 50;

var force;

var gravityValue = 0;

var speed = {
	max: .2,
	min: .1,
};

// var links = svg.selectAll("link")
// 	.enter().append("line")
// 	.attr("class", "link")
// 	.attr("stroke", "#CCC")
// 	.attr("fill", "none");

for (i = 0; i < n; i++) {
	console.log("I'm here");
	nodes.push(new CBall);
	console.log(nodes[i]);
}

// In a node tree, the top node is called the root (or root node)
// root = nodes[0];
// root.radius = 0;
// root.fixed = true;

// setInterval(function() {
// 	var min = 0.0,
//         max = 0.003,
//         gravityValue = Math.random() * (max - min) + min;
// 	force.gravity(gravityValue);
// },1000);

force = d3.layout.force()
	.gravity(gravityValue)
	.charge(function(d, i) { return i ? 0 : -1000; })
	.nodes(nodes)
	.size([width, height]);

// force.start();

var svg = d3.select("#homeCon").append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("id", "canvas");

// var canvas = d3.select("#header").append("svg")
//   .attr("width", width)
//   .attr("height", height);

//Now this creates the circles 
var color = d3.scale.ordinal()
  .range(["#ffffff", "#e5e5e5" , "#cccccc"]);



var circles = svg.selectAll("circle")
	// .attr("cx", function(d) {return d.x = Math.max(r, Math.min(width - r, d.x)); })
	// .attr("cy", function (d) { return d.y = Math.max(r, Math.min(height - r, d.y)); })
	.data(nodes.slice(1))
	.enter()
	.append('circle')
	.call(newSVGCircle)
	.style("opacity", ".1")
	// .on("mouseover", handleMouseOver)
	// .on("mouseout", handleMouseOut)
	.attr("fill",function(d,i){return color(i);});


setInterval(loop, 1);
function loop(){
	circles.each(function(d, i){
		d.correction();
		d3.select(this)
			.transition()
				.duration(1)
				.attrTween('cx', function(d, i, a){ return d3.interpolate(a, d.x); })
				.attrTween('cy', function(d, i, a){ return d3.interpolate(a, d.y); });
	});
}



// Functions



//KEEP THIS
svg.on("mousemove", function(){
	console.log("mousemove");
	// var p1 = d3.mouse(this);
	// root.px = p1[0];
	// root.py = p1[1];
	// force.resume();
})

// d3.select('#header')
// 	.on('mousemove', mousemove);

// svg.selectAll("circle")
// .on("mouseover", function(d) {
// 	console.log("mouseover");
//   d3.select(this).attr("r", 15).style("fill", "color").style("opacity", 0.2);
// })                  
// .on("mouseout", function(d) {
// 	console.log("mouseout");
//   d3.select(this).attr("r", 5.5).style("fill", function() {
//                 return "" + color(this.id) + "";
//             });
// });



function newSVGCircle(select){
	console.log("EHHH");
	select.attr('cx', function(d, i){ return d.x; });
	select.attr('cy', function(d, i){ return d.y; });
	select.attr('r', function(d, i){ return d.r; });
	select.classed('ball', true);
	 //  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
  // if(d3.select(this).attr("class") == "first") {
  //   line.attr("x1", x);
  //   line.attr("y1", y);
  // } else {
  //   line.attr("x2", x);
  //   line.attr("y2", y);
  // }
}

// function collide(node){
// 	var r = node.radius + 26,
// 	nx1 = node.x - r,
// 	nx2 = node.x + r,
// 	ny1 = node.y - r,
// 	ny2 = node.y + r;

// return function(quad, x1, y1, x2, y2){
// 	if (quad.point && (quad.point !== node)){
// 	var x = node.x - quad.point.x,
// 		y = node.y - quad.point.y,
// 		l = Math.sqrt(x * x + y * y),
// 		r = node.radius + quad.point.radius;
// 	if (l < r){
// 		l = (l - r) / l * .5;
// 		node.x -= x *= l;
// 		node.y -= y *= l;
// 		quad.point.x += x;
// 		quad.point.y += y;
// 		}
// 	}
// return x1 > nx2 || x2 < nx1 || y1 >ny2 || y2 < ny1;
// };

// }


// New CBall Function for forcing circles in consistant directions

function CBall(object){

	object = typeof object !== 'undefined' ? object : this;

	function rr(min, max){ return min + Math.floor(Math.random() * (max - min)); };

	var padding = 10;

	object.x = rr(padding, width - padding); 
	object.y = rr(padding, height - padding); 
	object.v = rr(speed.min, speed.max);
	object.a = Math.PI * rr(0, 360) / 180;

	object.r = 3;
	object.vx = object.v * Math.cos(object.a);
	object.vy = object.v * Math.sin(object.a);

	object.step = function(){
		object.x += object.vx;
		object.y += object.vy;
	}

	object.isEdge = function(){

		var x = object.x,
			y = object.y,
			r = object.r + 1,
			w = width - r, 
			h = height - r;

		if(x < r) return 'left';
		if(x > w) return 'right';
		if(y < r) return 'top';
		if(y > h) return 'bottom';	
		return false;

	}

	object.correction = function(){
		object.step();
		switch(object.isEdge()){
			case 'left': 
			case 'right':
				object.vx *= -1;
				break;
			case 'top':
			case 'bottom':
				object.vy *= -1;
				break;
		}
	}
}

function resizeCanvas() {
	width = window.innerWidth;
	height= window.innerHeight;
	svg
	.attr("width", width)
	.attr("height", height);
}

window.addEventListener('resize', resizeCanvas, false);