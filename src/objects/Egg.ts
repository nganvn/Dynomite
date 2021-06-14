import { Physics, Scene } from "phaser";
import { IEgg } from '../interfaces/Egg.interface';
import { EggColor, getEggStringColor, randEggColor } from '../const';

export class Egg extends Physics.Arcade.Sprite {
  body: Phaser.Physics.Arcade.Body;
  private color: EggColor;
  // private content: ;

  constructor(params: IEgg) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

    this.color = params.color;
    this.init();

    this.scene.add.existing(this);
  }

  private init(): void {
    // sprite
    this.setTexture(getEggStringColor(this.color));
    this.setOrigin(0.5, 0.5);
    
    //physics
    this.scene.physics.world.enable(this);
    this.body.setCircle(this.width / 2);
    this.setVelocity(0);  
    this.setImmovable(true);
  }

  public getColor(): EggColor {
    return this.color;
  }

  public setColor(color: EggColor): void { 
    this.color = color;
    this.setTexture(getEggStringColor(this.color));
  }
}