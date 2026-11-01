const imageUrl = localStorage.getItem("windowImageUrl");
const image = document.getElementById("generated-landscape");

if (imageUrl) {
    image.src = imageUrl;
    image.addEventListener("error", () => {
        image.removeAttribute("src");
        alert("The generated image could not be loaded. Please generate a new window.");
        localStorage.removeItem("windowImageUrl");
        window.location.href = "index.html";
    }, { once: true });
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
