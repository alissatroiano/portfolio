const canvas = document.getElementById('waterCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;

const waves = [];
const waveCount = 25;

for (let i = 0; i < waveCount; i++) {
    waves.push({
        y: (canvas.height / 2) - 100 + Math.random() * 200,
        length: 0.01 + Math.random() * 0.001,
        amplitude: 50 + Math.random() * 100,
        frequency: 0.01 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2
    });
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        for (let i = 0; i < canvas.width; i++) {
            const yOffset = Math.sin(i * wave.length + wave.phase) * wave.amplitude * Math.sin(wave.phase);
            ctx.lineTo(i, wave.y + yOffset);
        }
        ctx.strokeStyle = `hsl(180, 100%, 50%)`;
        ctx.stroke();
        wave.phase += wave.frequency;
    });
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
    waves.forEach((wave) => {
        wave.y = (canvas.height / 2) - 100 + Math.random() * 200;
    });
});
