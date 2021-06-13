import { Physics, Scene } from "phaser";
import { EggColor, getEggStringColor, randEggColor } from '../const';
import { Egg } from "./Egg";
import { IEgg } from '../interfaces/Egg.interface';

export class Bullet extends Egg {

  constructor(params: IEgg) {
    super(params);
    
    this.setBounce(1,1)
      .setCollideWorldBounds(true)
      .setDepth(10);
      
    this.scene.add.existing(this);
  }

  public update(): void {

  }

  // public toEgg(): Egg {
  //   let egg = new Egg(this.scene);
  //   this.setTexture(getEggStringColor(this.getColor()));
  //   return Egg
  // }

}