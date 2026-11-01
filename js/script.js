const openWindowButton = document.getElementById("open-window");

openWindowButton.addEventListener("click", () => {
    const preferences = {
        scenery: document.getElementById("scenery").value,
        time: document.getElementById("time").value,
        weather: document.getElementById("weather").value,
        frame: document.getElementById("frame-type").value
    };

    localStorage.setItem("windowPreferences", JSON.stringify(preferences));

    window.location.href = "scene.html";
});