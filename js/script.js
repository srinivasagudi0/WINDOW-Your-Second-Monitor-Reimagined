const openWindowButton = document.getElementById("open-window");

openWindowButton.addEventListener("click", async () => {
    const preferences = {
        scenery: document.getElementById("scenery").value,
        time: document.getElementById("time").value,
        weather: document.getElementById("weather").value,
        frame: document.getElementById("frame-type").value
    };

    localStorage.setItem("windowPreferences", JSON.stringify(preferences));
    const response = await fetch("/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(preferences)
    });
    const result = await response.json();

    if (!response.ok) {
        alert(result.error || "An error occurred while generating the window.");
        return;
    }
    localStorage.setItem("windowImageUrl", result.image_url);
    window.location.href = "scene.html";

});