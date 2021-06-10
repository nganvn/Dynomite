import 'phaser';
import { GameConfig } from './config';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
  setTimeout(() => {
    document.getElementsByTagName('canvas')[0].setAttribute(
      'style', `
        display: block; 
        width: ${window.innerHeight * 600/800}px; 
        height: ${window.innerHeight}px;
        margin-left: auto;
        margin-right: auto;
      `,
    );
  }, 100);
});
