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

ctx.fillStyle = "#64748b";
ctx.beginPath();

ctx.moveTo(0, canvas.height * 0.7);
ctx.lineTo(canvas.width * 0.15, canvas.height * 0.3);
ctx.lineTo(canvas.width * 0.3, canvas.height * 0.7);
ctx.lineTo(canvas.width * 0.5, canvas.height * 0.25);
ctx.lineTo(canvas.width * 0.7, canvas.height * 0.7);
ctx.lineTo(canvas.width * 0.85, canvas.height * 0.35);
ctx.lineTo(canvas.width, canvas.height * 0.7);

ctx.lineTo(canvas.width, canvas.height);
ctx.lineTo(0, canvas.height);

ctx.closePath();
ctx.fill();

// Green hills
ctx.fillStyle = "#166534";
ctx.beginPath();

ctx.moveTo(0, canvas.height * 0.75);

ctx.quadraticCurveTo(
    canvas.width * 0.5,
    canvas.height * 0.5,
    canvas.width,
    canvas.height * 0.8
);

ctx.lineTo(canvas.width, canvas.height);
ctx.lineTo(0, canvas.height);

ctx.closePath();
ctx.fill();