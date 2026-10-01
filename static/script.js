
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

    // دکمه اشتراک‌گذاری سایت
    const shareButton = document.getElementById("shareSite");

    if (shareButton) {
        shareButton.addEventListener("click", async function () {
            const shareData = {
                title: "Danial | نمونه‌کارهای شخصی",
                text: "وب‌سایت شخصی دانیال؛ طراحی سایت و پروژه‌های خلاقانه",
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(shareData.url);
                    alert("لینک سایت کپی شد! می‌تونی برای دیگران بفرستی.");
                } else {
                    window.prompt("لینک سایتت رو کپی کن:", shareData.url);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    alert("اشتراک‌گذاری انجام نشد. دوباره امتحان کن.");
                }
            }
        });
    }

    // دکمه برگشت به بالای صفحه
    const backToTopButton = document.getElementById("backToTop");

    if (backToTopButton) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        });

        backToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});