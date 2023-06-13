import Phaser from 'phaser'
import WheelGame from "~/scenes_test/WheelGame";

// import Preloader from './scenes_test/Preloader'
// import Game from './scenes_test/Game'
// import GameOver from './scenes_test/GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,//<canvas width="800" height="640">
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true
		}
	},
	backgroundColor: '#FFFFFF',  // 设置白色背景
	parent: 'phaser-game',  // 使用 HTML 中的元素作为 Phaser 游戏的父元素

	scene: [WheelGame]//[Preloader, Game, GameOver]
}

export default new Phaser.Game(config)
