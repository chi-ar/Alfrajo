import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from '../services/game';


@Component({
  selector: 'app-home',
  imports: [
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {


  playersNumber = 1;

  life = 30;


  names = [
    '',
    '',
    '',
    ''
  ];


  constructor(
    private game: Game,
    private router: Router
  ){}



  start(){

    const names =
      this.names.slice(0,this.playersNumber);


    this.game.startGame(
      names,
      this.life
    );


    this.router.navigate(['/game']);

  }

}