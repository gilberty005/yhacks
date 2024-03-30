import React, { useEffect, useRef, useState } from 'react';

export default function Voronoi({ imageUrl }) {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const width = 500; 
    const height = 600; 
    const n = Math.round(width * height / 40); 
    let i = 0;
    const context = canvasRef.current.getContext('2d');
    const workerScript = URL.createObjectURL(new Blob([`
      importScripts("https://cdn.observableusercontent.com/npm/d3-delaunay@6.0.4/dist/d3-delaunay.min.js");

      onmessage = event => {
        const { data: { data, width, height, n } } = event;
        const points = new Float64Array(n * 2);
        const c = new Float64Array(n * 2);
        const s = new Float64Array(n);

        // Initialize the points using rejection sampling.
        for (let i = 0; i < n; ++i) {
          for (let j = 0; j < 30; ++j) {
            const x = points[i * 2] = Math.floor(Math.random() * width);
            const y = points[i * 2 + 1] = Math.floor(Math.random() * height);
            if (Math.random() < data[y * width + x]) break;
          }
        }

        const delaunay = new d3.Delaunay(points);
        const voronoi = delaunay.voronoi([0, 0, width, height]);

        for (let k = 0; k < 80; ++k) {
          // Compute the weighted centroid for each Voronoi cell.
          c.fill(0);
          s.fill(0);
          for (let y = 0, i = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
              const w = data[y * width + x];
              i = delaunay.find(x + 0.5, y + 0.5, i);
              s[i] += w;
              c[i * 2] += w * (x + 0.5);
              c[i * 2 + 1] += w * (y + 0.5);
            }
          }

          // Relax the diagram by moving points to the weighted centroid.
          // Wiggle the points a little bit so they don't get stuck.
          const w = Math.pow(k + 1, -0.8) * 10;
          for (let i = 0; i < n; ++i) {
            const x0 = points[i * 2], y0 = points[i * 2 + 1];
            const x1 = s[i] ? c[i * 2] / s[i] : x0, y1 = s[i] ? c[i * 2 + 1] / s[i] : y0;
            points[i * 2] = x0 + (x1 - x0) * 1.8 + (Math.random() - 0.5) * w;
            points[i * 2 + 1] = y0 + (y1 - y0) * 1.8 + (Math.random() - 0.5) * w;
          }

          postMessage(points);
          voronoi.update();
        }
      };
    `], { type: 'text/javascript' }));

    const worker = new Worker(workerScript);

    const img = new Image();
    // source image
    img.src = imageUrl;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      context.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      const { data: rgba } = context.getImageData(0, 0, width, height);
      const data = new Float64Array(width * height);

      for (let i = 0, len = rgba.length / 4; i < len; ++i) {
        data[i] = Math.max(0, 1 - rgba[i * 4] / 254);
      }

      data.width = width;
      data.height = height;

      worker.postMessage({ data, width, height, n });
      setImageLoaded(true); 
    };

    worker.addEventListener('message', ({ data }) => {
      setPoints(data);
    });

    return () => {
      worker.terminate();
      URL.revokeObjectURL(workerScript);
    };
  }, []);

  useEffect(() => {
    if (imageLoaded && imageLoaded && points.length > 0) {
      const context = canvasRef.current.getContext('2d');
      if(imageLoaded == true){
        canvasRef.current.style.display = 'block'; 
      }
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const gradient = context.createLinearGradient(0, 0, canvasRef.current.width, 0); 
      gradient.addColorStop(0, '#488B8A');   
      gradient.addColorStop(1, '#9B75D9'); 

      context.fillStyle = gradient;
      canvasRef.current.style.display = 'content';
      // TODO: adjust the speed of the points forming 
      for (let i = 0; i < points.length; i += 2) {
        const x = points[i];
        const y = points[i + 1];

        context.beginPath();
        context.arc(x, y, 1.5, 0, 2 * Math.PI);
        context.fill();
      }
    }
  }, [imageLoaded,imageLoaded, points]);

  return <canvas ref={canvasRef} width="500" height="600" style={{ display: 'none' }}/>;
}
