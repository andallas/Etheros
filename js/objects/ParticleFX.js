var particleFX = (function(particleFX)
{
	/*
	particleFX.explosion = function(x, y, vx, vy)
	{
		var particles = [];

		return particles;
	}
	*/

	particleFX.spark_red = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;

		var particles = [];
		var dirX = (Math.random() * 2) - 1;
		var dirY = (Math.random() * 2) - 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Spark_Red.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75}));

		return particles;
	}

	particleFX.spark_green = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;

		var particles = [];
		var dirX = (Math.random() * 2) - 1;
		var dirY = (Math.random() * 2) - 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Spark_Green.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75}));

		return particles;
	}

	particleFX.spark_blue = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;

		var particles = [];
		var dirX = (Math.random() * 2) - 1;
		var dirY = (Math.random() * 2) - 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Spark_Blue.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75}));

		return particles;
	}

	particleFX.beam_red = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;
		var endY = options.endY || 0;

		var particles = [];
		var dirX, dirY;
		for(var i = y; i > endY; i-= 15)
		{
			var index = -1;
			for(var j = 0; j < particles.length; j++)
			{
				if(particles[j].isAlive)
					continue;
				else
				{
					index = j;
					break;
				}
			}

			if(index >= 0)
			{
				dirX = (Math.random() * 2) - 1;
				dirY = (Math.random() * 2) - 1;
				particles[index].set({x: x, y: i, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Beam_Red.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75});
			}
			else
			{
				dirX = (Math.random() * 2) - 1;
				dirY = (Math.random() * 2) - 1;
				particles.push(new scorch.Particle({x: x, y: i, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Beam_Red.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75}));
			}
		}

		return particles;
	}

	particleFX.beam_green = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;
		var endY = options.endY || 0;

		var particles = [];
		var dirX, dirY;
		for(var i = y; i > endY; i-= 15)
		{
			var index = -1;
			for(var j = 0; j < particles.length; j++)
			{
				if(particles[j].isAlive)
					continue;
				else
				{
					index = j;
					break;
				}
			}

			if(index >= 0)
			{
				dirX = (Math.random() * 2) - 1;
				dirY = (Math.random() * 2) - 1;
				particles[index].set({x: x, y: i, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Beam_Green.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75});
			}
			else
			{
				dirX = (Math.random() * 2) - 1;
				dirY = (Math.random() * 2) - 1;
				particles.push(new scorch.Particle({x: x, y: i, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Beam_Green.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75}));
			}
		}

		return particles;
	}

	particleFX.beam_blue = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;
		var endY = options.endY || 0;

		var particles = [];
		var dirX, dirY;
		for(var i = y; i > endY; i-= 15)
		{
			var index = -1;
			for(var j = 0; j < particles.length; j++)
			{
				if(particles[j].isAlive)
					continue;
				else
				{
					index = j;
					break;
				}
			}

			if(index >= 0)
			{
				dirX = (Math.random() * 2) - 1;
				dirY = (Math.random() * 2) - 1;
				particles[index].set({x: x, y: i, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Beam_Blue.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75});
			}
			else
			{
				dirX = (Math.random() * 2) - 1;
				dirY = (Math.random() * 2) - 1;
				particles.push(new scorch.Particle({x: x, y: i, vx: dirX, vy: dirY, rotatePoint: options.rotatePoint, image: "img/particles/Beam_Blue.png", alpha: 0.5, radius: 12, age: 30, decayRate: 0.75}));
			}
		}

		return particles;
	}

	particleFX.fire = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;

		var particles = [];
		var dirX = (Math.random() * 2) - 1;
		var dirY = (Math.random() * 2) - 1;
		var speed = Math.floor(Math.random() * 1.5) + 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/Fire.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.75}));
		particles.push(new scorch.Particle({x: x+1, y: y+1, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/Fire.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.75}));

		return particles;
	}

	particleFX.smoke = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;

		var particles = [];
		var dirX = (Math.random() * 2) - 1;
		var dirY = (Math.random() * 2) - 1;
		var speed = Math.floor(Math.random()) + 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/smoke.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.75}));
		particles.push(new scorch.Particle({x: x+1, y: y+1, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/smoke.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.75}));

		return particles;
	}

	particleFX.explosion = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;

		var particles = [];
		var dirX = (Math.random() * 2) - 1;
		var dirY = (Math.random() * 2) - 1;
		var speed = Math.floor(Math.random() * 1.5) + 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/Fire.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.75}));
		particles.push(new scorch.Particle({x: x+1, y: y+1, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/Fire.png", radius: 10, age: 30, decayRate: 0.75}));

		dirX = (Math.random() * 2) - 1;
		dirY = (Math.random() * 2) - 1;
		speed = Math.floor(Math.random()) + 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/Smoke.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.75}));

		return particles;
	}
	
	particleFX.exhaust = function(options)
	{
		var x = options.x || 0;
		var y = options.y || 0;
		var vx = options.vx || 0;
		var vy = options.vy || 0;

		var particles = [];
		var dirX = vx * (Math.random() * 4);
		var dirY = vy * (Math.random() * 4);
		var speed = Math.floor(Math.random() * 1.5) + 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/Smoke.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.5}));
		dirX = vx * (Math.random() * 4);
		dirY = vy * (Math.random() * 4);
		speed = Math.floor(Math.random() * 1.5) + 1;
		particles.push(new scorch.Particle({x: x, y: y, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/Fire.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.75}));
		particles.push(new scorch.Particle({x: x+1, y: y+1, vx: dirX * speed, vy: dirY * speed, rotatePoint: options.rotatePoint, image: "img/particles/Fire.png", alpha: 0.5, radius: 10, age: 30, decayRate: 0.75}));

		return particles;
	}

	return particleFX;
})
(particleFX || {});