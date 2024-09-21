document.addEventListener('DOMContentLoaded', () => {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    let editingIndex = null;

    // Render employee list on the dashboard
    function renderEmployeeList() {
        const employeeList = document.querySelector('#employee-table tbody');
        employeeList.innerHTML = '';

        employees.forEach((employee, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.position}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            `;
            employeeList.appendChild(row);
        });
    }

    // Handle form submission (add or update employee)
    function handleFormSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('empname').value;
        const email = document.getElementById('empemail').value;
        const position = document.getElementById('empposition').value;

        const employee = { name, email, position };

        if (editingIndex !== null) {
            // Update the existing employee details
            employees[editingIndex] = employee;
            editingIndex = null; // Reset editing index
        } else {
            // Add new employee
            employees.push(employee);
        }

        localStorage.setItem('employees', JSON.stringify(employees));
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }

    // Edit employee function
    window.editEmployee = function(index) {
        editingIndex = index;
        localStorage.setItem('editingIndex', index); // Store the index
        window.location.href = 'update.html'; // Redirect to update page
    };

    // Delete employee function
    window.deleteEmployee = function(index) {
        employees.splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(employees));
        renderEmployeeList(); // Re-render the list
    };

    // Check which page is loaded
    if (window.location.href.includes('dashboard.html')) {
        renderEmployeeList();
    }

    if (window.location.href.includes('update.html')) {
        const storedIndex = localStorage.getItem('editingIndex');

        if (storedIndex !== null) {
            editingIndex = parseInt(storedIndex); // Retrieve the index
            const employee = employees[editingIndex];
            document.getElementById('empname').value = employee.name;
            document.getElementById('empemail').value = employee.email;
            document.getElementById('empposition').value = employee.position;

            localStorage.removeItem('editingIndex'); // Clear the editing index
        }

        document.getElementById('employee-form').addEventListener('submit', handleFormSubmit);
    }

    // For the add page
    if (window.location.href.includes('add.html')) {
        document.getElementById('employee-form').addEventListener('submit', handleFormSubmit);
    }
});
