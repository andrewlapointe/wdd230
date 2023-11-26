document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById('weekly-banner');
    const closeButton = document.getElementById('close-banner');
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 3) {
        banner.style.display = 'block';
    }

    closeButton.addEventListener('click', function() {
        banner.style.display = 'none';
    });
});
