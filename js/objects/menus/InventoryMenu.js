var InventoryMenu = (function(InventoryMenu)
{
	this.tile;

	InventoryMenu.init = function()
	{
		this.tile = new Entity({x: 0, y: 0, image: "img/ui/cons_grid_tile.png"});
	}

	InventoryMenu.update = function()
	{

	}

	InventoryMenu.draw = function()
	{
		Firestorm.context.beginPath();
		// Dark overlay
			Firestorm.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
			Firestorm.context.fillRect(0, 0, Firestorm.width, Firestorm.height);
			var padX = Firestorm.width * 0.05;
			var padY = Firestorm.height * 0.05;

		// Component Area
			var compX = padX;
			var compY = padY;
			var compW = Firestorm.width * 0.28;
			var compH = Firestorm.height * 0.90;

			var comp = "rgba(12, 0, 0, 0.5)";
			
			Firestorm.context.fillStyle = comp;
			Firestorm.context.fillRect(compX, compY, compW, compH);

			Firestorm.context.strokeStyle = "rgba(255, 255, 255, 0.75)";
			Firestorm.context.lineWidth = 2;
				Firestorm.context.moveTo(compX, compY);
				Firestorm.context.lineTo(compX + compW, compY);
				Firestorm.context.lineTo(compX + compW, compY + compH);
				Firestorm.context.lineTo(compX, compY + compH);
				Firestorm.context.lineTo(compX, compY);
			Firestorm.context.stroke();

		// Construction Area
			var consX = compX + compW + padX;
			var consY = padY;
			var consW = Firestorm.width * 0.57;
			var consH = Firestorm.height * 0.90;

			var cons = "rgba(12, 0, 0, 0.5)";
			
			Firestorm.context.fillStyle = cons;
			Firestorm.context.fillRect(consX, consY, consW, consH);

				Firestorm.context.moveTo(consX, consY);
				Firestorm.context.lineTo(consX + consW, consY);
				Firestorm.context.lineTo(consX + consW, consY + consH);
				Firestorm.context.lineTo(consX, consY + consH);
				Firestorm.context.lineTo(consX, consY);
			Firestorm.context.stroke();

		// Grid
			var centerX = consX + consW * 0.5;
			var centerY = consY + consH * 0.5;
			var startX = centerX - (World.player.shipSize * 16) * 0.5;
			var startY = centerY - (World.player.shipSize * 16) * 0.5;

			for(var i = 0; i < World.player.shipSize; i++)
			{
				for(var j = 0; j < World.player.shipSize; j++)
				{
					var x = (i * 16) + startX;
					var y = (j * 16) + startY;
					this.tile.position.x = x;
					this.tile.position.y = y;
					this.tile.draw();
				}
			}

		Firestorm.context.closePath();
	}
	return InventoryMenu;
})
(InventoryMenu || {});