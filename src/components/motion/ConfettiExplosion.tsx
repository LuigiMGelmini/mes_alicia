import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiExplosionProps {
  trigger: boolean;
}

export default function ConfettiExplosion({ trigger }: ConfettiExplosionProps) {
  const fire = useCallback(() => {
    // Rose & gold themed confetti
    const colors = ['#a3344a', '#c9986a', '#e8c4a0', '#d4768a', '#f0d9a8'];

    // Multiple bursts
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors,
      startVelocity: 45,
      gravity: 0.8,
      ticks: 300,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.5, x: 0.3 },
        colors,
        startVelocity: 35,
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.5, x: 0.7 },
        colors,
        startVelocity: 35,
      });
    }, 400);
  }, []);

  useEffect(() => {
    if (trigger) fire();
  }, [trigger, fire]);

  return null;
}
