interface ElementsTimer {
  timer: HTMLHeadingElement;
  segBar: HTMLSpanElement;
  minBar: HTMLSpanElement;
  horBar: HTMLSpanElement;
  playButton: HTMLElement;
  resetButton: HTMLElement;
  pauseButton: HTMLElement;
}

class Timer {
  private seconds: number;
  private minutes: number;
  private hours: number;
  private intervalId: NodeJS.Timeout | null;

  constructor() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.intervalId = null;

    this.getElementsTimer().playButton.addEventListener("click", () => {
      this.startTime();
    });

    this.getElementsTimer().pauseButton.addEventListener("click", () => {
      this.pauseTimer();
    });

    this.getElementsTimer().resetButton.addEventListener("click", () => {
      this.resetTimer();
    });
  }

  private updateBars(): void {
    const maxSeconds = 60;
    const maxMinutes = 60;
    const maxHours = 24;

    const segWidth = (this.seconds / maxSeconds) * 100;
    const minWidth = (this.minutes / maxMinutes) * 100;
    const horWidth = (this.hours / maxHours) * 100;

    this.getElementsTimer().segBar.style.width = `${segWidth}%`;
    this.getElementsTimer().minBar.style.width = `${minWidth}%`;
    this.getElementsTimer().horBar.style.width = `${horWidth}%`;
  }

  private formatTime(): string {
    const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`);
    return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
  }

  startTime(): void {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => {
        this.incrementSeg();
        this.incrementMin();
        this.incrementHour();

        this.getElementsTimer().timer.innerHTML = this.formatTime();
        this.updateBars();
      }, 1000);
    }
  }

  pauseTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetTimer(): void {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.getElementsTimer().timer.innerHTML = this.formatTime();

    this.updateBars();

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private incrementSeg(): void {
    this.seconds++;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
    }
  }

  private incrementMin(): void {
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours++;
    }
  }

  private incrementHour(): void {
    if (this.hours === 24) {
      this.hours = 0;
    }
  }

  private getElementsTimer(): ElementsTimer {
    const timer = document.querySelector("h1") as HTMLHeadingElement;
    const segBar = document.querySelector(".time-seg") as HTMLSpanElement;
    const minBar = document.querySelector(".time-min") as HTMLSpanElement;
    const horBar = document.querySelector(".time-hor") as HTMLSpanElement;
    const playButton = document.querySelector("#play") as HTMLElement;
    const resetButton = document.querySelector("#reset") as HTMLElement;
    const pauseButton = document.querySelector("#pause") as HTMLElement;

    return {
      timer,
      segBar,
      minBar,
      horBar,
      playButton,
      resetButton,
      pauseButton,
    };
  }
}

const timer = new Timer();
