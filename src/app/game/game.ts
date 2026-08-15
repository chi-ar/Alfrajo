import {
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Game as GameService } from '../services/game';
import { Player } from '../models/player.model';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game implements OnDestroy {

  // ==========================================
  // GIOCATORI
  // ==========================================

  players: Player[] = [];


  // ==========================================
  // TIMER PARTITA
  // ==========================================

  elapsedSeconds = 0;


  // ==========================================
  // TIMER GIOCATORE CORRENTE
  // ==========================================

  playerElapsedSeconds = 0;


  // ==========================================
  // GIOCATORE CORRENTE
  // ==========================================

  currentPlayerIndex = 0;


  // ==========================================
  // STORICO APERTO/CHIUSO
  // ==========================================

  openHistory: boolean[] = [];


  // ==========================================
  // INTERVALLO DEL TIMER
  // ==========================================

  timer: any;


  // ==========================================
  // COSTRUTTORE
  // ==========================================

  constructor(
    private gameService: GameService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {

    // Recupera i giocatori dal service

    this.players = this.gameService.players;


    // Crea uno stato per la tendina
    // di ogni giocatore

    this.openHistory = this.players.map(
      () => false
    );


    // Avvia il timer

    this.startTimer();

  }


  // ==========================================
  // AVVIO TIMER
  // ==========================================

  startTimer() {

    this.timer = setInterval(() => {

      // Aumenta il tempo totale
      // della partita

      this.elapsedSeconds++;


      // Aumenta il tempo del
      // giocatore corrente

      this.playerElapsedSeconds++;


      // Forza Angular ad aggiornare
      // la schermata

      this.changeDetector.detectChanges();

    }, 1000);

  }


  // ==========================================
  // GIOCATORE CORRENTE
  // ==========================================

  get currentPlayer(): Player | undefined {

    return this.players[
      this.currentPlayerIndex
    ];

  }


  // ==========================================
  // FINE TURNO
  // ==========================================

  endTurn() {

    // Se non ci sono giocatori
    // non facciamo nulla

    if (this.players.length === 0) {
      return;
    }


    // Recupera il giocatore
    // che ha appena terminato il turno

    const currentPlayer =
      this.players[this.currentPlayerIndex];


    // Salva il tempo del turno

    currentPlayer.turnTimes.push(
      this.playerElapsedSeconds
    );


    // Passa al giocatore successivo

    this.currentPlayerIndex =
      (
        this.currentPlayerIndex + 1
      ) % this.players.length;


    // Azzera il timer del nuovo giocatore

    this.playerElapsedSeconds = 0;


    // Aggiorna la schermata

    this.changeDetector.detectChanges();

  }


  // ==========================================
  // FORMATTA IL TEMPO
  // ==========================================

  formatTime(seconds: number): string {

    const hours =
      Math.floor(seconds / 3600);


    const minutes =
      Math.floor(
        (seconds % 3600) / 60
      );


    const remainingSeconds =
      seconds % 60;


    return (
      String(hours).padStart(2, '0') +
      ':' +
      String(minutes).padStart(2, '0') +
      ':' +
      String(remainingSeconds).padStart(2, '0')
    );

  }


  // ==========================================
  // TORNA ALLA HOME
  // ==========================================

  goBack() {

    // Ferma il timer

    clearInterval(this.timer);


    // Torna alla Home

    this.router.navigate(['/']);

  }


  // ==========================================
  // DISTRUZIONE COMPONENTE
  // ==========================================

  ngOnDestroy() {

    // Ferma il timer quando
    // si abbandona la schermata

    clearInterval(this.timer);

  }

}