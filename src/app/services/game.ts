import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';


@Injectable({
  providedIn: 'root'
})
export class Game {


  players: Player[] = [];


  startGame(names: string[], life: number) {


    this.players = names.map(name => ({

      name,

      life,

      burst: 0,


      tokens: {
        action: false,
        move: false,
        special: false
      },


      talents: [
        {
          name: 'Talento 1',
          description: '',
          active: false
        },
        {
          name: 'Talento 2',
          description: '',
          active: false
        },
        {
          name: 'Talento 3',
          description: '',
          active: false
        },
        {
          name: 'Talento 4',
          description: '',
          active: false
        }
      ]

    }));

  }


}