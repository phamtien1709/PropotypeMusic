var menuState = {
	preload: function () {
		// KT.game.load.bitmapFont('pixelFont', 'assets/pixel.png', 'assets/pixel.xml');
	},
	create: function () {
		// Add a background image
		// console.log(KT.EDMAll);
		// console.log(KT.EDMNotesGreen);
		// console.log(KT.EDMNotesOrange);
		// console.log(KT.EDMNotesViolet);
		KT.bg = KT.game.add.sprite(0, 0, 'bg');
		KT.bg_under = KT.game.add.sprite(0, KT.game.height, 'bg_under');
		KT.bg_under.anchor.set(0, 1);
		KT.idCreated = 0;
		KT.previousName = 0;
		KT.styleMenu = {
			font: "20px pixelFont",
			fill: "white",
			boundsAlignH: "center",
			boundsAlignV: "middle"
		};
		KT.greenNotes = [];
		KT.orangeNotes = [];
		KT.violetNotes = [];
		//btn check option
		//EDM
		var btn_uncheckEDM = KT.game.add.button(KT.game.world.centerX - 100, KT.game.world.centerY - 100, 'btn_uncheck');
		btn_uncheckEDM.anchor.set(0.5);
		var btn_checkEDM = KT.game.add.button(KT.game.world.centerX - 100, KT.game.world.centerY - 100, 'btn_check');
		btn_checkEDM.anchor.set(0.5);
		btn_checkEDM.scale.set(0);
		var txt_checkEDM = KT.game.add.bitmapText(KT.game.world.centerX - 125, KT.game.world.centerY - 75, 'pixelFont', 'EDM');
		txt_checkEDM.tint = 0x223344;
		//Piano
		var btn_uncheckPiano = KT.game.add.button(KT.game.world.centerX, KT.game.world.centerY - 100, 'btn_uncheck');
		btn_uncheckPiano.anchor.set(0.5);
		var btn_checkPiano = KT.game.add.button(KT.game.world.centerX, KT.game.world.centerY - 100, 'btn_check');
		btn_checkPiano.anchor.set(0.5);
		btn_checkPiano.scale.set(0);
		var txt_checkPiano = KT.game.add.bitmapText(KT.game.world.centerX - 40, KT.game.world.centerY - 75,'pixelFont', 'PIANO');
		//Violin
		var btn_uncheckViolin = KT.game.add.button(KT.game.world.centerX + 100, KT.game.world.centerY - 100, 'btn_uncheck');
		btn_uncheckViolin.anchor.set(0.5);
		var btn_checkViolin = KT.game.add.button(KT.game.world.centerX + 100, KT.game.world.centerY - 100, 'btn_check');
		btn_checkViolin.anchor.set(0.5);
		btn_checkViolin.scale.set(0);
		var txt_checkViolin = KT.game.add.bitmapText(KT.game.world.centerX + 75, KT.game.world.centerY - 75,'pixelFont', 'P&V');
		txt_checkViolin.tint = 0xffbf80;
		KT.ready = false;
		btn_uncheckEDM.events.onInputDown.add(() => {
			btn_checkEDM.scale.set(1);
			btn_uncheckPiano.kill();
			btn_uncheckViolin.kill();
			txt_checkPiano.kill();
			txt_checkViolin.kill();
			KT.greenNotes = KT.EDMNotesGreen;
			KT.orangeNotes = KT.EDMNotesOrange;
			KT.violetNotes = KT.EDMNotesViolet;
			KT.song = KT.game.add.audio('EDM');
			KT.nameOfSong = 'EDM';
			// console.log(KT.greenNotes);
			KT.NOTEAll = KT.greenNotes.concat(KT.orangeNotes, KT.violetNotes);
			KT.NOTEAll.sort(function (a, b) { return a - b });
			KT.ready = true;
		});
		btn_uncheckPiano.events.onInputDown.add(() => {
			btn_checkPiano.scale.set(1);
			btn_uncheckEDM.kill();
			btn_uncheckViolin.kill();
			txt_checkEDM.kill();
			txt_checkViolin.kill();
			KT.greenNotes = KT.pianoNotesFrame;
			KT.orangeNotes = [];
			KT.violetNotes = [];
			KT.song = KT.game.add.audio('Piano');
			KT.nameOfSong = 'Piano';
			// console.log(KT.greenNotes);
			KT.NOTEAll = KT.greenNotes.concat(KT.orangeNotes, KT.violetNotes);
			KT.NOTEAll.sort(function (a, b) { return a - b });
			KT.ready = true;
		});
		btn_uncheckViolin.events.onInputDown.add(() => {
			btn_checkViolin.scale.set(1);
			btn_uncheckEDM.kill();
			btn_uncheckPiano.kill();
			txt_checkEDM.kill();
			txt_checkPiano.kill();
			KT.greenNotes = KT.violinNotesGreen;
			KT.orangeNotes = KT.violinNotesOrange;
			KT.violetNotes = KT.violinNotesViolet;
			KT.song = KT.game.add.audio('Violin');
			KT.nameOfSong = 'Violin';
			// console.log(KT.greenNotes);
			KT.NOTEAll = KT.greenNotes.concat(KT.orangeNotes, KT.violetNotes);
			KT.NOTEAll.sort(function (a, b) { return a - b });
			KT.ready = true;
		});
		btn_checkEDM.events.onInputDown.add(()=>{
			btn_checkEDM.scale.set(0);
			btn_uncheckPiano.revive();
			btn_uncheckViolin.revive();
			txt_checkPiano.revive();
			txt_checkViolin.revive();
			KT.greenNotes = [];
			KT.orangeNotes = [];
			KT.violetNotes = [];
			KT.song = 0;
			// console.log(KT.greenNotes);
			KT.NOTEAll = [];
			KT.ready = false;
		});
		btn_checkPiano.events.onInputDown.add(()=>{
			btn_checkPiano.scale.set(0);
			btn_uncheckEDM.revive();
			btn_uncheckViolin.revive();
			txt_checkEDM.revive();
			txt_checkViolin.revive();
			KT.greenNotes = [];
			KT.orangeNotes = [];
			KT.violetNotes = [];
			KT.song = 0;
			// console.log(KT.greenNotes);
			KT.NOTEAll = [];
			KT.ready = false;
		});
		btn_checkViolin.events.onInputDown.add(()=>{
			btn_checkViolin.scale.set(0);
			btn_uncheckEDM.revive();
			btn_uncheckPiano.revive();
			txt_checkEDM.revive();
			txt_checkPiano.revive();
			KT.greenNotes = [];
			KT.orangeNotes = [];
			KT.violetNotes = [];
			KT.song = 0;
			// console.log(KT.greenNotes);
			KT.NOTEAll = [];
			KT.ready = false;
		});


		// Display the name of the game
		var btn_test = KT.game.add.button(KT.game.world.centerX, KT.game.world.centerY, 'btn_touched');
		btn_test.anchor.set(0.5);
		// Explain how to start the game
		btn_test.events.onInputDown.add(() => {
			if(KT.ready){
				KT.game.state.start('test');
			}
			else{
				alert('Please choose Category Of Music!')
			}
		});
		// Create a new Phaser keyboard variable: the up arrow key
		KT.timeDuration = 3900;
		KT.rhynthm = 0;
		KT.speedDot = 0;
		// When the 'upKey' is pressed, it will call the 'start' function once
	},
	update: function () {

	},
	start: function () {
		// Start the actual game
		KT.game.state.start('play');
		document.getElementById("mySelect").style.display = 'none';
	}
};
