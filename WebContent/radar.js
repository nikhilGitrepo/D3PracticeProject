var ht = 500;
var wid = 540;

var htPad = ht-50;
var widPad = wid-50;

var svg = d3.select('#cnv')
			.append('svg').attr({
				'height':ht,
				'width':wid
				});

var g = svg.append('g').attr({'transform':'translate('+ht/2+','+wid/2+')'});

var radius = [0,1,2,3,4];
radius = radius.reverse();

var radius_scale = d3.scale.linear()
					.domain([0,d3.max(radius,function(d){return d;})])
					.range([1,200]);

var radar_circles = g.selectAll('circle')
					.data(radius)
					.enter()
						.append('circle')
						.attr({
							'cx':0,
							'cy':0,
							'r':function(d){ return radius_scale(d) },
							'fill':'none',
							'stroke-width':2,
							'stroke':'teal'
						});

var benchMarkData = [
		{"GPA_CUMULATIVE" : "GPA_CUMULATIVE" ,'value':3},
		{"RMN_SCORE" : "RMN_SCORE" ,'value':100},
		{"R_CONTENT_READ" : "R_CONTENT_READ" ,'value':100},
		{"R_FORUM_POST" : "R_FORUM_POST" ,'value':100},
		{"R_ASN_SUB" : "R_ASN_SUB" ,'value':100},
		{"R_SESSIONS" : "R_SESSIONS" ,'value':100}
	];

var axis_scale = d3.scale.linear()
					.domain([0,200])
					.range([
					        0,radius_scale( d3.max(radius,function(d){return d;}) )
					        ])

var axis = d3.svg.axis()
			.orient('bottom')
			.scale(axis_scale)
			.ticks(4);

/*var axis_display = g.append('g')
					.attr({
						'class':'axis'
					})
					.call(axis)*/

var angle_scale = d3.scale.linear()
					.domain([0,6])
					.range([0,360]);

var all_axis = g.selectAll('.axis')
				.data(benchMarkData)
				.enter()
				.append('g')
					.attr({
						'class':'axis',
						'transform':function(d,i){
							return 'rotate('+ angle_scale(i) + ')';
						}
					})
					.call(axis);

var gpa_normal_scale = d3.scale.linear()
						.domain([0,4])
						.range([0,200]);

g.selectAll('.axis').each(function(d,i){
	d3.select(this).selectAll('.tick text')
	.attr({
		'transform': 'rotate(-'+ angle_scale(i) + ')'
	})
})

/*g.selectAll('.plot')
	.data(benchMarkData)	
	.enter()
	.append('circle')
		.attr({
			'class':'plot',
			'r':2,
			'cx':function(d){
				return d.value;
			},
			'cy':,
			'fill':'yellow'
		});*/