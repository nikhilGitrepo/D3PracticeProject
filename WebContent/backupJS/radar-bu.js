var ht = 800;
var wid = 840;

var htPad = ht-50;
var widPad = wid-50;

var svg = d3.select('#cnv')
			.append('svg').attr({
				'height':ht,
				'width':wid
				});

var g = svg.append('g').attr({'transform':'translate('+ht/2+','+wid/2+') rotate(-30)'});
//var g = svg.append('g').attr({'transform':'translate('+ht/2+','+wid/2+')'});

var radius = [0,1,2,3,4];

radius = radius.reverse();

var radius_scale = d3.scale.linear()
					.domain([0,d3.max(radius,function(d){return d;})])
					.range([1,250]);

var radar_circles = g.selectAll('circle')
					.data(radius)
					.enter()
						.append('circle')
						.attr({
							'cx':0,
							'cy':0,
							'r':function(d){ return radius_scale(d) },
							'fill':'none',
							'stroke-width':1,
							'stroke':'teal'
						});

var gpa_scale = d3.scale.linear()
					.domain([0,4])
					.range([0,250]);

var benchMarkData = [
		{"key" : "GPA_CUMULATIVE" ,'value':gpa_scale(3)},
		{"key" : "R_CONTENT_READ" ,'value':100},
		{"key" : "R_SESSIONS" ,'value':100},
		{"key" : "R_ASN_SUB" ,'value':100},
		{"key" : "R_FORUM_POST" ,'value':100},
		{"key" : "RMN_SCORE" ,'value':100}
	];

//---Dynamic Axis---------------
var axis_scale = d3.scale.linear()
					.domain([0,200])
					.range([
					        0,radius_scale( d3.max(radius,function(d){return d;}) )
					        ])

var axis = d3.svg.axis()
			.orient('bottom')
			.scale(axis_scale)
			.ticks(4);

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
						.range([0,250]);


//---Rotating Axis to specific angle based on the number of Axes---------------

g.selectAll('.axis').each(function(d,i){
	d3.select(this).selectAll('.tick text')
	.attr({
		'transform': 'rotate(-'+ angle_scale(i) + ')'
	})
});

var axis_label_g = g.append('g')
				//.attr('transform' , 'rotate(-30)');

var radian_scale = d3.scale.linear()
					.domain([0,benchMarkData.length])
					.range([0,(2*Math.PI)]);


// -------Axes labels----------------------

axis_label_g.selectAll('.axis-label')
	.data(benchMarkData)
	.enter()
	.append('text')
		.attr({
			'class':'axis-label',
			'text-anchor':'middle',
			'x':function(d,i){
						return Math.cos(-radian_scale(i))*240; 
				},
			'y':function(d,i){ return Math.sin(-radian_scale(i))*240; },
			'font-size':'0.85em',
		})
	.text(function(d){
		return d.key;
	});

// --------COORDINATES PLOT-------------------
var scatter_plot = g.append('g');

scatter_plot.selectAll('.plot')
	.data(benchMarkData)
	.enter()
	.append('circle')
		.attr({
			'class':'plot',
			'cx':function(d,i){
				console.log(d);
				return Math.cos(-radian_scale(i))*d.value; 
				},
			'cy':function(d,i){ return Math.sin(-radian_scale(i))*d.value; },
			'r':3
		});

var linefunction = d3.svg.line()
	.x(function(d,i){
		return Math.cos(-radian_scale(i))*d.value; 
	})
	.y(function(d,i){ return Math.sin(-radian_scale(i))*d.value; })
	.interpolate('linear-closed');

var path = g.append('path')
			.attr({
				'd':linefunction(benchMarkData),
				'stroke-width':2,
				'stroke':'black',
				'fill': 'teal',
				'opacity':0.2
			});

// ----------SAMPLE IMPLEMENTATION------------
var dataset = [[ 
	{"key" : "GPA_CUMULATIVE",'value' : gpa_scale(4)}, 
	{"key" : "R_CONTENT_READ",'value' : 1.5},
	{"key" : "R_SESSIONS",'value' : 2.948312},
	{"key" : "R_ASN_SUB",'value' : 1}, 
	{"key" : "R_FORUM_POST",'value' : 0.5},
	{"key" : "RMN_SCORE",'value' : 97.9625}
	]/*,
    [
    {"key" : "GPA_CUMULATIVE" ,'value':gpa_scale(3.8729)},
	{"key" : "R_CONTENT_READ" ,'value':1.71056},
	{"key" : "R_SESSIONS" ,'value':2.00949},
	{"key" : "R_ASN_SUB" ,'value':2.4},
	{"key" : "R_FORUM_POST" ,'value':2.5},
	{"key" : "RMN_SCORE" ,'value':25}
	],
    [
    {"key" : "GPA_CUMULATIVE" ,'value':gpa_scale(2.43)},
	{"key" : "R_CONTENT_READ" ,'value':1.55144},
	{"key" : "R_SESSIONS" ,'value':1.978903},
	{"key" : "R_ASN_SUB" ,'value':1.7},
	{"key" : "R_FORUM_POST" ,'value':2.0},
	{"key" : "RMN_SCORE" ,'value':70.777}
	]*/
];

//----------Calculating of MAX values-------------
var scales_array_max = [];
var indivisual_scales = [];
var temp_param = [];

benchMarkData.forEach(function(d){
	
	if( d.key != 'GPA_CUMULATIVE' && d.key != 'RMN_SCORE' ){
		dataset.forEach(function(v){
			v.forEach(function(val){
				if( val.key != 'GPA_CUMULATIVE' && val.key != 'RMN_SCORE' ){
					if(d.key == val.key){
						temp_param.push(val);
					}
				}
			})
		})
	}
	
	if(temp_param.length > 0 ){
		if(temp_param[0].key == d.key){
			
			var max = d3.max(temp_param,function(dmax){
				return dmax.value;
			})
			var a = d.key;
			var b = max;
			scales_array_max.push({key:a,value:b});
		}
		temp_param = [];
	}

});

var scale_functions = [];

scales_array_max.forEach(function(d){
		scale_functions.push({
				key:d.key,
				//value:d3.scale.linear().domain([0,d.value]).range([0,200]).clamp([true])
				value:d3.scale.linear().domain([0,250]).range([0,250]).clamp([true])
			})
})

dataset.forEach(function(datum){
	
	scaleUpData(datum);	
})

function scaleUpData(rawData){
	
	rawData.forEach(function(rawParam){
		scale_functions.forEach(function(entry){
			if(entry.key == rawParam.key){
				rawParam.value = entry.value(rawParam.value * 100);
			}
		})
	})
}

dataset.forEach(function(datum,i){
	plotter(datum,i);
})

/*
 * Plot Actual processed Data on the radar chart.
 * Draw a polygon fir each student data
 */
var data_plot = g.append('g')
				.attr('class','dataplot');

//var colorScale = d3.scale.lineardomain();

function colores_google(n) {
	  var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
	  return colores_g[n % colores_g.length];
	}

/*.domain([0,dataset.length])*/

function plotter(datum,count){
	
	scatter_plot.selectAll('.dplot')
	.data(datum)
	.enter()
	.append('circle')
		.attr({
			'class':'dplot',
			'cx':function(d,i){
				return Math.cos(-radian_scale(i))*d.value; 
				},
			'cy':function(d,i){ return Math.sin(-radian_scale(i))*d.value; },
			'r':3
		});

var path = g.append('path')
			.attr({
				'd':linefunction(datum),
				'stroke-width':2,
				'stroke':'black',
				'opacity':0.5,
				'fill':colores_google(count)
			});
}

