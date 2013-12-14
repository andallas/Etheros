Parallax = function Parallax(options)
{
	if(!(this instanceof arguments.callee))
	{
		return new arguments.callee(options);
	}

	this.options = options;
	this.set(options);
}

Parallax.prototype.set = function(options)
{
	this.backgrounds = [];

	return this;
}

Parallax.prototype.add = function(background)
{
	this.backgrounds.push(background);
	this.backgrounds.sort(function(a, b)
	{
		if (a.depth < b.depth)
		{ return -1; }
		if (a.depth > b.depth)
		{ return 1; }
		return 0;
	});
}

Parallax.prototype.update = function()
{
	for(var i = 0; i < this.backgrounds.length; i++)
	{
		this.backgrounds[i].update();
	}
}

Parallax.prototype.updateVelocity = function(velocity)
{
	for(var i = 0; i < this.backgrounds.length; i++)
	{
		this.backgrounds[i].scrollVelocity = velocity.divScalar(Math.floor(Math.abs(this.backgrounds[i].depth)));
	}
}

Parallax.prototype.draw = function()
{
	for(var i = 0; i < this.backgrounds.length; i++)
	{
		this.backgrounds[i].draw();
	}
}