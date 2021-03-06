import { Physics, Scene } from "phaser";
import { EggColor, getEggStringColor, randEggColor } from '../const';
import { Egg } from "./Egg";
import { IEgg } from '../interfaces/Egg.interface';

export class Bullet extends Egg {

  constructor(params: IEgg) {
    super(params);
    
    this.setBounce(1,1)
      .setCollideWorldBounds(true);

    this.scene.add.existing(this);
  }

  public update(): void {

  }

}