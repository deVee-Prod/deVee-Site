import { useEffect, useRef } from 'react';

export function EnergyParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only run on desktop
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isMouseMoving = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      // Find the parent section to match its dimensions
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        mouse = { x: canvas.width / 2, y: canvas.height / 2 };
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;

      constructor(startX: number, startY: number, targetX: number, targetY: number) {
        this.x = startX;
        this.y = startY;
        
        // Calculate direction to mouse
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Speed and scatter
        const speed = Math.random() * 3 + 2;
        const scatter = 0.5;
        
        // Velocity vector + random scatter
        this.vx = (dx / distance) * speed + (Math.random() - 0.5) * speed * scatter;
        this.vy = (dy / distance) * speed + (Math.random() - 0.5) * speed * scatter;
        
        this.size = Math.random() * 2 + 1;
        this.maxLife = Math.random() * 60 + 30; // Frames
        this.life = this.maxLife;
        
        // Orange / Gold / Yellow colors
        const colors = ['#f97316', '#fbbf24', '#f59e0b', '#fb923c'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        // Shrink over time
        this.size = Math.max(0, this.size * 0.98);
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        const alpha = this.life / this.maxLife;
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.fill();
        
        // Reset
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to canvas
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      isMouseMoving = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      // Start slightly above the true center to match the portrait's visual center
      const centerY = canvas.height / 2 - 50; 

      // Spawn new particles if mouse is moving and distance > threshold
      const distToCenter = Math.sqrt(Math.pow(mouse.x - centerX, 2) + Math.pow(mouse.y - centerY, 2));
      
      if (isMouseMoving && distToCenter > 100) {
        // Spawn multiple particles per frame
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(centerX, centerY, mouse.x, mouse.y));
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
