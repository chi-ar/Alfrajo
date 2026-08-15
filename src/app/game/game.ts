import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
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

  players: Player[] = [];

  elapsedSeconds = 0;

  timer: any;


  constructor(
    private gameService: GameService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {

    this.players = this.gameService.players;

    this.timer = setInterval(() => {

      this.elapsedSeconds++;

      this.changeDetector.detectChanges();

    }, 1000);

  }


  get formattedTime(): string {

    const hours = Math.floor(this.elapsedSeconds / 3600);

    const minutes = Math.floor(
      (this.elapsedSeconds % 3600) / 60
    );

    const seconds = this.elapsedSeconds % 60;

    return (
      String(hours).padStart(2, '0') +
      ':' +
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0')
    );

  }


  goBack() {

    clearInterval(this.timer);

    this.router.navigate(['/']);

  }


  ngOnDestroy() {

    clearInterval(this.timer);

  }

}