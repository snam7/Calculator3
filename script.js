document.addEventListener('DOMContentLoaded', function() {
  const addRowBtn = document.getElementById('add-row-btn');
  const courseRows = document.getElementById('course-rows');
  const calculateBtn = document.getElementById('calculate-btn');
  const resetBtn = document.getElementById('reset-btn');
  const gpaValue = document.getElementById('gpa-value');

  // Grade to GPA point mapping
  const gradeToPoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
  };

  // Function to add a new row
  function addRow() {
      // Create a new row
      const row = document.createElement('tr');

      // Checkbox cell
      const checkboxCell = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkboxCell.appendChild(checkbox);

      // Course name cell
      const courseCell = document.createElement('td');
      const courseInput = document.createElement('input');
      courseInput.type = 'text';
      courseInput.placeholder = 'Course name';
      courseCell.appendChild(courseInput);

      // Grade cell (dropdown)
      const gradeCell = document.createElement('td');
      const gradeSelect = document.createElement('select');
      const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
      grades.forEach(grade => {
          const option = document.createElement('option');
          option.value = grade;
          option.textContent = grade;
          gradeSelect.appendChild(option);
      });
      gradeCell.appendChild(gradeSelect);

      // Credits cell
      const creditsCell = document.createElement('td');
      const creditsInput = document.createElement('input');
      creditsInput.type = 'number';
      creditsInput.min = '0';
      creditsInput.step = '0.5';
      creditsCell.appendChild(creditsInput);

      // Delete row button
      const deleteCell = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.textContent = 'X';
      deleteBtn.addEventListener('click', () => {
          row.remove();
      });
      deleteCell.appendChild(deleteBtn);

      // Append all cells to the row
      row.appendChild(checkboxCell);
      row.appendChild(courseCell);
      row.appendChild(gradeCell);
      row.appendChild(creditsCell);
      row.appendChild(deleteCell);

      // Append the row to the table body
      courseRows.appendChild(row);
  }

  // Event listener for adding rows
  addRowBtn.addEventListener('click', addRow);

  // Add an initial row when the page loads
  addRow();

  // Function to calculate GPA
  function calculateGPA() {
      let totalGradePoints = 0;
      let totalCredits = 0;
      const rows = document.querySelectorAll('#course-rows tr');

      rows.forEach(row => {
          const checkbox = row.querySelector('input[type="checkbox"]');
          const gradeSelect = row.querySelector('select');
          const creditsInput = row.querySelector('input[type="number"]');

          if (checkbox.checked && creditsInput.value) {
              const grade = gradeSelect.value;
              const credits = parseFloat(creditsInput.value);
              const gradePoints = gradeToPoints[grade] * credits;

              totalGradePoints += gradePoints;
              totalCredits += credits;
          }
      });

      if (totalCredits > 0) {
          const gpa = totalGradePoints / totalCredits;
          gpaValue.textContent = gpa.toFixed(2); // Display GPA with 2 decimal places
      } else {
          gpaValue.textContent = '0.00';
      }
  }

  // Event listener for calculating GPA
  calculateBtn.addEventListener('click', calculateGPA);

  // Function to reset all fields
  function resetFields() {
      const rows = document.querySelectorAll('#course-rows tr');

      rows.forEach(row => {
          const checkbox = row.querySelector('input[type="checkbox"]');
          const courseInput = row.querySelector('input[type="text"]');
          const creditsInput = row.querySelector('input[type="number"]');
          const gradeSelect = row.querySelector('select');

          // Reset checkbox
          checkbox.checked = false;
          // Clear text inputs
          courseInput.value = '';
          creditsInput.value = '';
          // Reset dropdown to default
          gradeSelect.selectedIndex = 0; // This assumes the first option is the default
      });

      // Reset GPA display
      gpaValue.textContent = '0.00';
  }

  // Event listener for reset button
  resetBtn.addEventListener('click', resetFields);
});
