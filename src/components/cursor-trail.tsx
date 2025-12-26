"use client";

import { useEffect, useRef } from "react";

type Point = {
    x: number;
    y: number;
    time: number;
};

export const CursorTrail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<Point[]>([]);
    const lastMouseRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        const foreground =
            getComputedStyle(document.documentElement)
                .getPropertyValue("--foreground")
                .trim() || "#e5e7eb";

        const WINDOW_MS = 1000;
        const MIN_DISTANCE = 1;
        const INTERP_STEP = 2;
        const CURSOR_RADIUS = 2.5;

        const CURSOR_OFFSET_X = 2;
        const CURSOR_OFFSET_Y = 2;

        const onMove = (e: MouseEvent) => {
            const now = performance.now();
            const x = e.clientX;
            const y = e.clientY;

            lastMouseRef.current = { x, y };

            const last = pointsRef.current.at(-1);

            if (!last) {
                pointsRef.current.push({ x, y, time: now });
                return;
            }

            const dx = x - last.x;
            const dy = y - last.y;
            const dist = Math.hypot(dx, dy);

            if (dist < MIN_DISTANCE) return;

            const steps = Math.floor(dist / INTERP_STEP);
            for (let i = 1; i <= steps; i++) {
                const t = i / (steps + 1);
                pointsRef.current.push({
                    x: last.x + dx * t,
                    y: last.y + dy * t,
                    time: now,
                });
            }

            pointsRef.current.push({ x, y, time: now });
        };

        window.addEventListener("mousemove", onMove, { passive: true });

        const draw = () => {
            const now = performance.now();

            pointsRef.current = pointsRef.current.filter(
                (p) => now - p.time <= WINDOW_MS
            );

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const pts = pointsRef.current;

            if (pts.length > 1) {
                ctx.strokeStyle = foreground;
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(pts[0].x, pts[0].y);

                for (let i = 1; i < pts.length - 1; i++) {
                    const midX = (pts[i].x + pts[i + 1].x) / 2;
                    const midY = (pts[i].y + pts[i + 1].y) / 2;
                    ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
                }

                ctx.lineTo(pts.at(-1)!.x, pts.at(-1)!.y);
                ctx.stroke();
            }

            if (lastMouseRef.current) {
                const { x, y } = lastMouseRef.current;
                ctx.beginPath();
                ctx.arc(
                    x + CURSOR_OFFSET_X,
                    y + CURSOR_OFFSET_Y,
                    CURSOR_RADIUS,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = foreground;
                ctx.fill();
            }

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
        />
    );
};
