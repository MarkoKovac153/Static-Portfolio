// Dropdown logic for all sections

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-target'));
            if (target) {
                target.classList.toggle('open');
            }
            this.blur(); // Remove focus highlight after click
        });
        // Optionally, open all dropdowns by default
        const target = document.querySelector(btn.getAttribute('data-target'));
        if (target) target.classList.add('open');
    });
}); 