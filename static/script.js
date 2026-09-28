
document.addEventListener("DOMContentLoaded", function () {
    // پیمایش نرم بین بخش‌های سایت
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (targetId && targetId.length > 1) {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // افکت ظاهر شدن کارت‌ها هنگام اسکرول
    const cards = document.querySelectorAll(".project-card");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        cards.forEach(function (card) {
            card.classList.add("reveal");
            observer.observe(card);
        });
    }
});