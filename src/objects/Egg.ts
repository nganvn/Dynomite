import { Physics, Scene } from "phaser";
import { IEgg } from '../interfaces/Egg.interface';
import { EggColor, getEggStringColor, randEggColor } from '../const';

export class Egg extends Physics.Arcade.Sprite {
  body: Phaser.Physics.Arcade.Body;
  private color: EggColor;
  // private content: ;

  constructor(scene: Scene, color: EggColor,x?: number, y?: number, texture?: string, frame?: string) {
    super(scene, x, y, texture, frame);

    this.color = color;

    this.setTexture(getEggStringColor(this.color));
    this.setOrigin(0.5, 0.5);

    this.scene.physics.world.enable(this);
    this.body.setCircle(this.width / 2);
    this.setBounce(1, 1)
    this.setVelocity(0);  

    this.scene.add.existing(this);
  }

  public getColor(): EggColor {
    return this.color;
  }

  public setColor(color: EggColor): void { 
    this.color = color;
    this.setTexture(getEggStringColor(this.color));
  }
}