import { GameObjects, Scale, Scene, Physics } from 'phaser';
import { EggColor } from '../const';
import { IGun } from '../interfaces/Gun.interface';
import { Bullet } from './Bullet';
import { Egg } from './Egg';
import { Trajectory } from './Trajectory';

export class Gun extends GameObjects.Container {
  private bullet: Bullet;
  private trajectory: Trajectory;
  private currentColors: EggColor[];

  constructor(params: IGun) {
    super(params.scene, params.x, params.y);

    this.init();

    this.scene.add.existing(this);

    // input

  }

  private init() {
    this.trajectory = new Trajectory(this.scene);
    this.add(this.trajectory);
  }

  public loadBullet(bullet: Bullet): void {
    this.bullet = bullet;
    
  }

  public updateTrajectory(x: number, y: number): void {
    this.trajectory.updateDirect(
      Phaser.Math.Distance.Between(this.x, this.y, x, y),
      Phaser.Math.Angle.Between(x, y, this.x, this.y) - Math.PI / 2
    );
    // this.
  }

  public shot(): Bullet {
    if (!this.bullet) {
      return null;
    }
    let angle = this.trajectory.rotation;
    let speed = this.scene.registry.get('speed');
    
    let vx = speed * Math.cos(angle - Math.PI / 2);
    let vy = speed * Math.sin(angle - Math.PI / 2);

    this.bullet.setVelocity(vx, vy);
    let bulletRet = this.bullet;
    this.bullet = null;
    return bulletRet;
  }

}