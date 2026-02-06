import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Stop {
  id: number;
  location: string;
  clue: string;
  question: string;
  type: 'yesno' | 'text' | 'choice' | 'valentine';
  choices?: string[];
  emoji: string;
  answer?: any;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentStep = 0;
  showClue = false;
  textAnswer = '';
  celebrating = false;
  showMilestoneAlert = false;
  milestoneTitle = '';
  milestoneMessage = '';
  noButtonPosition = { top: '60%', left: '50%' };
  noButtonAttempts = 0;

  stops: Stop[] = [
    {
      id: 1,
      location: "I'm closest to your dreams when the lights go low—look where your head rests before you let go.",
      clue: "Under your pillow",
      question: "Do you still get butterflies when you're around me?",
      type: "yesno",
      emoji: "🛏️"
    },
    {
      id: 2,
      location: "You'll find me where you meet your own eyes, where mornings begin and sleepy smiles rise.",
      clue: "Bathroom mirror",
      question: "Do I make you laugh more than anyone else?",
      type: "yesno",
      emoji: "🪞"
    },
    {
      id: 3,
      location: "Go here if you want to spice things up outside the bedroom.",
      clue: "Spice rack / kitchen shelf",
      question: "Should we dance in the kitchen more often?",
      type: "yesno",
      emoji: "🌶️"
    },
    {
      id: 4,
      location: "There's no denying you've captured my heart—look for the next clue behind our favorite art.",
      clue: "Photo frame / favorite art",
      question: "Do you think we make a cute couple?",
      type: "yesno",
      emoji: "🖼️"
    },
    {
      id: 5,
      location: "You've followed every clue with love and grace—now the final moment awaits at our special place.",
      clue: "Final Surprise",
      question: "Will you be my Valentine?",
      type: "valentine",
      emoji: "💝"
    }
  ];

  get currentStop(): Stop {
    return this.stops[this.currentStep];
  }

  get progress(): number {
    return ((this.currentStep + 1) / this.stops.length) * 100;
  }

  revealClue() {
    this.showClue = true;
  }

  answerYes() {
    this.currentStop.answer = true;

    // If it's the valentine question, show celebration
    if (this.currentStop.type === 'valentine') {
      this.celebrating = true;
      this.launchHearts();
    } else {
      this.nextStep();
    }
  }

  onNoButtonHover() {
    this.noButtonAttempts++;

    // Generate random position ensuring button stays within viewport
    const maxTop = 70;
    const maxLeft = 80;
    const minTop = 20;
    const minLeft = 10;

    const newTop = Math.random() * (maxTop - minTop) + minTop;
    const newLeft = Math.random() * (maxLeft - minLeft) + minLeft;

    this.noButtonPosition = {
      top: newTop + '%',
      left: newLeft + '%'
    };

    // Show cute popup messages at milestones
    if (this.noButtonAttempts === 5) {
      this.showCuteAlert("💨 Whoosh!", "You can't escape! 😄");
    } else if (this.noButtonAttempts === 10) {
      this.showCuteAlert("😊 Come on!", "Just say YES already! 💕");
    } else if (this.noButtonAttempts === 15) {
      this.showCuteAlert("🎯 Never gonna catch me!", "I'll keep running forever! 🏃‍♂️");
    }
  }

  showCuteAlert(title: string, message: string) {
    this.milestoneTitle = title;
    this.milestoneMessage = message;
    this.showMilestoneAlert = true;

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      this.showMilestoneAlert = false;
    }, 3000);
  }

  nextStep() {
    if (this.currentStep < this.stops.length - 1) {
      this.currentStep++;
      this.showClue = false;
      // Reset no button position for next question
      this.noButtonPosition = { top: '60%', left: '50%' };
      this.noButtonAttempts = 0;
    }
  }

  launchHearts() {
    const container = document.querySelector('.celebration');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
      }, i * 100);
    }
  }

  restart() {
    this.currentStep = 0;
    this.showClue = false;
    this.celebrating = false;
    this.showMilestoneAlert = false;
    this.noButtonPosition = { top: '60%', left: '50%' };
    this.noButtonAttempts = 0;
    this.stops.forEach(stop => stop.answer = undefined);
  }
}
