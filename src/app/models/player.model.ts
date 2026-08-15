export interface Player {

  name: string;

  life: number;

  burst: number;

  tokens: {
    action: boolean;
    move: boolean;
    special: boolean;
  };

  talents: {
    name: string;
    description: string;
    active: boolean;
  }[];

  turnTimes: number[];

}