
const searchInput = document.getElementById("menuSearch");
const items = document.querySelectorAll(".food-card");

searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    items.forEach(item => {
        const name = item.dataset.name.toLowerCase();

        if (name.includes(query)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
});
