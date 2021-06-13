import { Scale } from "phaser";
import { LoadingScene } from './scenes/LoadingScene';
import { GameScene } from './scenes/GameScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Dynomyte',
  version: '2.0',
  scale: {
    mode: Scale.ScaleModes.NONE,
    width: 600,
    height: 800,
  },
  type: Phaser.AUTO,
  parent: 'game',
  scene: [LoadingScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: false
    }
  },
  audio: {
    disableWebAudio: false,
  },
  backgroundColor: '#e3e3e3',
  render: { pixelArt: true, antialias: false },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
};

