var playState = {
	preload: function () {
	},
	create: function () {
		KT.game.physics.startSystem(Phaser.Physics.ARCADE);
		KT.bg = KT.game.add.sprite(0, 0, 'bg');
		var line = KT.game.add.sprite(KT.game.world.centerX, KT.configs.HEIGHT_TOOL, 'line');
		line.anchor.set(0.5);
		KT.keyboard = KT.game.input.keyboard;
		//variable
		KT.btnGroup = KT.game.add.physicsGroup();
		KT.btn = new ButtonController(KT.game.world.centerX, KT.configs.HEIGHT_TOOL, {
			left: Phaser.Keyboard.LEFT,
			right: Phaser.Keyboard.RIGHT,
			generateDot: Phaser.Keyboard.SPACEBAR
		});
		KT.pointGroup = KT.game.add.physicsGroup();
		KT.points = [];
		KT.timeToEnd = 0;
		KT.frame = 0;
		KT.checkInput = false;
		KT.songMake = KT.game.add.audio('music');
		KT.idCreated = 0;
		//play state test
		KT.generatePlay = KT.game.add.button(KT.game.world.width - 50, 100, 'btn_touch');
		KT.generatePlay.anchor.set(0.5);
		KT.generatePlay.kill();
		KT.txtPlayTest = KT.game.add.text(KT.game.world.width - 50, 170, 'Test Play');
		KT.txtPlayTest.anchor.set(0.5);
		KT.txtPlayTest.kill();
		KT.btn_reset = KT.game.add.button(KT.game.world.width - 50, 150, 'btn');
		KT.btn_reset.anchor.set(0.5);
		KT.txt_reset = KT.game.add.text(KT.game.world.width - 50, 195, 'Reset');
		KT.txt_reset.anchor.set(0.5);
		KT.btn_save = KT.game.add.button(KT.game.world.width - 50, 250, 'btn');
		KT.btn_save.anchor.set(0.5);
		KT.txt_save = KT.game.add.text(KT.game.world.width - 50, 295, 'Save');
		KT.txt_save.anchor.set(0.5);
		KT.btn_save.kill();
		KT.txt_save.kill();
		//timer
		var minutes;
		if ((KT.timeDuration % 3600) / 3600 >= 0.5) {
			minutes = Math.round(KT.timeDuration / 3600) - 1;
		}
		else {
			minutes = Math.round(KT.timeDuration / 3600);
		}
		var seconds = (KT.timeDuration % 3600) / 60;
		KT.timeout = KT.game.time.create();
		KT.timeoutCountDown = KT.timeout.add(Phaser.Timer.MINUTE * minutes + Phaser.Timer.SECOND * seconds, this.timeout, this);
		KT.timeout.start();
		KT.songMake.play();
		KT.generatePlay.events.onInputDown.add(() => {
			KT.game.state.start('menu');
			var select = document.getElementById("mySelect");
			var length = select.options.length;
			for (i = 0; i < length; i++) {
				select.remove(i);
			}
			document.getElementById("mySelect").style.display = '';
		})
		KT.btn_reset.events.onInputDown.add(() => {
			KT.songMake.stop();
			KT.game.state.start('play');
		});
		KT.btn_save.events.onInputDown.add(() => {
			var prmtName = prompt("Type your Song's name:", "Good music");
			var REC = {
				name: prmtName,
				timeOfSong: KT.timeDuration,
				rhynthm: KT.rhynthm,
				speedDot: KT.speedDot,
				record: []
			};
			for (point in KT.points) {
				var record = {};
				record.timeDrop = KT.points[point].configs.time;
				record.x = KT.points[point].sprite.position.x;
				REC.record.push(record);
			}
			KT.previousName = prmtName;
			$.ajax({
				url: "https://api.mlab.com/api/1/databases/musictype/collections/Records?apiKey=9ZHuLpUl39GPPuRCljevNgJj51u5mOzP",
				data: JSON.stringify({ REC }),
				type: "POST",
				contentType: "application/json",
				success: function (data) {
					KT.generatePlay.revive();
					KT.txtPlayTest.revive();
					KT.btn_save.kill();
					KT.btn_reset.kill();
					KT.txt_reset.kill();
					KT.txt_save.kill();
					KT.idCreated = data._id.$oid;
				}
			});
		})
	},
	update: function () {
		KT.frame += 1;
	},
	render: function () {
		if (KT.timeout.running) {
			KT.game.debug.text(this.formatTime(Math.round((KT.timeoutCountDown.delay - KT.timeout.ms) / 1000)), 10, 20, "#fff");
		} else {
			KT.game.debug.text("Hết giờ!", 10, 20, "#fff");
		}
	},
	timeout: function () {
		KT.timeout.stop();
		KT.btn_save.revive();
		KT.txt_save.revive();
		KT.songMake.stop();
		KT.configs.TIMEOUT = true;
		//post data
	},
	formatTime: function (s) {
		var minutes = "0" + Math.floor(s / 60);
		var seconds = "0" + (s - minutes * 60);
		return minutes.substr(-2) + ":" + seconds.substr(-2);
	}
}