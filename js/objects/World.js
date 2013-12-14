var World = (function(World)
{
// Initialization
	World.init = function()
	{
	// Menus
		InventoryMenu.init();

		World.pause = false;
		World.inventoryMenu = false;

		Firestorm.input.preventDefaultKeys(['f1', 'f2', 'f3', 'f4', 'w', 'a', 's', 'd', 'space', 'up', 'down', 'left', 'right']);
	// Camera
		World.camera = new Camera();

	// Props
		World.cloud = new Entity({x: 50, y: 50, image: "img/props/Nebula_001.png", blendMode: 'overlay'});

	// Create parallax manager
		World.parallax = new Parallax();
		World.stars = new Parallax();

		World.BG_Red	= 0;
		World.BG_Green	= 12;
		World.BG_Blue	= 2;

	// Initialize background and add to parallax manager
		World.background = new Background({image: "img/backgrounds/Scenes/BG_001.png", x: 0, y: 0, blendMode: 'multiply', depth: -5000, alpha: 1});
		World.background2 = new Background({image: "img/backgrounds/Scenes/BG_001.png", x: 0, y: 0, blendMode: 'color-dodge', depth: -5000, alpha: 1});

		World.parallax.add(World.background);
		World.parallax.add(World.background2);

		World.starCount = 1000;

		for(var i = 0; i < World.starCount; i++)
		{
			var rand_x = Firestorm.utility.getRandomInt(0, Firestorm.canvas.width);
			var rand_y = Firestorm.utility.getRandomInt(0, Firestorm.canvas.height);
			var rand_z = Firestorm.utility.getRandomInt(-10000, -6000);

			var isAnimated = Firestorm.utility.getRandomInt(0, 50);

			if(!isAnimated)
			{
				var type = Firestorm.utility.getRandomInt(1, 8);
				var star;
				switch(type)
				{
					case 1:case 2: case 3: case 4:
						var starAnim = new Animation({sprite_sheet: "img/backgrounds/Stars/star_anim_00" + type + ".png", frame_size: [9, 9]});
						star = new Background({image: "img/backgrounds/Stars/star_anim_00" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1, animation: starAnim});
					break;
					case 5: case 6: case 7: case 8:
						var starAnim = new Animation({sprite_sheet: "img/backgrounds/Stars/star_anim_00" + type + ".png", frame_size: [1, 1]});
						star = new Background({image: "img/backgrounds/Stars/star_anim_00" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1, animation: starAnim});
					break;
				}
			}
			else
			{
				var type = Firestorm.utility.getRandomInt(1, 11);
				var color = Firestorm.utility.getRandomInt(0, 4);
				var star;
				switch(color)
				{
					case 0:
						if(type < 10)
							star = new Background({image: "img/backgrounds/Stars/Star_Blue_00" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1});
						else
							star = new Background({image: "img/backgrounds/Stars/Star_Blue_0" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1});
					break;
					case 1:
						if(type < 10)
							star = new Background({image: "img/backgrounds/Stars/Star_Red_00" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1});
						else
							star = new Background({image: "img/backgrounds/Stars/Star_Red_0" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1});
					break;
					case 2:
						if(type < 10)
							star = new Background({image: "img/backgrounds/Stars/Star_Yellow_00" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1});
						else
							star = new Background({image: "img/backgrounds/Stars/Star_Yellow_0" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1});
					break;
					case 3:
						if(type < 10)
							star = new Background({image: "img/backgrounds/Stars/Star_White_00" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1});
						else
							star = new Background({image: "img/backgrounds/Stars/Star_White_0" + type + ".png", x: rand_x, y: rand_y, depth: rand_z, alpha: 1});
					break;
					default:
					break;
				}
			}

			if(star == undefined)
				console.warn('Attempted to create a star: ' + star);
			else
				World.stars.add(star);
		}

	// Player
		this.player = new Player({	x: Firestorm.canvas.width / 2,
									y: Firestorm.canvas.height / 2,
									anchor: "center"
								});
		this.player.init();
		console.log(GetShipCentroid(this.player));
	// Enemies
		this.enemies = [];
		for(var i = 0; i < 15; i++)
		{
			var x = Firestorm.utility.getRandomInt(100, Firestorm.canvas.width - 100);
			var y = Firestorm.utility.getRandomInt(100, Firestorm.canvas.height - 100);
			var vel_x = Firestorm.utility.getRandomInt(-50, 50);
			var vel_y = Firestorm.utility.getRandomInt(-50, 50);

			var enemy = new Enemy({	x: x, y: y,
									vel_x: vel_x, vel_y: vel_y,
									anchor: "center"
								});
			enemy.init();
			this.enemies.push(enemy);
		}
	}

// Update
	World.update = function()
	{
		if(Firestorm.input.pressed("i"))
		{
			World.pause = !World.pause;
			World.inventoryMenu = !World.inventoryMenu;
		}

		if(!World.pause)
		{
			if(Firestorm.input.held("f1"))
			{
				World.BG_Red	= Firestorm.utility.Lerp(World.BG_Red, 16, Firestorm.clock.getDelta());
				World.BG_Green	= Firestorm.utility.Lerp(World.BG_Green, 16, Firestorm.clock.getDelta());
				World.BG_Blue	= Firestorm.utility.Lerp(World.BG_Blue, 0, Firestorm.clock.getDelta());
			}
			if(Firestorm.input.held("f2"))
			{
				World.BG_Red	= Firestorm.utility.Lerp(World.BG_Red, 0, Firestorm.clock.getDelta());
				World.BG_Green	= Firestorm.utility.Lerp(World.BG_Green, 12, Firestorm.clock.getDelta());
				World.BG_Blue	= Firestorm.utility.Lerp(World.BG_Blue, 2, Firestorm.clock.getDelta());
			}
			if(Firestorm.input.held("f3"))
			{
				World.BG_Red	= Firestorm.utility.Lerp(World.BG_Red, 16, Firestorm.clock.getDelta());
				World.BG_Green	= Firestorm.utility.Lerp(World.BG_Green, 4, Firestorm.clock.getDelta());
				World.BG_Blue	= Firestorm.utility.Lerp(World.BG_Blue, 6, Firestorm.clock.getDelta());
			}
			if(Firestorm.input.held("f4"))
			{
				World.BG_Red	= Firestorm.utility.Lerp(World.BG_Red, 0, Firestorm.clock.getDelta());
				World.BG_Green	= Firestorm.utility.Lerp(World.BG_Green, 16, Firestorm.clock.getDelta());
				World.BG_Blue	= Firestorm.utility.Lerp(World.BG_Blue, 18, Firestorm.clock.getDelta());
			}

			// Parallax backgrounds
			World.parallax.updateVelocity(this.player.velocity.multScalar(-1));
			World.parallax.update();

			World.stars.updateVelocity(this.player.velocity.multScalar(-1));
			World.stars.update();

			// Move camera
			var zoom = ((Firestorm.input.getWheel() + 3) / 3) - 1;
			World.camera.zoom(zoom);
			World.camera.update(this.player.position, this.player.velocity);

			// Player
			this.player.update();

			// Enemy
			for(var i = 0; i < this.enemies.length; i++)
			{
				this.enemies[i].update();
			}
		}
		else if(World.inventoryMenu)
		{
			InventoryMenu.update();
		}
	}

// Draw
	World.draw = function()
	{
	// Parallax backgrounds
		World.parallax.draw();
		
	// Stars
		World.stars.draw();

		Firestorm.context.save();
		// Camera
			World.camera.draw();

		// Clouds
			World.cloud.draw();

		// Player
			this.player.draw();

		// Enemy
			for(var i = 0; i < this.enemies.length; i++)
			{
				this.enemies[i].draw();
			}
		Firestorm.context.restore();

	// Inventory
		if(World.inventoryMenu)
		{
			InventoryMenu.draw();
		}
	}

	return World;
})
(World || {});