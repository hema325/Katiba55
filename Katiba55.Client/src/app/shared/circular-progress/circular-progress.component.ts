import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.css']
})
export class CircularProgressComponent implements OnInit {

  @Input() color: string = '#198754';
  @Input() percent: number = 0;

  animatedPercent: number = 0;
  private animationFrame: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['percent']) {
      this.animate();
    }
  }

  animate() {
    cancelAnimationFrame(this.animationFrame);
    const start = this.animatedPercent;
    const end = this.percent;
    const duration = 600;
    const startTime = performance.now();

    const animateStep = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      this.animatedPercent = Math.round(start + (end - start) * progress);
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animateStep);
      } else {
        this.animatedPercent = end;
      }
    };

    requestAnimationFrame(animateStep);
  }

}
