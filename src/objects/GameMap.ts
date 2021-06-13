import { Physics, GameObjects, Scene, NONE } from 'phaser';
import { Egg } from './Egg';
import { Bullet } from './Bullet';
import { EggColor, randEggColor } from '../const';
export class GameMap extends GameObjects.Container {
  private topLine: GameObjects.Line;
  private eggsGroup: GameObjects.Group;
  private eggsMap: Array<Array<Egg>>;
  private check: boolean[][];

  private isFirstRowOnLeft: boolean;
  private size: number;
  private currentColors: EggColor[];
  

  constructor(scene: Scene) {
    super(scene, 0, 0);

    this.init();
  }

  private init(): void {
    this.isFirstRowOnLeft = false;
    this.size = 8;
    this.width = this.size*64;
    this.eggsGroup = this.scene.add.group();
    this.eggsMap = new Array<Array<Egg>>();
    this.currentColors = [EggColor.Egg0, EggColor.Egg1, EggColor.Egg2];

    this.setX((this.scene.cameras.main.width - this.width) / 2);

    this.addRow();
    this.addRow();
    // this.addRow();
    // this.addRow();
    // this.addRow();
    // this.addRow();
    this.topLine = this.scene.add.line(0, 0, 0, 0, this.width, 0, 0xff0000, 1).setOrigin(0);
    this.scene.physics.world.enable(this.topLine);
    this.add(this.topLine);
    this.scene.add.existing(this);
    this.setY(10);
  }

  public getCurrentColors(): EggColor[] {
    return this.currentColors;
  }
  
  public getEggGroup(): GameObjects.Group {
    return this.eggsGroup;
  }

  public getTopLine(): GameObjects.Line {
    return this.topLine;
  }

  public randEggColor(): EggColor {
      return this.currentColors[Phaser.Math.Between(0, this.currentColors.length - 1)];
  }

  private addRow(): void {
    this.isFirstRowOnLeft = !this.isFirstRowOnLeft;
    let row = this.generateRow(this.isFirstRowOnLeft, this.size);
    this.eggsMap.unshift(row); 
    this.add(row);
    
    let hOffset = Math.sin(Math.PI / 3) * 64;
    
    this.eggsGroup.incY(hOffset);
    this.eggsGroup.addMultiple(row);
  }

  private generateRow(isFirstRowOnLeft: boolean, size: number): Egg[] {

    let offsetX = isFirstRowOnLeft ? 32 : 64;
    let eggs = Array(Math.floor(size - 1)).fill(null).map((ele, index) => {
      return new Egg({
        scene: this.scene,
        color: this.randEggColor(), 
        x: offsetX + index*64, 
        y: 32
      });
    });

    if (! (Math.floor(size) == size && !isFirstRowOnLeft)) {
      eggs.push(new Egg({
        scene: this.scene,
        color: this.randEggColor(), 
        x: offsetX + eggs.length*64, 
        y: 32
      }));
    };

    return eggs;
  }

  private isLeftRow(row: number): boolean {
    return this.isFirstRowOnLeft ? row % 2 == 0 : row % 2 == 1;
  }

  private findEggsChain(row: number, col: number): [number, number][] {
    var visited = Array(this.eggsMap.length).fill(null).map(() => Array(Math.floor(this.size)).fill(false));
    visited[row][col] = true;
    let result = this.recurFindEggsChain(row, col, visited);
    return result;
  }

  private recurFindEggsChain(row: number, col: number, visited: boolean[][]):  [number, number][]{
    let result: [number, number][] = [[row, col]];

    // all element around element at [row][col]
    var direct: [number, number][];
    if (this.isLeftRow(row)) {
      direct = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]];
    } else {
      direct = [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];
    }

    direct.forEach((ele) => {
      if (row + ele[0] >= 0 && row + ele[0] < visited.length) {
        if (!visited[row + ele[0]][col + ele[1]] && this.eggsMap[row + ele[0]][col + ele[1]]) {
          visited[row + ele[0]][col + ele[1]] = true;
          if (this.eggsMap[row][col].getColor() == this.eggsMap[row + ele[0]][col + ele[1]].getColor()) {
            let ret = this.recurFindEggsChain(row + ele[0], col + ele[1], visited);
            result.push(...ret);
          }
        }
      }
    });

    return result;
  }

  private findAllEggsNotRelatedWithRoot(): [number, number][] {
    var visited = Array(this.eggsMap.length).fill(null).map(() => Array(Math.floor(this.size)).fill(false));
    this.eggsMap[0].forEach((ele, col) => {
      if (ele != null) {
        visited[0][col] = true;
        
        this.recurVisitAllEggsRelatedWithRoot(0, col, visited);
      }
    });



    let result: [number, number][] = [];

    this.eggsMap.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell != null && !visited[rowIdx][colIdx]) {
          result.push([rowIdx, colIdx]);
        }
      });
    });

    return result;
  }

  private recurVisitAllEggsRelatedWithRoot(row: number, col: number, visited: boolean[][]) {
    // all element around element at [row][col]
    var direct: [number, number][];
    if (this.isLeftRow(row)) {
      direct = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]];
    } else {
      direct = [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];
    }

    direct.forEach((ele) => {
      if (row + ele[0] >= 0 && row + ele[0] < visited.length) {
        if (!visited[row + ele[0]][col + ele[1]] && this.eggsMap[row + ele[0]][col + ele[1]]) {
          visited[row + ele[0]][col + ele[1]] = true;
          this.recurVisitAllEggsRelatedWithRoot(row + ele[0], col + ele[1], visited);
        }
      }
    });
  }


  public addEggAtTopLane(bullet: Bullet): void {
    let x = bullet.x - this.x;
    
    let col = (x + (this.isFirstRowOnLeft ? 0 : 32)) /64 - 1;

    let offsetX = this.isFirstRowOnLeft ? 32 : 64;

    let newEgg = new Egg({
      scene: this.scene,
      color: bullet.getColor(), 
      x: offsetX + Math.round(col)*64,
      y: 32
    });

    console.log(col);

    this.add(newEgg);
    this.eggsGroup.add(newEgg);
    this.eggsMap[0][Math.round(col)] = newEgg;

    this.scene.time.addEvent({
      delay: 100, callback: () => {
        this.checkEggsChain(0, Math.round(col))
      }
    });
  }

  public addEgg(bullet: Bullet, egg: Egg, isLeft: boolean): void {
    console.log(this.eggsMap);
    let col = -2;
    let row = this.eggsMap.findIndex((row, rowIdx) => {
      col = row.findIndex((cell, colIdx) => {
        return cell === egg;
      });
      return col >= 0;
    });

    console.log(row, isLeft);
    if (this.isLeftRow(row)) {
      if (isLeft) {
        col -= 1;
      }
    } else {
      if (!isLeft) {
        col += 1;
      }
    }

    if (col + 1 + (this.isLeftRow(row) ? 0.5 : 0) > this.size) {
      col -= 1;
    }

    if (this.eggsMap.length - 1 == row) {
      let newRow = new Array<Egg>(Math.floor(this.size));
      

      this.eggsMap.push(newRow);
    }
    
    row += 1;

    if (this.eggsMap[row][col]) {
      if (isLeft) {
        col -= 1;
      } else {
        col += 1;
      }
    }

    let hOffset = Math.sin(Math.PI / 3) * 64;
    let offsetX = this.isLeftRow(row) ? 32 : 64;

    let newEgg = new Egg({
      scene: this.scene,
      color: bullet.getColor(), 
      x: offsetX + col*64,
      y: 32 + hOffset*row
    })

    this.add(newEgg);
    this.eggsGroup.add(newEgg);
    this.eggsMap[row][col] = newEgg;

    this.scene.time.addEvent({
      delay: 100, 
      callback: () => {
        console.log(123);
        this.checkEggsChain(row, col)
      }
    });

  }

  private checkEggsChain(row: number, col: number): void {
    let eggsChain = this.findEggsChain(row, col);
    if (eggsChain.length >= 3) {
      eggsChain.forEach((ele) => {
        this.eggsMap[ele[0]][ele[1]].destroy();
        this.eggsMap[ele[0]][ele[1]] = null;
      });
    }

    let allEggNotRelatedWithRoot = this.findAllEggsNotRelatedWithRoot();
    allEggNotRelatedWithRoot.forEach((ele) => {
      this.eggsMap[ele[0]][ele[1]].destroy();
      this.eggsMap[ele[0]][ele[1]] = null;
    });
  }


}

