// Initialise Phaser
var width;
if(screen.width>478){
    width = 478;
}else{
    width = screen.width
}
var KT = {};
// configs
// Define our 'global' variable
KT.configs = {
    GAME_WIDTH: width,
    GAME_HEIGHT: screen.height,
    GAME_TIME_TO_OVERLAP: 180,
    DISTANCE_GENERATE_LARGE: 115,
    DISTANCE_GENERATE_MEDIUM: 40,
    DISTANCE_GENERATE_SMALL: 10,
    TIMEOUT : false,
    HEIGHT_TOOL: 150
};
window.onload = function () {
    KT.game = new Phaser.Game(KT.configs.GAME_WIDTH, KT.configs.GAME_HEIGHT, Phaser.CANVAS, '', null, false, false);
    // Add all the states
    KT.game.state.add('boot', bootState);
    KT.game.state.add('load', loadState);
    KT.game.state.add('menu', menuState);
    KT.game.state.add('play', playState);
    KT.game.state.add('test', testState);
    // Start the 'boot' state
    KT.game.state.start('boot');
}
// preparations before game starts
var preload = function () {
    KT.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    KT.game.scale.minWidth = KT.configs.GAME_WIDTH / 2;
    KT.game.scale.minHeight = KT.configs.GAME_HEIGHT / 2;
    KT.game.scale.maxWidth = KT.configs.GAME_WIDTH;
    KT.game.scale.maxHeight = KT.configs.GAME_HEIGHT;
    KT.game.scale.pageAlignHorizontally = true;
    KT.game.time.advancedTiming = true;
    KT.game.stage.disableVisibilityChange = true;
}
