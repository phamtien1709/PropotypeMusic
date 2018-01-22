// import { setInterval } from "timers";

var testState = {
    preload: function () {
        // KT.game.load.audio('music', 'assets/Music/DemoHalleujah.mp3');
    },
    create: function () {
        // console.log(KT.idCreated);
        KT.checkData = false;
        KT.timeoutPlay = KT.game.time.create();
        KT.game.physics.startSystem(Phaser.Physics.ARCADE);
        KT.bg = KT.game.add.sprite(0, 0, 'bg');
        KT.bg_under = KT.game.add.sprite(0, KT.game.height, 'bg_under');
        KT.bg_under.anchor.set(0, 1);
        var line = KT.game.add.sprite(KT.game.world.centerX, KT.game.height - KT.configs.HEIGHT_TOOL - 16.05, 'line');
        line.anchor.set(0.5);
        KT.barGroup = KT.game.add.physicsGroup();
        KT.checkInputTest = false;
        KT.score = 0;
        KT.posGenPrevious = KT.game.width / 2;
        KT.inWorld = false;
        KT.pianoGroup = KT.game.add.physicsGroup();
        KT.pianoList = [];
        KT.groupOverlap = KT.game.add.group();
        KT.getPianoFirst = 0;
        KT.effectGroup = KT.game.add.physicsGroup();
        KT.effectList = [];
        KT.effectList2 = [];
        KT.effectList3 = [];
        KT.effectOnTime = 0;
        KT.timeFirst = false;
        KT.checkPlay = false;
        KT.style = {
            font: "20px pixelFont",
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        KT.style2 = {
            font: "32px pixelFont",
            fill: "white",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        KT.style3 = {
            font: "15px pixelFont",
            fill: "#fffb1c",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        KT.style4 = {
            font: "25px Arial",
            fill: "#2bffdf",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        KT.replayButton = KT.game.add.button(KT.game.width - 70, 100, 'btn_touch');
        KT.replayButton.anchor.set(0.5);
        KT.txtReplay = KT.game.add.bitmapText(KT.game.width - 70, 150, 'pixelFont', 'REPLAY');
        KT.txtReplay.anchor.set(0.5);
        KT.replayButton.kill();
        KT.txtReplay.kill();
        KT.endGame = false;
        KT.winText = KT.game.add.bitmapText(KT.game.world.centerX, KT.game.world.centerY, 'pixelFont', "CONGRATULATION! \n Score: " + KT.score);
        KT.winText.anchor.set(0.5);
        KT.winText.kill();
        KT.perPer = KT.game.add.bitmapText(KT.game.world.centerX, KT.game.world.centerY + 50, 'pixelFont', `PERFECT Ratio:  `, 25);
        KT.perPer.tint = 0x1affff;
        KT.perPer.anchor.set(0.5);
        KT.displayingText = KT.game.add.bitmapText(KT.game.width - 70, 40, 'pixelFont', KT.score, 25);
        KT.displayingText.anchor.set(0.5);
        KT.txtLet = KT.game.add.bitmapText(KT.game.world.centerX, KT.game.world.centerY, 'pixelFont', "LET'S START", 25);
        KT.txtLet.anchor.set(0.5);
        KT.txtLet.kill();
        KT.txtPer = KT.game.add.bitmapText(KT.game.width - 70, 70, 'pixelFont', "PERFECT");
        KT.txtPer.anchor.set(0.5);
        KT.txtPer.scale.set(0.6);
        KT.txtPer.tint = 0x2bffdf;
        KT.txtPer.kill();
        //green
        //EDM EDM EDM EDM EDM EDM EDM EDM EDM
        for (i in KT.NOTEAll) {
            if (i == 0) {
                if (KT.NOTEAll[i] == KT.greenNotes[0]) {
                    this.generateNote(KT.configs.DISTANCE_GENERATE_LARGE, 'piano', KT.NOTEAll[i], 'eff_mid', 'eff_lt', 'eff_rt');
                    KT.greenNotes.shift();
                }
                if (KT.NOTEAll[i] == KT.orangeNotes[0]) {
                    this.generateNote(KT.configs.DISTANCE_GENERATE_LARGE, 'orange', KT.NOTEAll[i], 'eff_midOrange', 'eff_ltOrange', 'eff_rtOrange');
                    KT.orangeNotes.shift();
                }
                if (KT.NOTEAll[i] == KT.violetNotes[0]) {
                    this.generateNote(KT.configs.DISTANCE_GENERATE_LARGE, 'violet', KT.NOTEAll[i], 'eff_midViolet', 'eff_ltViolet', 'eff_rtViolet');
                    KT.violetNotes.shift();
                }
            }
            if (i > 0) {
                //green
                if (KT.NOTEAll[i] - KT.NOTEAll[i - 1] > 0.1) {
                    if (KT.NOTEAll[i] == KT.greenNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_LARGE, 'piano', KT.NOTEAll[i], 'eff_mid', 'eff_lt', 'eff_rt');
                        KT.greenNotes.shift();
                    }
                    if (KT.NOTEAll[i] == KT.orangeNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_LARGE, 'orange', KT.NOTEAll[i], 'eff_midOrange', 'eff_ltOrange', 'eff_rtOrange');
                        KT.orangeNotes.shift();
                    }
                    if (KT.NOTEAll[i] == KT.violetNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_LARGE, 'violet', KT.NOTEAll[i], 'eff_midViolet', 'eff_ltViolet', 'eff_rtViolet');
                        KT.violetNotes.shift();
                    }
                }
                //orange
                if ((KT.NOTEAll[i] - KT.NOTEAll[i - 1] < 0.1) && (KT.NOTEAll[i] - KT.NOTEAll[i - 1] > 0.05)) {
                    if (KT.NOTEAll[i] == KT.greenNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_MEDIUM, 'piano', KT.NOTEAll[i], 'eff_mid', 'eff_lt', 'eff_rt');
                        KT.greenNotes.shift();
                    }
                    if (KT.NOTEAll[i] == KT.orangeNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_MEDIUM, 'orange', KT.NOTEAll[i], 'eff_midOrange', 'eff_ltOrange', 'eff_rtOrange');
                        KT.orangeNotes.shift();
                    }
                    if (KT.NOTEAll[i] == KT.violetNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_MEDIUM, 'violet', KT.NOTEAll[i], 'eff_midViolet', 'eff_ltViolet', 'eff_rtViolet');
                        KT.violetNotes.shift();
                    }
                }
                //violet
                if (KT.NOTEAll[i] - KT.NOTEAll[i - 1] <= 0.05) {
                    if (KT.NOTEAll[i] == KT.greenNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_SMALL, 'piano', KT.NOTEAll[i], 'eff_mid', 'eff_lt', 'eff_rt');
                        KT.greenNotes.shift();
                    }
                    if (KT.NOTEAll[i] == KT.orangeNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_SMALL, 'orange', KT.NOTEAll[i], 'eff_midOrange', 'eff_ltOrange', 'eff_rtOrange');
                        KT.orangeNotes.shift();
                    }
                    if (KT.NOTEAll[i] == KT.violetNotes[0]) {
                        this.generateNote(KT.configs.DISTANCE_GENERATE_SMALL, 'violet', KT.NOTEAll[i], 'eff_midViolet', 'eff_ltViolet', 'eff_rtViolet');
                        KT.violetNotes.shift();
                    }
                }
            }
        }
        KT.bar = new BarController(KT.game.world.centerX, KT.game.height - KT.configs.HEIGHT_TOOL);
        // KT.groupOverlap.add(KT.bar);
        KT.btn_play = KT.game.add.button(KT.game.world.centerX, KT.game.world.centerY, 'btn_touch');
        KT.btn_play.anchor.set(0.5);
        KT.btn_play.events.onInputDown.add(() => {
            var spriteGuide = KT.game.add.sprite(KT.game.world.centerX, KT.game.height - KT.configs.HEIGHT_TOOL - 50, 'holdhand');
            spriteGuide.anchor.set(0.5);
            spriteGuide.alpha = 0.6;
            spriteGuide.scale.set(0.7);
            var tweenGuide = KT.game.add.tween(spriteGuide.scale).to({ x: 1, y: 1 }, 700, "Linear", true, 0, -1);
            var hand = KT.game.add.sprite(KT.game.world.centerX - 150, KT.game.height - KT.configs.HEIGHT_TOOL + 15, 'hand');
            hand.anchor.set(0.5);
            hand.scale.set(0.4);
            hand.alpha = 0.6;
            var tweenHand = KT.game.add.tween(hand).to({ x: '+300' }, 1500, "Linear", true, 0, -1);
            tweenHand.yoyo(true, 1500);
            tweenGuide.yoyo(true, 700);
            KT.btn_play.destroy();
            var sprite3 = KT.game.add.sprite(KT.game.world.centerX, KT.game.world.centerY, '3');
            sprite3.anchor.set(0.5);
            var tween3 = KT.game.add.tween(sprite3.scale).to({ x: 0.5, y: 0.5 }, 1500, "Linear");
            tween3.start();
            tween3.onComplete.add(() => {
                sprite3.destroy();
                var sprite2 = KT.game.add.sprite(KT.game.world.centerX, KT.game.world.centerY, '2');
                sprite2.anchor.set(0.5);
                var tween2 = KT.game.add.tween(sprite2.scale).to({ x: 0.5, y: 0.5 }, 1500, "Linear");
                tween2.start();
                tween2.onComplete.add(() => {
                    sprite2.destroy();
                    var sprite1 = KT.game.add.sprite(KT.game.world.centerX, KT.game.world.centerY, '1');
                    sprite1.anchor.set(0.5);
                    var tween1 = KT.game.add.tween(sprite1.scale).to({ x: 0.5, y: 0.5 }, 1500, "Linear");
                    tween1.start();
                    tween1.onComplete.add(() => {
                        KT.txtLet.revive();
                        sprite1.destroy();
                        spriteGuide.destroy();
                        hand.destroy();
                        tweenGuide.stop();
                        tweenHand.stop();
                        this.playTest();
                        KT.timeFirst = true;

                        KT.soundAnalyseSprite = KT.soundAnalyse.add.soundAnalyseSprite(
                            -20/*x*/, KT.game.height - 120/*y*/, 530/*width*/, 250/*height*/, KT.nameOfSong/*sound key*/, false/*auto play*/, this._onDecodeFinish/*decode finish callback*/, this/*callback context*/);
                        KT.soundAnalyseSprite.play();
                        KT.soundAnalyseSprite.showFrequencyDomainChartUniform(true);
                        KT.song.play();
                    })
                })
            });

            // @TODO 

        });
        //bring to top
        // KT.game.world.bringToTop(KT.bar);
        KT.replayButton.events.onInputDown.add(() => {
            KT.game.state.start('load');
        });
        KT.soundAnalyse = KT.game.plugins.add(new Phaser.Plugin.SoundAnalyse(KT.game));
        // create new Sprite sound analyse object

        // // show frequency domain chart bars
    },
    update: function () {
        if (KT.timeFirst) {
            KT.checkPlay = true;
        };
        if (KT.checkPlay) {
            KT.frameTest += 1;
        };
        KT.game.physics.arcade.collide(
            KT.barGroup,
            KT.pianoGroup,
            this.onBarHitDot
        );

    },
    render: function () {
        if (KT.checkData) {
            KT.btn_play.revive();
        }
        KT.game.debug.body(KT.barGroup);
        KT.displayingText.setText(KT.score);
        if (KT.endGame) {
            KT.displayingText.setText("GAME OVER");
            KT.replayButton.revive();
            KT.txtReplay.revive();
            KT.timeoutPlay.stop();
            KT.song.stop();
            KT.soundAnalyseSprite.stop();
        }
        if (KT.timeoutPlay.running) {
            KT.game.debug.text(this.formatTime(Math.round((KT.timeoutPlayCountDown.delay - KT.timeoutPlay.ms) / 1000)), 10, 20, "#fff");
        } else {
            KT.game.debug.text("Hết giờ!", 10, 20, "#fff");
        }
        KT.game.debug.text(KT.game.time.fps || '--', 10, 35, "#00ff00");
    },
    playTest: function () {
        KT.frameTest = 0;
        var minutes;
        if ((KT.timeDuration % 3600) / 3600 >= 0.5) {
            minutes = Math.round(KT.timeDuration / 3600) - 1;
        }
        else {
            minutes = Math.round(KT.timeDuration / 3600);
        }
        var seconds = (KT.timeDuration % 3600) / 60;
        KT.timeoutPlayCountDown = KT.timeoutPlay.add(Phaser.Timer.MINUTE * minutes + Phaser.Timer.SECOND * seconds, this.timeoutPlay, this);
        KT.timeoutPlay.start();
    },
    timeoutPlay: function () {
        KT.timeoutPlay.stop();
        KT.song.stop();
        KT.soundAnalyseSprite.stop();
        KT.winText.revive();
        KT.winText.setText(`CONGRATULATION! \n Score: ${KT.score}`);
        KT.replayButton.revive();
        KT.txtReplay.revive();

    },
    formatTime: function (s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },
    onBarHitDot: function (barSprite, dotSprite) {
        // console.log(Math.abs(dotSprite.position.x-barSprite.position.x)/barSprite.width*100);
        if (Math.abs(dotSprite.position.x - barSprite.position.x) / barSprite.width * 100 < 13) {
            // KT.game.debug.text("Perfect", 200, 200);
            KT.txtLet.destroy();
            // KT.txtGood.destroy();
            KT.txtPer.revive();
            KT.txtPer.setText('PERFECT');
            var tween = KT.game.add.tween(KT.txtPer.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.None);
            tween.start();
            tween.onComplete.add(() => {
                var tweenBack = KT.game.add.tween(KT.txtPer.scale).to({ x: 0.4, y: 0.4 }, 400, Phaser.Easing.Linear.None);
                tweenBack.start();
                tweenBack.onComplete.add(() => {
                    KT.txtPer.kill();
                });
            });
            KT.score += 2;
            dotSprite.destroy();
            var eff_per = KT.game.add.sprite(barSprite.position.x,barSprite.position.y-15, 'eff_per');
            eff_per.anchor.set(0.5);
            eff_per.scale.set(0.5);
            var tween_per = KT.game.add.tween(eff_per.scale).to({x:1, y:1},300, "Linear");
            tween_per.start();
            var tween_per_alpha = KT.game.add.tween(eff_per).to({alpha : 0.2}, 300, "Linear");
            tween_per_alpha.start();
            tween_per.onComplete.add(()=>{
                eff_per.destroy();
            });
        }
        else {
            KT.txtLet.destroy();
            KT.score += 1;
            dotSprite.destroy();
        }
    },
    generateNote: function (distance, spriteName, timeNote, effMid, effLt, effRt) {
        var x = Math.floor(Math.random() * (2 * distance)) + (KT.posGenPrevious - distance);
        if (x < 45) {
            x = distance;
        }
        if (x > KT.game.width - 45) {
            x = KT.game.width - distance;
        }
        KT.posGenPrevious = x;
        // console.log(KT.posGenPrevious);
        var y = -12;
        KT.pianoList.push(new PianoController(x, y, spriteName, {
            time: timeNote
        }));
        KT.effectList.push(new EffectController(x, KT.game.height - KT.configs.HEIGHT_TOOL - 35, effMid, {
            time: timeNote
        }));
        KT.effectList2.push(new EffectController2(x, KT.game.height - KT.configs.HEIGHT_TOOL - 35, effLt, {
            time: timeNote
        }));
        KT.effectList3.push(new EffectController3(x, KT.game.height - KT.configs.HEIGHT_TOOL - 35, effRt, {
            time: timeNote
        }));
    }
}