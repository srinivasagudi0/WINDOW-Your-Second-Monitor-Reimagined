const openWindowButton = document.getElementById("open-window");
const API_BASE_URL = "https://window-your-second-monitor-reimagined.onrender.com";

openWindowButton.addEventListener("click", async () => {
    const preferences = {
        scenery: document.getElementById("scenery").value,
        time: document.getElementById("time").value,
        weather: document.getElementById("weather").value,
        frame: document.getElementById("frame-type").value,
        width: window.innerWidth,
        height: window.innerHeight
    };
    openWindowButton.disabled = true;
    openWindowButton.textContent = "Generating...";
    try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(preferences)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(result.error || "Generation failed");
        }
        localStorage.setItem(
            "windowPreferences",
            JSON.stringify(preferences)
        );
        localStorage.setItem(
            "windowImageUrl",
            result.image_url
        );
        window.location.href = "scene.html";

    } catch (error) {

        console.error(error);
        alert(error.message);

        openWindowButton.disabled = false;
        openWindowButton.textContent = "Open My Window";
    }

});
