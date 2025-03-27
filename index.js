document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  attachMenuEvents();
});

async function loadHeaderFooter() {

  try {
    const response = await fetch("index.html");
    if (!response.ok) throw new Error("Failed to fetch index.html");

    const text = await response.text();
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;

    document.getElementById("header-container").innerHTML = tempDiv.querySelector("header")?.outerHTML || "";
    document.getElementById("footer-container").innerHTML = tempDiv.querySelector("footer")?.outerHTML || "";
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
}

function attachMenuEvents() {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector("#close_btn");
  const menu = document.querySelector(".menu");

  if (menuToggle && closeBtn && menu) {
    menuToggle.addEventListener("click", () => menu.classList.toggle("active"));
    closeBtn.addEventListener("click", () => menu.classList.toggle("active"));
  }
}


// Event listeners for role buttons
document.getElementById("adminButton").addEventListener("click", showPasswordField);
document.getElementById("workerButton").addEventListener("click", showPasswordField);
document.getElementById("customerButton").addEventListener("click", showCustomerSection);

function showPasswordField(role) {
    const passwordField = document.getElementById("passwordField");
    const loginForm = document.getElementById("loginForm");

    // Hide the role selection buttons and show the password input field
    document.getElementById("welcomeCard").style.display = "none";
    passwordField.classList.remove("hidden");

    // Set the form action based on the role
    if (role === "admin") {
        loginForm.action = "Admin"; // Submit to AdminMain servlet
    } else if (role === "worker") {
        loginForm.action = "EmpPwd"; // Submit to WorkerMain servlet
    }
}

function togglePassword() {
  let passwordField = document.getElementById("password"); // Selects the password input field
  let eyeIcon = document.querySelector(".eye-icon"); // Selects the eye icon

  if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye"); // Show open eye
  } else {
      passwordField.type = "password";
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash"); // Show closed eye
  }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded. Attaching form validations...");

    // Helper function to display error messages
    function showError(inputElement, message) {
        const parentTd = inputElement.closest('td');
        const errorDiv = parentTd.querySelector('.error-message');
        if (!errorDiv) {
            const newErrorDiv = document.createElement('div');
            newErrorDiv.className = 'error-message';
            newErrorDiv.textContent = message;
            parentTd.appendChild(newErrorDiv);
        } else {
            errorDiv.textContent = message;
        }
    }

    // Helper function to clear error messages
    function clearErrors(form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
    }

    // Validate Employee Form
    const employeeForm = document.getElementById('employeeForm');
    if (employeeForm) {
        employeeForm.addEventListener('submit', function(event) {
            console.log("Employee form submission detected!");
            clearErrors(employeeForm);

            // Get employee form inputs
            const DOB = document.querySelector('#employeeForm input[name="DOB"]').value;
            const DOJ = document.querySelector('#employeeForm input[name="DOJ"]').value;
            const salary = parseFloat(document.querySelector('#employeeForm input[name="salary"]').value);
            const contactno = document.querySelector('#employeeForm input[name="contactno"]').value;

            // Get today's date in YYYY-MM-DD format
            const today = new Date().toISOString().split('T')[0];

            let isValid = true;

            // Validate DOB (Date of Birth)
            if (DOB > today) {
                showError(document.querySelector('#employeeForm input[name="DOB"]'), "Date of Birth cannot be in the future.");
                isValid = false;
            }

            // Validate DOJ (Date of Joining)
            if (DOJ > today) {
                showError(document.querySelector('#employeeForm input[name="DOJ"]'), "Date of Joining cannot be in the future.");
                isValid = false;
            }

            // Validate Salary
            if (isNaN(salary) || salary <= 0) {
                showError(document.querySelector('#employeeForm input[name="salary"]'), "Salary must be a positive number greater than zero.");
                isValid = false;
            }

            // Validate Contact Number (ensure it's exactly 10 digits)
            if (!/^\d{10}$/.test(contactno)) {
                showError(document.querySelector('#employeeForm input[name="contactno"]'), "Contact Number must be exactly 10 digits.");
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                console.log("Employee form passed all validations.");
            }
        });
    }

    // Validate Product Form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(event) {
            console.log("Product form submission detected!");
            clearErrors(productForm);

            // Get product form inputs
            const price = parseFloat(document.querySelector('#productForm input[name="pPrice"]').value);
            const quantity = parseInt(document.querySelector('#productForm input[name="pQty"]').value);

            let isValid = true;

            // Validate Price
            if (isNaN(price) || price <= 0) {
                showError(document.querySelector('#productForm input[name="pPrice"]'), "Price must be a positive number greater than zero.");
                isValid = false;
            }

            // Validate Quantity
            if (isNaN(quantity) || quantity < 0) {
                showError(document.querySelector('#productForm input[name="pQty"]'), "Quantity must be zero or a positive number.");
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                console.log("Product form passed all validations.");
            }
        });
    }
});
