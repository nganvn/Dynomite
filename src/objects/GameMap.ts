import { Physics, GameObjects, Scene, NONE } from 'phaser';
import { Egg } from './Egg';
import { Bullet } from './Bullet';
import { EggColor, randEggColor } from '../const';
export class GameMap extends GameObjects.Container {
  private eggsGroup: GameObjects.Group;
  private eggsMap: Array<Array<Egg>>;
  private check: boolean[][];

  private isFirstRowOnLeft: boolean;
  private size: number;
  private currentColor: EggColor[];
  

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
    this.currentColor = [EggColor.Egg0, EggColor.Egg1, EggColor.Egg2];

    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
    
    this.scene.add.existing(this);
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
      let randEggColor = this.currentColor[Phaser.Math.Between(0, this.currentColor.length - 1)];
      return new Egg(this.scene, randEggColor, offsetX + index*64, 32);
    });

    if (! (Math.floor(size) == size && !isFirstRowOnLeft)) {
      let randEggColor = this.currentColor[Phaser.Math.Between(0, this.currentColor.length - 1)];
      eggs.push(new Egg(this.scene, randEggColor, offsetX + eggs.length*64, 32))
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
    let col = this.eggsMap.findIndex((ele) => {
      return ele != null;
    });

    visited[0][col] = true;

    this.recurVisitAllEggsRelatedWithRoot(0, col, visited);

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


  public addEgg(bullet: Bullet, egg: Egg, angle: number) {
    let col = -1;
    let row = this.eggsMap.findIndex((row, rowIdx) => {
      col = row.findIndex((cell, colIdx) => {
        return cell === egg;
      });
      return col >= 0;
    });
    
    if (this.eggsMap.length - 1 == row) {
      let newRow = new Array<Egg>(7);
      // let evenPos = this.isFirstRowLeft ? 32 : 64;
      // let oddPos = this.isFirstRowLeft ? 64 : 32;
      // let newRow = new Array<Egg>(7);

      // newRow[idx] = new Egg(this.scene, evenPos + idx*64 + 44, (row + 1)*hOffset + 50);
      // newRow[idx].setColor(bullet.getColor());

      // this.add(newRow[idx]);
      this.eggsMap.push(newRow);
    }
    row = row + 1;
    if (row % 2 == 0) {
      col += +(angle <= - Math.PI / 2)
    } else {
      col -= +(angle > - Math.PI / 2)
    }

    if (this.eggsMap[row][col]) {
      if (angle <= - Math.PI / 2) {
        col += 1;
      } else {
        col -= 1;
      }
    }
    if (col > 7 - row % 2) {
      col = 7 - row % 2;
    }

    let evenPos = this.isFirstRowOnLeft ? 32 : 64;
    let oddPos = this.isFirstRowOnLeft ? 64 : 32;
    let hOffset = Math.sin(Math.PI / 3) * 64;

    // let newEgg = new Egg(this.scene);
    // newEgg.setColor(bullet.getColor());

    // if(row % 2 == 0) {
    //   newEgg.setPosition(evenPos + col*64 + 44, row*hOffset + 34);
    // } else {
    //   newEgg.setPosition(oddPos + col*64 + 44, row*hOffset + 34);
    // }
    // this.gameMap[row][col] = newEgg;
    // this.add(newEgg);
    // this.check.push(Array(this.gameMap.length).fill(null).map( (): number => {
    //   return 1;
    // }))

  }

  private findCluster(x: number, y: number) {

  }
}

