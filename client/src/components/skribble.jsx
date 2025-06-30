import React, { useRef, useEffect, useState } from 'react';
import "./Skribble.css";

export default function Skribble() {
  const canvasRef = useRef(null);
  const colorRef = useRef(null);
  const [color, setColor] = useState('#00FF00');
  const [drawing, setDrawing] = useState(false);
  const [keysDown, setKeysDown] = useState({});

  useEffect(() => {
      const handleKeyUp = (e) => {
        setKeysDown(prev => ({ ...prev, [e.key]: false }));
      };
      const handleKeyDown = (e) => {
        setKeysDown(prev => ({ ...prev, [e.key]: true }));
        if (e.key === 'c') {
          e.preventDefault();
          clearCanvas();

        }
      };
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const startDrawing = (e) => {
      setDrawing(true);
      draw(e);
    };

    const stopDrawing = () => {
    //   setDrawing(false);
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!drawing || !e.shiftKey) {    
      ctx.beginPath();
      ctx.moveTo(x, y);
      return;
    };
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = color;

      const { x, y } = getPos(e);

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    // Event Listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mousemove', draw);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchend', stopDrawing);
      canvas.removeEventListener('touchmove', draw);
    };
  }, [color, drawing]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="skribble-container">
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="color"
          ref={colorRef}
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={clearCanvas} style={{ marginLeft: '1rem' }}>
          Clear
        </button>
      </div>
  
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} className="skribble-canvas"></canvas>
      </div>
    </div>
  );
  }  