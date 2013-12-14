// Scenes
document.write('<script src="scenes/BaseScene.js"></script>');
document.write('<script src="scenes/BMSSplash.js"></script>');
document.write('<script src="scenes/FirestormSplash.js"></script>');
document.write('<script src="scenes/MainMenu.js"></script>');
document.write('<script src="scenes/GameScene.js"></script>');

// Objects
document.write('<script src="js/objects/Bullet.js"></script>');
document.write('<script src="js/objects/Enemy.js"></script>');
document.write('<script src="js/objects/ParticleFX.js"></script>');
document.write('<script src="js/objects/Player.js"></script>');
document.write('<script src="js/objects/Ship_Component.js"></script>');
document.write('<script src="js/objects/World.js"></script>');

// Menus
document.write('<script src="js/objects/menus/InventoryMenu.js"></script>');

function Start()
{
	Firestorm.initialize({width: 800, height: 600});
// UI
	Firestorm.assetManager.add("img/ui/cons_grid_tile.png");

// Backgrounds
	// Splash screens
	Firestorm.assetManager.add("img/backgrounds/Splash/SplashScreen.png");
	Firestorm.assetManager.add("img/backgrounds/Splash/Firestorm.png");

	// Scenes
	Firestorm.assetManager.add("img/backgrounds/Scenes/BG_001.png");

// Stars
	for(var a = 1; a <= 8; a++)
	{
		Firestorm.assetManager.add("img/backgrounds/Stars/star_anim_00" + a + ".png");
	}

	for(var b = 1; b <= 11; b++)
	{
		if(b < 10)
		{
			Firestorm.assetManager.add("img/backgrounds/Stars/Star_Blue_00" + b + ".png");
			Firestorm.assetManager.add("img/backgrounds/Stars/Star_Red_00" + b + ".png");
			Firestorm.assetManager.add("img/backgrounds/Stars/Star_White_00" + b + ".png");
			Firestorm.assetManager.add("img/backgrounds/Stars/Star_Yellow_00" + b + ".png");
		}
		else
		{
			Firestorm.assetManager.add("img/backgrounds/Stars/Star_Blue_0" + b + ".png");
			Firestorm.assetManager.add("img/backgrounds/Stars/Star_Red_0" + b + ".png");
			Firestorm.assetManager.add("img/backgrounds/Stars/Star_White_0" + b + ".png");
			Firestorm.assetManager.add("img/backgrounds/Stars/Star_Yellow_0" + b + ".png");
		}
	}

// Ships
	// Parts
	for(var c = 1; c <= 3; c++)
	{
		Firestorm.assetManager.add("img/ships/Bridge_0" + c + ".png");
	}
	
	for(var d = 1; d <= 3; d++)
	{
		Firestorm.assetManager.add("img/ships/BridgeWide_0" + d + ".png");
	}
	
	for(var e = 1; e <= 1; e++)
	{
		Firestorm.assetManager.add("img/ships/Cargo_0" + e + ".png");
	}
	
	for(var f = 1; f <= 2; f++)
	{
		Firestorm.assetManager.add("img/ships/Command_0" + f + ".png");
	}
	
	for(var g = 1; g <= 2; g++)
	{
		Firestorm.assetManager.add("img/ships/FuelCell_0" + g + ".png");
	}
	
	for(var h = 1; h <= 1; h++)
	{
		Firestorm.assetManager.add("img/ships/Hull_0" + h + ".png");
	}

	for(var j = 1; j <= 5; j++)
	{
		Firestorm.assetManager.add("img/ships/Thruster_0" + j + ".png");
	}

	for(var k = 1; k <= 5; k++)
	{
		Firestorm.assetManager.add("img/ships/Weapon_0" + k + ".png");
	}


// Particles
	Firestorm.assetManager.add("img/particles/Fire.png");
	Firestorm.assetManager.add("img/particles/Smoke.png");
	Firestorm.assetManager.add("img/particles/Beam_Red.png");
	Firestorm.assetManager.add("img/particles/Beam_Green.png");
	Firestorm.assetManager.add("img/particles/Beam_Blue.png");
	Firestorm.assetManager.add("img/particles/Spark_Red.png");
	Firestorm.assetManager.add("img/particles/Spark_Green.png");
	Firestorm.assetManager.add("img/particles/Spark_Blue.png");

// Weapons
	Firestorm.assetManager.add("img/weapons/Player_Bullet.png");
	Firestorm.assetManager.add("img/weapons/Enemy_Bullet.png");

// Props
	Firestorm.assetManager.add("img/props/Nebula_001.png");

	Firestorm.run(BMSSplash);
}