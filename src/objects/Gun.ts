import { GameObjects, Scale, Scene, Physics } from 'phaser';
import { Bullet } from './Bullet';
import { Egg } from './Egg';
import { Trajectory } from './Trajectory';

export class Gun extends GameObjects.Container {
  private bullet: Bullet;
  private trajectory: Trajectory;

  constructor(scene: Scene, x?: number, y?: number) {
    super(scene, x, y);

    this.init();

    this.scene.add.existing(this);

    // input

  }

  private init() {
    this.trajectory = new Trajectory(this.scene);
    this.add(this.trajectory);
    this.loadEgg();
  }

  public loadEgg(): void {
    this.bullet = new Bullet(this.scene, this.scene.cameras.main.width / 2, this.scene.cameras.main.height - 68);
    
  }

  public updateTrajectory(x: number, y: number): void {
    this.trajectory.updateDirect(
      Phaser.Math.Distance.Between(this.x, this.y, x, y),
      Phaser.Math.Angle.Between(x, y, this.x, this.y) - Math.PI / 2
    );
    // this.
  }

  public shot(): Bullet {
    let angle = this.trajectory.rotation;
    let speed = this.scene.registry.get('speed');
    
    let vx = speed * Math.cos(angle - Math.PI / 2);
    let vy = speed * Math.sin(angle - Math.PI / 2);

    this.bullet.setVelocity(vx, vy);
    let bulletRet = this.bullet;
    this.loadEgg();
    return bulletRet;
  }

}