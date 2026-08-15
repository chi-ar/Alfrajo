import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Game } from '../services/game';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  playersNumber = 1;

  life = 30;

  names: string[] = [
    '',
    '',
    '',
    ''
  ];


  constructor(
    private game: Game,
    private router: Router
  ) {}


  // ==========================================
  // SELEZIONE NUMERO GIOCATORI
  // ==========================================

  selectPlayers(number: number) {

    this.playersNumber = number;

  }


  // ==========================================
  // TRACK DEGLI INPUT
  // ==========================================

  trackPlayer(index: number, player: string) {

    return index;

  }


  // ==========================================
  // INIZIA PARTITA
  // ==========================================

  start() {

    const selectedNames =
      this.names
        .slice(0, this.playersNumber)
        .map((name, index) => {

          const cleanName = name.trim();

          return cleanName ||
            `Giocatore ${index + 1}`;

        });


    this.game.startGame(
      selectedNames,
      this.life
    );


    this.router.navigate(['/game']);

  }

}