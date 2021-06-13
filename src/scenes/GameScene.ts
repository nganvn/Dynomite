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
    
    this.gun = new Gun({
      scene:this, 
      x: this.cameras.main.width / 2, 
      y: this.cameras.main.height - 68
    });

    let bullet = new Bullet({
      scene: this,
      color: this.gameMap.randEggColor(), 
      x: this.cameras.main.width / 2, 
      y: this.cameras.main.height - 68
    });

    this.gun.loadBullet(bullet);
    
    this.gameFrame = this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 64*8, 700)
      .setStrokeStyle(2, 0x000000);
    
    this.gameBoune = new Phaser.Geom.Rectangle(50, -500, 64*8, 2000);

    // input
    this.gameFrame.setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        let bullet = this.gun.shot();
        bullet.body.setBoundsRectangle(this.gameBoune);
        
        let overlap = this.physics.add.collider(bullet, this.gameMap.getEggGroup(), (bullet: Bullet, egg: Egg) => {
          let angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, egg.x + egg.parentContainer.x, egg.y + egg.parentContainer.y);

          if (bullet.active && Math.abs(angle + Math.PI/2) < Math.PI / 3) {
            bullet.setVelocity(0,0);
            this.gameMap.addEgg(bullet, egg, angle + Math.PI/2 >= 0);
            
            bullet.setActive(false);
            bullet.destroy();
            this.physics.world.removeCollider(overlap);
          }
        });

        let overlapTopLine = this.physics.add.overlap(bullet, this.gameMap.getTopLine(), (bullet: Bullet, topLine) => {
          
          this.gameMap.addEggAtTopLane(bullet);
          this.physics.world.removeCollider(overlapTopLine);
          bullet.destroy();
        })

        let newBullet = new Bullet({
          scene: this,
          color: this.gameMap.randEggColor(), 
          x: this.cameras.main.width / 2, 
          y: this.cameras.main.height - 68
        });
    
        this.gun.loadBullet(newBullet);
        
      })
      .on(Phaser.Input.Events.POINTER_MOVE, (event: any) => {
        this.gun.updateTrajectory(event.x, event.y);
      })
  }
  update(): void {


  }

}
