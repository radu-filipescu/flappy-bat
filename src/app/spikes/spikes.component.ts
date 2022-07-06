import { Component, OnInit } from '@angular/core';
import {spike} from "./spike";
import {GlobalServiceService} from "../global-service.service";

@Component({
  selector: 'app-spikes',
  templateUrl: './spikes.component.html',
  styleUrls: ['./spikes.component.css']
})
export class SpikesComponent implements OnInit {
  spikeArray: spike[] = [new spike()];
  moveSpeed: number = 0.5;
  rateOfSpawn: number = 0.5;

  playerHeight: number = 0;

  constructor(private globalService: GlobalServiceService) { }

  ngOnInit(): void {
    this.globalService.answerPlayerHeight.subscribe( data => {
      this.playerHeight = data;
    })

    // spikes appearing at random
    setInterval( () => {
      let rng = Math.random();
      if(rng > (1 - this.rateOfSpawn)) {
        // generating random new spike
        let newSpike = new spike();

        let height = 0;
        while (height < 10) {
          height = 70 * Math.random();
        }

        newSpike.height = height;

        if(Math.random() > 0.5) {
          newSpike.isUp = false;
        }

        let type = Math.random();

        if(type < 0.3)
          newSpike.type = 1;
        else
          if(type < 0.6)
            newSpike.type = 2;
          else
            newSpike.type = 3;

        if(!this.globalService.paused)
          this.spikeArray.push(newSpike);
      }
    }, 800);

    // spike moving and deleting
    setInterval( () => {
      if(!this.globalService.paused) {
        for(let i = 0; i < this.spikeArray.length; i++) {
          this.spikeArray[i].position -= this.moveSpeed;

          // check for collision
          if (Math.abs(this.spikeArray[i].position - 20) == 0) {
            this.globalService.askPlayerHeight.emit();

            if (this.spikeArray[i].isUp && this.playerHeight >= 95 - this.spikeArray[i].height ||
              !this.spikeArray[i].isUp && this.playerHeight < this.spikeArray[i].height - 5) {
              this.globalService.endGame();
            }
          }

          if (this.spikeArray[i].position < -30) {
            this.spikeArray.splice(i, 1);
            this.globalService.incrementScore.emit();
          }
        }
      }
    }, 10);
  }

}
