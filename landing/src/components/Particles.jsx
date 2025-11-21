import React, { useRef, useEffect } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

const Particles = ({
    particleCount = 200,
    particleSize = 2,
    speed = 0.05,
    color = '#ffffff',
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const renderer = new Renderer({
            alpha: true,
            depth: false,
            dpr: 2
        });
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);

        const camera = new Camera(gl, { fov: 35 });
        camera.position.set(0, 0, 10);

        const resize = () => {
            renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        };
        window.addEventListener('resize', resize, false);
        resize();

        // Create particles
        const count = particleCount;
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            randoms[i * 3] = Math.random();
            randoms[i * 3 + 1] = Math.random();
            randoms[i * 3 + 2] = Math.random();
        }

        const geometry = new Geometry(gl, {
            position: { size: 3, data: positions },
            random: { size: 3, data: randoms },
        });

        const vertex = `
      attribute vec3 position;
      attribute vec3 random;
      uniform float uTime;
      uniform float uSpeed;
      uniform float uSize;
      uniform vec3 uColor;
      
      varying vec3 vColor;
      
      void main() {
        vColor = uColor;
        
        // Simple movement
        vec3 pos = position;
        pos.y += uTime * uSpeed * random.y;
        pos.x += sin(uTime * uSpeed + random.x * 10.0) * 0.1;
        
        // Wrap around
        if (pos.y > 5.0) pos.y -= 10.0;
        if (pos.y < -5.0) pos.y += 10.0;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = uSize * (10.0 / gl_Position.w);
      }
    `;

        const fragment = `
      precision highp float;
      varying vec3 vColor;
      
      void main() {
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        float r = dot(cxy, cxy);
        if (r > 1.0) discard;
        
        gl_FragColor = vec4(vColor, 1.0 - r * 0.5); // Soft edge
      }
    `;

        // Parse color string to vec3
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [
                parseInt(result[1], 16) / 255,
                parseInt(result[2], 16) / 255,
                parseInt(result[3], 16) / 255
            ] : [1, 1, 1];
        };

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: speed },
                uSize: { value: particleSize },
                uColor: { value: hexToRgb(color) },
            },
            transparent: true,
        });

        const points = new Mesh(gl, { mode: gl.POINTS, geometry, program });

        let animationId;
        const update = (t) => {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene: points, camera });
        };
        animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
            if (containerRef.current && gl.canvas) {
                containerRef.current.removeChild(gl.canvas);
            }
        };
    }, [particleCount, particleSize, speed, color]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0
            }}
        />
    );
};

export default Particles;
