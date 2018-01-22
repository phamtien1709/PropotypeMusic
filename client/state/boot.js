var bootState = {
	preload: function () {
		KT.game.scale.pageAlignHorizontally = true;
		KT.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		KT.game.time.advancedTiming = true;
		// Load the image
	},
	create: function () {
		// Set some game settings

		// Start the load state
		KT.game.state.start('load');
	}
};