
document.addEventListener("DOMContentLoaded", function () {
    // پیمایش نرم بین بخش‌های سایت
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

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

    // ظاهر شدن کارت‌ها هنگام اسکرول
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

    // اشتراک‌گذاری سایت
    const shareButton = document.getElementById("shareSite");

    if (shareButton) {
        shareButton.addEventListener("click", async function () {
            const siteLink = window.location.href;
            const shareData = {
                title: "Danial | نمونه‌کارهای شخصی",
                text: "وب‌سایت شخصی دانیال؛ طراحی سایت و پروژه‌های خلاقانه",
                url: siteLink
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    copySiteLink(siteLink);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    copySiteLink(siteLink);
                }
            }
        });
    }

    // کپی لینک سایت با روش جایگزین
    async function copySiteLink(link) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(link);
                alert("لینک سایت کپی شد! حالا می‌تونی برای دیگران بفرستی.");
                return;
            }
        } catch (error) {
            // در صورت خطا، از روش جایگزین استفاده می‌کنیم
        }

        window.prompt("لینک سایت رو انتخاب و کپی کن:", link);
    }

    // دکمه برگشت به بالای صفحه
    const backToTopButton = document.getElementById("backToTop");

    if (backToTopButton) {
        function updateBackToTopButton() {
            if (window.scrollY > 200) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        }

        window.addEventListener("scroll", updateBackToTopButton, {
            passive: true
        });

        // بررسی وضعیت هنگام باز شدن صفحه
        updateBackToTopButton();

        backToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});