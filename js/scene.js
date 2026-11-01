const imageUrl = localStorage.getItem("windowImageUrl");
const image = document.getElementById("generated-landscape");

if (imageUrl) {
    image.src = imageUrl;
} else {
    alert("No generated image found.");
    window.location.href = "index.html";
}