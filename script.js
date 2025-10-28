// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const iconHamburger = document.getElementById("iconHamburger");
const iconClose = document.getElementById("iconClose");

mobileMenuButton.addEventListener("click", () => {
    const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true";

    mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("hidden");
    iconHamburger.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
});

// Mobile dropdown functionality
const dropdownButtons = document.querySelectorAll(".mobile-dropdown-btn");

dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);
        const arrow = button.querySelector(".dropdown-arrow");

        // Toggle the specific dropdown
        targetContent.classList.toggle("hidden");
        arrow.classList.toggle("rotate-180");
    });
});

// Desktop dropdown functionality
const dropdownGroups = document.querySelectorAll(".dropdown-group");
dropdownGroups.forEach((group) => {
    const ul = group.querySelector("ul");
    group.addEventListener("mouseenter", () => {
        ul.classList.remove("invisible", "opacity-0", "translate-y-2");
        ul.classList.add("visible", "opacity-100", "translate-y-0");
    });
    group.addEventListener("mouseleave", () => {
        ul.classList.remove("visible", "opacity-100", "translate-y-0");
        ul.classList.add("invisible", "opacity-0", "translate-y-2");
    });
});

// Blog Carousel
let blogCurrentPosition = 0;
const blogCarousel = document.getElementById("blog-carousel");
const blogPrevBtn = document.getElementById("blog-prev-btn");
const blogNextBtn = document.getElementById("blog-next-btn");
let cardWidth = 320; // default
let gap = 24; // default
let scrollAmount = cardWidth + gap;
const totalCards = 4;
let visibleCards = window.innerWidth >= 1024 ? 3 : 1; // Show 3 on desktop, 1 on mobile
let maxPosition = (totalCards - visibleCards) * scrollAmount;

function updateCardDimensions() {
    cardWidth =
        window.innerWidth >= 1024
            ? 340
            : window.innerWidth >= 768
                ? 340
                : window.innerWidth >= 640
                    ? 320
                    : 280;
    const style = getComputedStyle(blogCarousel);
    gap = parseFloat(style.gap) || 24;
    scrollAmount = cardWidth + gap;
    maxPosition = (totalCards - visibleCards) * scrollAmount;
}

function updateBlogCarousel() {
    blogCarousel.style.transform = `translateX(-${blogCurrentPosition}px)`;

    // Disable buttons at limits
    blogPrevBtn.style.opacity = blogCurrentPosition <= 0 ? "0.5" : "1";
    blogNextBtn.style.opacity =
        blogCurrentPosition >= maxPosition ? "0.5" : "1";
}

function blogNext() {
    if (blogCurrentPosition < maxPosition) {
        blogCurrentPosition += scrollAmount;
        updateBlogCarousel();
    }
}

function blogPrev() {
    if (blogCurrentPosition > 0) {
        blogCurrentPosition -= scrollAmount;
        updateBlogCarousel();
    }
}

// Event listeners for blog carousel
blogNextBtn.addEventListener("click", blogNext);
blogPrevBtn.addEventListener("click", blogPrev);

// Update on window resize
window.addEventListener("resize", () => {
    const newVisibleCards = window.innerWidth >= 1024 ? 3 : 1;
    if (newVisibleCards !== visibleCards) {
        visibleCards = newVisibleCards;
        updateCardDimensions();
        blogCurrentPosition = 0;
        updateBlogCarousel();
    }
});

// Initial update
updateCardDimensions();
updateBlogCarousel();

// FAQ Toggle
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector("svg path");
    answer.classList.toggle("hidden");
    if (answer.classList.contains("hidden")) {
        // collapsed, plus
        icon.setAttribute(
            "d",
            "M18 14V26M12 20H24M33 20C33 28.2843 26.2843 35 18 35C9.71573 35 3 28.2843 3 20C3 11.7157 9.71573 5 18 5C26.2843 5 33 11.7157 33 20Z"
        );
        icon.setAttribute("stroke", "#7D7D7D");
    } else {
        // expanded, minus
        icon.setAttribute(
            "d",
            "M12 20H24M33 20C33 28.2843 26.2843 35 18 35C9.71573 35 3 28.2843 3 20C3 11.7157 9.71573 5 18 5C26.2843 5 33 11.7157 33 20Z"
        );
        icon.setAttribute("stroke", "#323232");
    }
}