function Player(options)
{
// Inheritance
	this.options = options;

// Initialize
	this.init = function()
	{
	// Size attributes
		this.max_x = -100;
		this.min_x =  100;
		this.max_y = -100;
		this.min_y =  100;
		this.cache_x = 0;
		this.cache_y = 0;
		this.ship_width = 16;
		this.ship_height = 16;

	// Movement attributes
		this.position = new Vec2({x: options.x || 0, y: options.y || 0});
		this.velocity = new Vec2({x: 0, y: 0});
		this.direction = new Vec2({x: 0, y: -1});
		this.rotationAngle = 0;
		this.rotSpeed = options.rotSpeed || 3;
		this.maxSpeed = 400;
		this.acceleration = 0;
		this.rotate(this.rotationAngle);

	// Containers
		this.particleEmitters = [];
		this.inventory = [];
		this.components = [];

	// Components
		this.cachedComponents = [];
		var command_01 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: 0, y: 0}, type: 'command', frames: 4, image: "img/ships/Command_02.png"});
		command_01.init();
		this.addComponent(command_01);

		var hull_01 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: -1, y: -1}, type: 'hull', frames: 16, image: "img/ships/Hull_01.png"});
		hull_01.init();
		this.addComponent(hull_01);

		var hull_02 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: -1, y: 0}, type: 'hull', frames: 16, image: "img/ships/Hull_01.png"});
		hull_02.init();
		this.addComponent(hull_02);

		var hull_03 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: -1, y: 1}, type: 'hull', frames: 16, image: "img/ships/Hull_01.png"});
		hull_03.init();
		this.addComponent(hull_03);

		var hull_04 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: 1, y: -1}, type: 'hull', frames: 16, image: "img/ships/Hull_01.png"});
		hull_04.init();
		this.addComponent(hull_04);

		var hull_05 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: 1, y: 0}, type: 'hull', frames: 16, image: "img/ships/Hull_01.png"});
		hull_05.init();
		this.addComponent(hull_05);

		var hull_06 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: 1, y: 1}, type: 'hull', frames: 16, image: "img/ships/Hull_01.png"});
		hull_06.init();
		this.addComponent(hull_06);

		var fuelCell_01 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: 0, y: 1}, type: 'fuelCell', frames: 8, image: "img/ships/FuelCell_01.png"});
		fuelCell_01.init();
		this.addComponent(fuelCell_01);

		var thruster_01 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: -1, y: 2}, type: 'thruster', frames: 4, image: "img/ships/Thruster_02.png"});
		thruster_01.init();
		this.addComponent(thruster_01);

		var thruster_02 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: 0, y: 2}, type: 'thruster', frames: 4, image: "img/ships/Thruster_02.png"});
		thruster_02.init();
		this.addComponent(thruster_02);

		var thruster_03 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: 1, y: 2}, type: 'thruster', frames: 4, image: "img/ships/Thruster_02.png"});
		thruster_03.init();
		this.addComponent(thruster_03);

		var weapon_01 = new Ship_Component({	x: this.position.x, y: this.position.y, offset: {x: 0, y: -1}, type: 'weapon', frames: 1, image: "img/ships/Weapon_05.png"});
		weapon_01.init();
		this.addComponent(weapon_01);

		Entity.call(this, options);

	// Stats
		this.shipSize = 5;
	}

// Update
	this.update = function()
	{
		// Input
		this.doInput();

		// Player Physics
		this.doPhysics();

		// Particles
		this.doParticles();
	}

	this.doInput = function()
	{	
		if(Firestorm.input.held("w up"))
		{
			this.accelerate(1);
			for(var i = 0; i < this.components.length; i++)
			{
				if(this.components[i].type == 'thruster')
				{
					//this.components[i].accelerate();
				}
			}
		}

		if(Firestorm.input.held("a left"))
		{
			this.spin(-1);
		}
		else if(Firestorm.input.held("d right"))
		{
			this.spin(1);
		}

		if(Firestorm.input.held("space"))
		{
			this.shoot();
		}
	}

	this.doPhysics = function()
	{
		// Move player
		this.position = this.position.addVec(this.velocity.multScalar(Firestorm.clock.getDelta()));

		for(var i = 0; i < this.components.length; i++)
		{
			this.components[i].update(this.position, this.velocity);
		}

		// Apply friction
		this.velocity = this.velocity.multScalar(Firestorm.physics.friction());

		// De-jitter small movement close to zero
		if(Math.abs(this.velocity.x) < 0.1)
		{ this.velocity.x = 0; }
		if(Math.abs(this.velocity.y) < 0.1)
		{ this.velocity.y = 0; }
	}

	this.doParticles = function()
	{
		for(var i = 0; i < this.particleEmitters.length; i++)
		{
			this.particleEmitters[i].update();
			if(!this.particleEmitters[i].isAlive)
			{
				//this.particleEmitters = scorch.popArray(this.particleEmitters, i);
			}
		}
	}

	this.shoot = function()
	{
		for(var i = 0; i < this.components.length; i++)
		{
			if(this.components[i].type == 'weapon')
			{
				this.components[i].shoot();
			}
		}
	}

// Draw
	this.draw = function()
	{
		// Components
		for(var i = 0; i < this.components.length; i++)
		{
			this.components[i].draw();
		}

		// Particles
		this.drawParticles();
	}

	this.drawParticles = function()
	{
		for(var i = 0; i < this.particleEmitters.length; i++)
		{
			this.particleEmitters[i].draw();
		}
	}

// Functions
	this.accelerate = function(value)
	{
		// Get acceleration and mass from all ship components
		var acceleration = 0;
		var mass = 0;
		for(var i = 0; i < this.components.length; i++)
		{
			if(this.components[i].type == 'thruster' || this.components[i].type == 'command' || this.components[i].type == 'commandWide')
			{
				acceleration += this.components[i].stat_acceleration;
			}
			mass += this.components[i].stat_mass;
		}

		// Get intended velocity
		var force = this.velocity.addVec(this.direction.multScalar(value * (acceleration / (mass / 10))));

		// Limit velocity then apply it
		if(Vec2.magnitude(this.velocity.x, this.velocity.y) > this.maxSpeed)
		{
			this.velocity = Vec2.reduceMagnitude(this.velocity, Math.abs(this.maxSpeed - Vec2.magnitude(this.velocity.x, this.velocity.y)));
		}
	}

	this.spin = function(value)
	{
		this.rotationAngle += this.rotSpeed * value;

		this.direction.x = Math.sin(Vec2.degreesToRadians(this.rotationAngle));
		this.direction.y = -Math.cos(Vec2.degreesToRadians(this.rotationAngle));

		this.rotateTo(this.rotationAngle);

		for(var i = 0; i < this.components.length; i++)
		{
			this.components[i].spin(this.rotationAngle);
		}
	}

	this.addComponent = function(component)
	{
		this.components.push(component);

		var resize = false;

		if(component.offset.x < this.min_x)
		{
			this.min_x = component.offset.x;
			resize = true;
		}
		if(component.offset.x > this.max_x)
		{
			this.max_x = component.offset.x;
			resize = true;
		}
		
		if(component.offset.y < this.min_y)
		{
			this.min_y = component.offset.y;
			resize = true;
		}
		if(component.offset.y > this.max_y)
		{
			this.max_y = component.offset.y;
			resize = true;
		}
		
		this.cache_x = this.max_x - this.min_x;
		this.cache_y = this.max_y - this.min_y;

		this.ship_width = (this.cache_x + 1) * 16;
		this.ship_height = (this.cache_y + 1) * 16;
		
		if(resize)
		{
			this.resizeCachedComponents();
			this.buildCachedComponents();
		}

		this.addToCachedComponents(component);
		this.updateComponentAnims();
	}

	this.resizeCachedComponents = function()
	{
		this.cachedComponents = new Array(this.cache_x);
		for(var i = 0; i < this.cache_x + 1; i++)
		{
			this.cachedComponents[i] = new Array(this.cache_y);
		}
	}

	this.buildCachedComponents = function()
	{
		for(var i = 0; i < this.components.length; i++)
		{
			var x = this.components[i].offset.x - this.min_x;
			var y = this.components[i].offset.y - this.min_y;
			this.cachedComponents[x][y] = this.components[i];
		}
	}

	this.addToCachedComponents = function(component)
	{
		var x = component.offset.x - this.min_x;
		var y = component.offset.y - this.min_y;
		this.cachedComponents[x][y] = component;
	}

	this.updateComponentAnims = function()
	{
		for(var a = 0; a < this.cachedComponents.length; a++)
		{
			for(var b = 0; b < this.cachedComponents[0].length; b++)
			{
				if(this.cachedComponents[a][b] !== undefined)
				{
					var sides = this.checkComponentSides(a, b);
					switch(this.cachedComponents[a][b].type)
					{
						case 'command':
							if(sides.top && sides.bottom && sides.left && sides.right)
							{
								this.cachedComponents[a][b].setSprite(3);
							}
							else if(sides.bottom && sides.left && sides.right)
							{
								this.cachedComponents[a][b].setSprite(2);
							}
							else if(sides.bottom)
							{
								this.cachedComponents[a][b].setSprite(1);
							}
							else
							{
								this.cachedComponents[a][b].setSprite(0);
							}
						break;
						case 'commandWide':
						break;
						case 'hull':
							if(sides.top && sides.bottom && sides.left && sides.right)
							{
								this.cachedComponents[a][b].setSprite(10);
							}
							else if(sides.top && sides.bottom && sides.left)
							{
								this.cachedComponents[a][b].setSprite(5);
							}
							else if(sides.top && sides.bottom && sides.right)
							{
								this.cachedComponents[a][b].setSprite(4);
							}
							else if(sides.bottom && sides.left)
							{
								this.cachedComponents[a][b].setSprite(1);
							}
							else if(sides.bottom && sides.right)
							{
								this.cachedComponents[a][b].setSprite(0);
							}
							else if(sides.top && sides.left)
							{
								this.cachedComponents[a][b].setSprite(9);
							}
							else if(sides.top && sides.right)
							{
								this.cachedComponents[a][b].setSprite(8);
							}
						break;
						case 'fuelCell':
							if(sides.left && sides.right)
							{
								this.cachedComponents[a][b].setSprite(2);
							}
							else if(sides.left)
							{
								this.cachedComponents[a][b].setSprite(3);
							}
							else if(sides.right)
							{
								this.cachedComponents[a][b].setSprite(1);
							}
							else
							{
								this.cachedComponents[a][b].setSprite(0);
							}
						break;
						case 'capacitor':
						break;
						case 'cargoHold':
						break;
						case 'shipHangar':
						break;
						case 'signalJammer':
						break;
						case 'miningLaser':
						break;
						case 'cloakingDevice':
						break;
						case 'bridge':
						break;
						case 'bridgeWide':
						break;
						case 'shieldGenerator':
						break;
						case 'scanner':
						break;
						case 'tractorBeam':
						break;
						case 'droneBay':
						break;
						case 'thruster':
							if(sides.left && sides.right)
							{
								this.cachedComponents[a][b].setSprite(2);
							}
							else if(sides.left)
							{
								this.cachedComponents[a][b].setSprite(3);
							}
							else if(sides.right)
							{
								this.cachedComponents[a][b].setSprite(1);
							}
							else
							{
								this.cachedComponents[a][b].setSprite(0);
							}
						break;
						case 'engine':
						break;
						case 'warpDrive':
						break;
						case 'weapon':
						break;
					}
				}
			}
		}
	}

	this.checkComponentSides = function(a, b)
	{
		var sides = {top: false, bottom: false, left: false, right: false};

		if(b > 0)
		{
			if(this.cachedComponents[a][b - 1] !== undefined)
			{
				sides.top = true;
			}
		}

		if(b < this.cachedComponents[0].length - 1)
		{
			if(this.cachedComponents[a][b + 1] !== undefined)
			{
				sides.bottom = true;
			}
		}

		if(a > 0)
		{
			if(this.cachedComponents[a - 1][b] !== undefined)
			{
				sides.left = true;
			}
		}

		if(a < this.cachedComponents.length - 1)
		{
			if(this.cachedComponents[a + 1][b] !== undefined)
			{
				sides.right = true;
			}
		}

		return sides;
	}

}
Player.prototype = Entity.prototype;