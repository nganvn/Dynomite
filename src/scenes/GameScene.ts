import { Gun } from '../objects/Gun';
import { GameObjects, Geom } from 'phaser';
import { Egg } from '../objects/Egg';
import { GameMap } from '../objects/GameMap';
import { Bullet } from '../objects/Bullet';

export class GameScene extends Phaser.Scene {
  private gun!: Gun;
  private gameFrame: GameObjects.Rectangle;
  private gameBoune: Geom.Rectangle;
  private gameMap: GameMap;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    
  }

  create(): void {
    this.gameMap = new GameMap(this);
    // this.gun = new Gun(this, this.cameras.main.width / 2, this.cameras.main.height - 68);
    
    // this.gameFrame = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 64*8, 700)
    //   .setStrokeStyle(2, 0x000000);
    
    // this.gameBoune = new Phaser.Geom.Rectangle(50, -500, 64*8, 2000);

    // // input
    // this.gameFrame.setInteractive()
    //   .on(Phaser.Input.Events.POINTER_DOWN, () => {
    //     let bullet = this.gun.shot();
    //     bullet.body.setBoundsRectangle(this.gameBoune);
    //     let overlap = this.physics.add.overlap(bullet, this.gameMap, (bullet: Bullet, egg: Egg) => {
  
    //       // let angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, egg.x, egg.y);
    //       // if (bullet.active && angle < - Math.PI / 3 + 0.5  && angle > - 2 * Math.PI / 3 - 0.5) {
    //       //   bullet.setVelocity(0,0);
    //       //   bullet.setActive(false);
    //       //   this.gameMap.addEgg(bullet, egg, angle);
    //       //   this.physics.world.removeCollider(overlap);
    //       //   bullet.destroy();
    //       // }
    //     });
    //   })
    //   .on(Phaser.Input.Events.POINTER_MOVE, (event: any) => {
    //     this.gun.updateTrajectory(event.x, event.y);
    //   })
  }
  update(): void {


  }

}
