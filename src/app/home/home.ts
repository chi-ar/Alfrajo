import { Component, OnInit } from '@angular/core';
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
export class Home implements OnInit {

  playersNumber = 1;

  life = 30;

  names: string[] = [
    '',
    '',
    '',
    ''
  ];


  // ==========================================
  // TEMA
  // ==========================================

  theme: 'dark' | 'light' = 'dark';


  constructor(
    private game: Game,
    private router: Router
  ) {}


  // ==========================================
  // AVVIO
  // ==========================================

  ngOnInit() {

    const savedTheme =
      localStorage.getItem('alfrajo-theme');


    if (
      savedTheme === 'light' ||
      savedTheme === 'dark'
    ) {

      this.theme = savedTheme;

    }


    this.applyTheme();

  }


  // ==========================================
  // CAMBIO TEMA
  // ==========================================

  changeTheme(theme: 'dark' | 'light') {

    this.theme = theme;

    localStorage.setItem(
      'alfrajo-theme',
      theme
    );

    this.applyTheme();

  }


  // ==========================================
  // APPLICA TEMA
  // ==========================================

  private applyTheme() {

    document.body.setAttribute(
      'data-theme',
      this.theme
    );

  }


  // ==========================================
  // GIOCATORI
  // ==========================================

  selectPlayers(number: number) {

    this.playersNumber = number;

  }


  // ==========================================
  // TRACK
  // ==========================================

  trackPlayer(
    index: number,
    player: string
  ) {

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