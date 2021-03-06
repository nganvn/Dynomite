import { EggColor } from '../const';
export interface IEgg {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  color: EggColor;
  texture?: string;
  frame?: string | number;
}
