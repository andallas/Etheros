function GetIntersection(l1, l2)
{
	var x1 = l1[0][0];
	var y1 = l1[0][1];
	var x2 = l1[1][0];
	var y2 = l1[1][1];

	var x3 = l2[0][0];
	var y3 = l2[0][1];
	var x4 = l2[1][0];
	var y4 = l2[1][1];
	x = ((x1 * y2 - y1 * x2) * (x3 - x4)-(x1 - x2)*(x3 * y4 - y3 * x4))/((x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4));
	y = ((x1 * y2 - y1 * x2) * (y3 - y4)- (y1 - y2)*(x3 * y4 - y3 * x4))/ ((x1 - x2)*(y3 - y4)-(y1 - y2)*(x3 - x4));
	return [x, y];
}
//GetCentroid, GetQuadCentroid are depricated, simply use GetPolygonCentroid for any polygon with a finite number of verteces 
function GetCentroid(t)
{
	l1 = [[t[0][0], t[0][1]], [(t[1][0] + t[1][1]) / 2, (t[2][0]+ t[2][1]) / 2]];
	l2 = [[t[1][0], t[1][1]], [(t[0][0] + t[0][1] / 2),(t[2][0]+ t[2][1]) / 2]];
	return GetIntersection(l1, l2);
}
function GetQuadCentroid(q)
{
	console.log(q);
	var mid = GetIntersection([q[0], q[2]], [q[1], q[3]]);
	var points = Array();
	console.log(q[0], mid, q[1]);
	points.push(GetCentroid([q[0], mid, q[1]]));
	points.push(GetCentroid([q[1], mid, q[2]]));
	points.push(GetCentroid([q[2], mid, q[3]]));
	points.push(GetCentroid([q[3], mid, q[0]]));
	console.log(points);
	var f = GetIntersection([points[0], points[1]], [points[2], points[3]])
	//if (f[0] == NaN || f[1] == NaN)
	//{
	//	f = GetIntersection([points[0], points[2]], [points[1], points[3]])
	//}
	return f;
}
function GetPolygonCentroid(p)
{
	var x = 0;
	var y = 0;
	for (var i = 0; i < p.length; i++)
	{
		x = x + p[i][0];
		y = y + p[i][1];
	}
	return [x / p.length, y / p.length];
}
function GetShipCentroid(s)
{
	p = new Array();
	for (var i = 0; i < s.components.length; i ++)
	{
		c = s.components[i];
		p.push([c.offset.x, c.offset.y]);
		p.push([c.offset.x + c.width, c.offset.y]);
		p.push([c.offset.x, c.offset.y + c.height]);
		p.push([c.offset.x + c.width, c.offset.y + c.height])
	}
	return GetPolygonCentroid(p);
}
//probably not needed...
function ShapeToQuad(s)
{
	var top = [0]
	var left = [0]
	var right = [0]
	var bot = [0]
	for (var i = 0; i < s.length(); i++)
	{
		var y = s[i].offset.y;
		var x = s[i].offset.x;
		if (top[0] <= y)
		{
			top[0] = y;
		}
		if (left[0] >= x)
		{
			left[0] = x;
		}
		if (right[0] <= x)
		{
			right[0] = x;
		}
		if (bot[0] >= y)
		{
			bot[0] = y;
		}
	}
	for (i = 0; i < s.length(); i++)
	{
		var y = s[i].offset.y;
		var x = s[i].offset.x;
		if (y == top[0])
		{
			top.push(s);
		}
		if (x == left[0])
		{
			left.push(s);			
		}
		if (x == right[0])
		{
			right.push(s);
		}
		if (y == bot[0])
		{
			bot.push(s);
		}

	}
}