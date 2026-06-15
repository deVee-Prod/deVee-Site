import { useEffect, useRef } from 'react';

export function EnergyParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isMouseMoving = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        mouse = { x: canvas.width / 2, y: canvas.height / 2 };
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Lightning bolt class
    class Bolt {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      life: number;
      maxLife: number;
      segments: { x: number; y: number }[];
      color: string;
      thickness: number;

      constructor(startX: number, startY: number, endX: number, endY: number) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.life = Math.random() * 15 + 10; // Flash very quickly
        this.maxLife = this.life;
        
        // Massive colors
        const colors = ['#f97316', '#fbbf24', '#f59e0b', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.thickness = Math.random() * 3 + 1;

        this.segments = this.generateSegments();
      }

      generateSegments() {
        const segments = [];
        segments.push({ x: this.startX, y: this.startY });

        const dist = Math.hypot(this.endX - this.startX, this.endY - this.startY);
        const steps = Math.floor(dist / 30) + 2; // Segment length approx 30px
        
        let currentX = this.startX;
        let currentY = this.startY;

        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          const targetX = this.startX + (this.endX - this.startX) * t;
          const targetY = this.startY + (this.endY - this.startY) * t;
          
          // Add crazy jaggedness
          const jitter = dist * 0.15; // Max 15% displacement
          currentX = targetX + (Math.random() - 0.5) * jitter;
          currentY = targetY + (Math.random() - 0.5) * jitter;
          
          if (i === steps) {
            currentX = this.endX;
            currentY = this.endY;
          }
          
          segments.push({ x: currentX, y: currentY });
        }
        return segments;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        
        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length; i++) {
          ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }

        const alpha = this.life / this.maxLife;
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'miter';
        
        // Massive Glow
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#f97316'; // Orange glow always
        
        ctx.globalAlpha = alpha;
        ctx.stroke();
        
        // Inner white core for realism
        if (this.thickness > 2) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      }
    }

    let bolts: Bolt[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      isMouseMoving = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isMouseMoving = false;
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Fade out effect for cool trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; // Instead of clearRect, draw semi-transparent black
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Spawn lightning when mouse moves
      if (isMouseMoving && Math.random() < 0.4) {
        // Main bolt to mouse
        bolts.push(new Bolt(centerX, centerY, mouse.x, mouse.y));
        
        // 2-3 stray bolts shooting all over the screen to fill the space
        for(let i=0; i < 2; i++) {
            const randomEdgeX = Math.random() < 0.5 ? 0 : canvas.width;
            const randomEdgeY = Math.random() * canvas.height;
            bolts.push(new Bolt(centerX, centerY, randomEdgeX, randomEdgeY));
        }
      }

      // Draw and update
      for (let i = bolts.length - 1; i >= 0; i--) {
        bolts[i].draw(ctx);
        bolts[i].life--;
        if (bolts[i].life <= 0) {
          bolts.splice(i, 1);
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
      style={{ mixBlendMode: 'screen', opacity: 0.8 }}
    />
  );
}
