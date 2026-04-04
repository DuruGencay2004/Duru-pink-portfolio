import { useEffect } from 'react';

const COLORS = ['#FF2080', '#FFB3D4', '#FF6BAE', '#E0006F', '#FFD6E8'];
const MAX = 40;
const PETAL_PATH = 'M 14 0 C 20 2, 28 6, 28 10 C 28 13, 20 14, 14 14 C 8 14, 0 13, 0 10 C 0 6, 8 2, 14 0 Z';

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function usePetalTrail() {
  useEffect(() => {
    const active: HTMLElement[] = [];
    let lastSpawn = 0;

    function spawnPetal(x: number, y: number) {
      if (active.length >= MAX) {
        const oldest = active.shift();
        oldest?.remove();
      }

      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = rand(18, 32);
      const opacity = rand(0.75, 0.9);
      const rot0 = rand(0, 360);
      const rot1 = rot0 + rand(-90, 90);
      const tx = rand(-60, 60);
      const ty = rand(120, 200);
      const duration = rand(2500, 4000);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '28');
      svg.setAttribute('height', '14');
      svg.setAttribute('viewBox', '0 0 28 14');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', PETAL_PATH);
      path.setAttribute('fill', color);
      svg.appendChild(path);

      const el = document.createElement('div');
      el.className = 'petal';
      el.style.cssText = `
        left: ${x - size / 2}px;
        top: ${y - size / 4}px;
        width: ${size}px;
        height: auto;
        --p-opacity: ${opacity};
        --p-rot0: ${rot0}deg;
        --p-rot1: ${rot1}deg;
        --p-tx: ${tx}px;
        --p-ty: ${ty}px;
        opacity: ${opacity};
        animation: petalDrift ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
      `;
      el.appendChild(svg);
      document.body.appendChild(el);
      active.push(el);

      el.addEventListener('animationend', () => {
        el.remove();
        const idx = active.indexOf(el);
        if (idx !== -1) active.splice(idx, 1);
      }, { once: true });
    }

    function onMouseMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastSpawn < 80) return;
      lastSpawn = now;
      spawnPetal(e.clientX, e.clientY);
    }

    function onTouchMove(e: TouchEvent) {
      const now = Date.now();
      if (now - lastSpawn < 80) return;
      lastSpawn = now;
      const t = e.touches[0];
      spawnPetal(t.clientX, t.clientY);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      active.forEach(el => el.remove());
    };
  }, []);
}
