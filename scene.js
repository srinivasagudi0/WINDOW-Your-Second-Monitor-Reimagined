const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sky = ctx.createLinearGradient(100, 0, 0, canvas.height);
sky.addColorStop(0, '#1e3a8a');
sky.addColorStop(1, '#87ceeb');
ctx.fillStyle = sky;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
ctx.arc(
    canvas.width * 0.8,
    canvas.height * 0.2,
    50,
    0,
    Math.PI * 2
);
ctx.fillStyle = "#FFD700";
ctx.fill();
