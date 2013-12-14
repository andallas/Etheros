function Ship_Component(options)
{
// Inheritance
	this.options = options;
	Entity.call(this, options);

// Initialize
	this.init = function()
	{

	// System attributes
		this.offset = new Vec2({x: options.offset.x, y: options.offset.y});
		this.size = options.size || 16;
		this.frames = options.frames || 16;

	// Movement attributes
		this.position = new Vec2({	x: (options.x || 0) + this.offset.x * this.size,
									y: (options.y || 0) + this.offset.y * this.size
								});
		this.velocity = new Vec2({x: 0, y: 0});
		this.direction = new Vec2({x: 0, y: -1});
		this.rotationAngle = 0;
		this.rotate(this.rotationAngle);
		this.rotatePoint = {x: -this.offset.x * this.size + this.width * 0.5,
							y: -this.offset.y * this.size + this.height * 0.5};

		this.type = options.type;
		this.attached = options.attached || 'yes';

	// Image and animations
		this.anim = new Animation({sprite_sheet: options.image, frames: this.frames, frame_size: [this.size, this.size]});
		this.setSprite(0);

	// Setup
		this.typeSetup();
	}

// Update
	this.update = function(position, velocity)
	{	
		position = position || this.position;
		this.velocity = velocity;

		if(this.attached = 'yes')
		{
			this.position.x = position.x + this.offset.x * this.size;
			this.position.y = position.y + this.offset.y * this.size;
		}
		else
		{
			this.position.set(position.addVec(this.velocity.multScalar(Firestorm.clock.getDelta())));

		// Apply friction
			this.velocity = this.velocity.multScalar(physics.FRICTION);

		// De-jitter small movement close to zero
			if(Math.abs(this.velocity.x) < 0.1)
			{ this.velocity.x = 0; }
			if(Math.abs(this.velocity.y) < 0.1)
			{ this.velocity.y = 0; }
		}

		switch(this.type)
		{
			case 'command':
			break;
			case 'commandWide':
			break;
			case 'hull':
			break;
			case 'fuelCell':
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
			break;
			case 'engine':
			break;
			case 'warpDrive':
			break;
			case 'weapon':
				var bulletsLength = this.bullets.length;
				for(var i = 0; i < this.bullets.length; i++)
				{
					this.bullets[i].update();
					if(this.bullets[i].destroy)
					{
						this.bullets.splice(i, 1);
						bulletsLength--;
						continue;
					}
				}
				//this.bullets.length = bulletsLength;
			break;
		}
	}

	this.spin = function(angle)
	{
		this.rotatePoint = {x: -this.offset.x * this.size + this.width * 0.5,
							y: -this.offset.y * this.size + this.height * 0.5};

		this.direction.x = Math.sin(Vec2.degreesToRadians(this.rotationAngle));
		this.direction.y = -Math.cos(Vec2.degreesToRadians(this.rotationAngle));

		this.rotationAngle = angle;
		this.rotateTo(this.rotationAngle);
	}

// Draw
	this.draw = function()
	{
		Entity.prototype.draw.call(this);

		switch(this.type)
		{
			case 'command':
			break;
			case 'commandWide':
			break;
			case 'hull':
			break;
			case 'fuelCell':
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
			break;
			case 'engine':
			break;
			case 'warpDrive':
			break;
			case 'weapon':
				// Bullets
				this.drawBullets();
			break;
		}

		if(Firestorm.DEBUG)
		{
			Firestorm.context.beginPath();
				Firestorm.context.moveTo(this.position.x, this.position.y);
				Firestorm.context.lineTo(this.position.x + this.width, this.position.y);
				Firestorm.context.lineTo(this.position.x + this.width, this.position.y + this.height);
				Firestorm.context.lineTo(this.position.x, this.position.y + this.height);
				Firestorm.context.lineTo(this.position.x, this.position.y);
				Firestorm.strokeStyle = '#FF0000';
				Firestorm.lineWidth = 2;
				Firestorm.context.stroke();
			Firestorm.context.closePath();
		}
	}

// Functions
	this.setSprite = function(index)
	{
		this.setImage(this.anim.frames[index]);
	}

	this.typeSetup = function()
	{
		switch(this.type)
		{
			case 'command':
				this.stat_mass = 2;
				this.stat_acceleration = 1;
			break;
			case 'commandWide':
				this.stat_mass = 4;
				this.stat_acceleration = 2;
			break;
			case 'hull':
				this.stat_mass = 6;
			break;
			case 'fuelCell':
				this.stat_mass = 2;
			break;
			case 'capacitor':
				this.stat_mass = 1;
			break;
			case 'cargoHold':
				this.stat_mass = 2;
			break;
			case 'shipHangar':
				this.stat_mass = 2;
			break;
			case 'signalJammer':
				this.stat_mass = 1;
			break;
			case 'miningLaser':
				this.stat_mass = 2;
			break;
			case 'cloakingDevice':
				this.stat_mass = 1;
			break;
			case 'bridge':
				this.stat_mass = 2;
			break;
			case 'bridgeWide':
				this.stat_mass = 4;
			break;
			case 'shieldGenerator':
				this.stat_mass = 2;
			break;
			case 'scanner':
				this.stat_mass = 1;
			break;
			case 'tractorBeam':
				this.stat_mass = 2;
			break;
			case 'droneBay':
				this.stat_mass = 2;
			break;
			case 'thruster':
				this.stat_mass = 2;
				this.stat_acceleration = 4;
			break;
			case 'engine':
				this.stat_mass = 2;
			break;
			case 'warpDrive':
				this.stat_mass = 2;
			break;
			case 'weapon':
				this.stat_mass = 2;
				this.canFire = options.canFire || true;
				this.fireRate = options.fireRate || 5;
				this.bullets = [];
				this.shoot = function()
				{
					if(this.canFire)
					{
						this.canFire = false;
						var self = this;
						setTimeout(function(){self.canFire = true}, 1000 / this.fireRate);
						this.fire();
					}
				}

				this.fire = function()
				{
					var vel_x = this.direction.x * 800 + this.velocity.x;
					var vel_y = this.direction.y * 800 + this.velocity.y;
	
					this.bullets.push(new Bullet({	damage: 1, image: "img/weapons/Player_Bullet.png", anchor: "center",
													x: (this.position.x + 4),
													y: (this.position.y + 4),
													angle: this.angle,
													rotate: this.rotatePoint,
													velocity: Vec2.radiansToDegrees(Math.atan2(vel_y, vel_x) + Math.PI / 2),
													speed: Vec2.magnitude(vel_x, vel_y)
												}));
				}

				this.drawBullets = function()
				{
					for(var i = 0; i < this.bullets.length; i++)
					{
						this.bullets[i].draw();
					}
				}
			break;
		}
	}

}
Ship_Component.prototype = Entity.prototype;