import BackgroundAnimator from './BackgroundAnimator';

const backgroundAnimation = new BackgroundAnimator('backg', 75, 7500);
setInterval(backgroundAnimation.animateCell, 1000);
