// @ts-nocheck
import confettiJs from 'canvas-confetti'

export default function useConfetti() {
  const callConfetti = () => {
    const fireConfetti = (particleRatio: number, opts: any) => {
      confettiJs({
        zIndex: 999,
        origin: { y: 0.7 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      })
    }

    fireConfetti(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    fireConfetti(0.2, {
      spread: 60,
    })

    fireConfetti(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  const callFireworks = () => {
    var duration = 5 * 1000
    var animationEnd = Date.now() + duration
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      var particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confettiJs({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      confettiJs({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
    }, 250)
  }

  return {
    callConfetti,
    callFireworks,
  }
}
