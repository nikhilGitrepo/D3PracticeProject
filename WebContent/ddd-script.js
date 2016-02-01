
var ht = 550;
var wid = 640;

var actHt = ht-50;
var actWid = wid-50;
var svg = d3.select('#cnv')
.append('svg').attr({'height':ht,'width':wid});

var g = svg.append('g');

g.attr('transform','translate(20,20)');

var dataset = [[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]];
/*var dataset = [];
for(var i =0;i<10;i++){
	var xVal = Math.random() * 1000;
	var yVal =Math.random() * 1000;
	dataset.push([xVal,yVal]);
}*/

var htScale = d3.scale.linear()
						.domain([d3.min(dataset,function(d){return d[0]}),d3.max(dataset,function(d){return d[0]})])
						.range([0,actHt]);

var widScale = d3.scale.linear()
						.domain([d3.min(dataset,function(d){return d[1]}),d3.max(dataset,function(d){return d[1]})])
						.range([20,actWid]);

console.log(htScale.domain());
console.log(widScale.domain());
/*g.selectAll('rect')
	.data(dataset)
	.enter()
	.append('rect')
	.attr({
		'height':function(d){return htScale(d[0])},
		'width':20,
		'fill':'teal',
		'x': function(d,i){return widScale(d[1]);},
		'y': function(d){return ht-d[0]}
		});
*/
var counter = 0;
g.selectAll('circle')
		.data(dataset)
		.enter()
		.append('circle')
		.attr({
			'id':function(d,i){return d[0]},
			'r':5,
			'cx':function(d,i){return widScale(d[1]);},
			'cy': function(d){return actHt-d[0]},
			'fill':'teal'
		});

/*var textNodes = g.selectAll('text')
				.data(dataset)
				.enter()
				.append('text')
				.attr({
					'text-anchor':'middle',
					'font-size':'0.8em',
					'x':function(d,i){return widScale(d[1]);},
					'y': function(d){return (actHt-d[0]-10)}
				})
				.text(function(d){return  '[' + d[0] + ',' + d[1] + ']';});*/

var newHt = (actHt+25);
var newWid = (actWid);

var xaxisg = svg.append("g")
	.attr({'class':'axis','transform':'translate(0,'+newHt +')'})
	.call(d3.svg.axis()
			.scale(widScale)
			.orient('bottom')
			.ticks(5)
	);

var yaxisg = svg.append('g')
				.attr({'class':'axis','transform':'translate(50,0)'})
				.call(d3.svg.axis()
						.scale(htScale)
						.orient('left')
				);

var linefunction = d3.svg.line()
						.x(function(d){return htScale(d[1])})
						.y(function(d){return widScale(d[0])})
						.interpolate('linear');

console.log(linefunction([10,10]));

console.log(linefunction(dataset));
svg.append('path')
	.attr('d',linefunction(dataset))
		.attr('stoke','black')
		.attr('stroke-width',2)
		.attr('fill','none');