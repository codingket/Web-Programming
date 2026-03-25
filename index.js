
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


const items = [
    { name: "Filter Coffee", stall: "Madras Filter Coffee", link: "madras.html" },
    { name: "Premium Coffee", stall: "Madras Filter Coffee", link: "madras.html" },
    { name: "Cold Coffee", stall: "Madras Filter Coffee", link: "madras.html" },
    { name: "Oreo Milkshake", stall: "Madras Filter Coffee", link: "madras.html" },
    { name: "Samosa", stall: "Madras Filter Coffee", link: "madras.html" },

    { name: "Ice Cream", stall: "Amul Ice Cream", link: "amul.html" },
    { name: "Pizza", stall: "Dominos Pizza", link: "dominos.html" },
    { name: "Coffee", stall: "Nescafe", link: "nescafe.html" }
];

const resultsContainer = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = "";

    if (query === "") return;

    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = "<p>No items found</p>";
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("result-item");
        div.innerHTML = `<strong>${item.name}</strong> - ${item.stall}`;

        div.onclick = () => {
            window.location.href = item.link;
        };

        resultsContainer.appendChild(div);
    });
});