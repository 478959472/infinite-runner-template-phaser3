import Phaser from 'phaser'

// import Preloader from './scenes_test/Preloader'
import Game from './scenes_test/Game'
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
	scene: [Game]//[Preloader, Game, GameOver]
}

export default new Phaser.Game(config)
