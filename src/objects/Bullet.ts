import { Physics, Scene } from "phaser";
import { EggColor, getEggStringColor, randEggColor } from '../const';
import { Egg } from "./Egg";

export class Bullet extends Egg {

  constructor(scene: Scene, color: EggColor, x?: number, y?: number, texture?: string, frame?: string) {
    super(scene, x, y, color, texture, frame);
    
    this.setBounce(1,1)
      .setCollideWorldBounds(true)
      .setDepth(10);
    scene.add.existing(this);
  }

  public update(): void {

  }

  // public toEgg(): Egg {
  //   let egg = new Egg(this.scene);
  //   this.setTexture(getEggStringColor(this.getColor()));
  //   return Egg
  // }

}