
document.addEventListener('DOMContentLoaded', function() {
  const solutionToggleButtons = document.querySelectorAll('.toggle-solution-button');

  solutionToggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const solutionDiv = this.nextElementSibling;
      if (solutionDiv && solutionDiv.classList.contains('solution')) {
        if (solutionDiv.style.display === 'none' || solutionDiv.style.display === '') {
          solutionDiv.style.display = 'block';
          this.textContent = 'Hide Solution';
        } else {
          solutionDiv.style.display = 'none';
          this.textContent = 'Show Solution';
        }
      }
    });
  });
});
