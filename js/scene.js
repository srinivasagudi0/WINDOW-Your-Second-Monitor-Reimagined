const imageUrl = localStorage.getItem("windowImageUrl");

const image = document.getElementById("generated-landscape");

if (image && imageUrl) {
    image.src = imageUrl;
}