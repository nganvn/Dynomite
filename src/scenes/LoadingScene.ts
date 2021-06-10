export class LoadingScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'LoadingScene'
    });
  }

  preload(): void {
    this.load.image('egg0', 'assets/sprites/egg/egg-0.png');
    this.load.image('egg1', 'assets/sprites/egg/egg-1.png');
    this.load.image('egg2', 'assets/sprites/egg/egg-2.png');
    this.load.image('egg3', 'assets/sprites/egg/egg-3.png');
    this.load.image('egg4', 'assets/sprites/egg/egg-4.png');
    this.load.image('egg5', 'assets/sprites/egg/egg-5.png');
    this.load.image('egg6', 'assets/sprites/egg/egg-6.png');
    this.load.image('egg7', 'assets/sprites/egg/egg-7.png');
  }

  create(): void {
    this.initRegistry();
    this.scene.start('GameScene');
  }

  private initRegistry(): void {
    this.registry.set('speed', 1500);
    this.registry.set('score', 0);
  }
}