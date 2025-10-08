// Courses Page Filtering
document.addEventListener('DOMContentLoaded', function () {
    const departmentSelect = document.getElementById('departmentSelect');
    const courseCards = document.querySelectorAll('.course-card');

    departmentSelect.addEventListener('change', function () {
        const selectedDepartment = this.value;

        courseCards.forEach(card => {
            if (selectedDepartment === '' || card.dataset.department === selectedDepartment) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});