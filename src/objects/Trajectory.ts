import { GameObjects, Scene } from 'phaser';
export class Trajectory extends GameObjects.Container {
  private rectangle: GameObjects.Rectangle;
  private triangle: GameObjects.Triangle;

  constructor(scene: Scene, x?: number, y?: number) {
    super(scene, x, y);

    this.init();

    scene.add.existing(this);
  }

  private init(): void {
    this.rectangle = this.scene.add.rectangle(0, 0, 64, 0, 0xff9f6b, 0.5)
      .setOrigin(0.5, 1);
    this.triangle = this.scene.add.triangle(0, 0, 0, 0, 42, -64, 84, 0)
      .setFillStyle(0xff9f6b, 0.5)
      .setOrigin(0.5, 0);

    this.add(this.rectangle);
    this.add(this.triangle);
    this.setVisible(false)
      .setDepth(0);
  }

  public updateDirect(height: number, angle: number) {
    this.setRotation(angle);
    this.rectangle.setSize(64, height).setOrigin(0.5, 1);
    this.triangle.setY(-height);
    this.setVisible(true);
  }
}