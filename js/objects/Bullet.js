function Bullet(options)
{
	this.position = new Vec2({x: options.x, y: options.y});
	this.velocity = options.velocity * Math.PI / 180;
	this.speed = options.speed;
	this.damage = options.damage || 1;
	this.rotatePoint = options.rotate;
	this.age = 1000;
	this.destroy = false;
	
	Entity.call(this, options);

	var anim = new Animation({sprite_sheet: options.image, frame_size: [8, 16], frame_duration: 75});
	this.anim_default = anim.slice(0, 11);
	this.setImage(this.anim_default.next());

	this.update = function()
	{
		this.position.x += Math.sin(this.velocity) * (this.speed * Firestorm.clock.getDelta());
		this.position.y += -Math.cos(this.velocity) * (this.speed * Firestorm.clock.getDelta());
		this.setImage(this.anim_default.next());
		this.age--;
		if(this.age <= 0)
		{
			this.destroy = true;
		}
	}

	this.kill = function()
	{
		//scorch.particleEmitters.push(new scorch.Emitter({x: this.position.x, y: this.position.y, vx: 0, vy: 0, frequency: 2, age: 18, fx: particleFX.spark_green}));
	}

	this.draw = function()
	{
		Entity.prototype.draw.call(this);
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
}
Bullet.prototype = Entity.prototype;