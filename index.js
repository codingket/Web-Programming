
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");

const cards = document.querySelectorAll(".stall-card");

function filterCards() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const location = locationFilter.value;

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const cardCategory = card.dataset.category;
        const cardLocation = card.dataset.location;

        const matchSearch = name.includes(searchText);
        const matchCategory = (category === "all" || cardCategory === category);
        const matchLocation = (location === "all" || cardLocation === location);

        if (matchSearch && matchCategory && matchLocation) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", filterCards);
categoryFilter.addEventListener("change", filterCards);
locationFilter.addEventListener("change", filterCards);
