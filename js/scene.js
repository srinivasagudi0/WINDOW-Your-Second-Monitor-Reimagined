const imageUrl = localStorage.getItem("windowImageUrl");
const image = document.getElementById("generated-landscape");

if (imageUrl) {
    image.src = imageUrl;
} else {
    alert("No generated image found.");
    window.location.href = "index.html";
}

const preferences = JSON.parse(
    localStorage.getItem("windowPreferences") || "{}"
);

const frame = document.getElementById("window-frame");

const allowedFrames = ["frameless", "wooden", "modern", "vintage"];

frame.className = allowedFrames.includes(preferences.frame)
    ? preferences.frame
    : "frameless";