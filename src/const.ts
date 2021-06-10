export enum EggColor {
  Egg0 = 0,
  Egg1,
  Egg2,
  Egg3,
  Egg4,
  Egg5,
  Egg6,
  Egg7
}

export const randEggColor = (): EggColor => {
  let eggColors = [
    EggColor.Egg0, 
    EggColor.Egg1, 
    EggColor.Egg2, 
    EggColor.Egg3, 
    EggColor.Egg4, 
    EggColor.Egg5, 
    EggColor.Egg6, 
    EggColor.Egg7 
  ]

  return eggColors[Phaser.Math.Between(0, eggColors.length - 1)];  
}

export const getEggStringColor = (egg: EggColor): string => {
  switch (egg) {
    case EggColor.Egg0:
      return 'egg0';
    case EggColor.Egg1:
      return 'egg1';
    case EggColor.Egg2:
      return 'egg2';
    case EggColor.Egg3:
      return 'egg3';
    case EggColor.Egg4:
      return 'egg4';
    case EggColor.Egg5:
      return 'egg5';
    case EggColor.Egg6:
      return 'egg6';
    case EggColor.Egg7:
      return 'egg7';
  }
}