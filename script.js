// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('EduConnect platform initialized');
  
  // Initialize featured classes on homepage
  initFeaturedClasses();
  
  // Initialize form handlers
  initFormHandlers();
  
  // Initialize modal behavior
  initModalBehavior();
});

// Initialize featured classes on homepage
function initFeaturedClasses() {
  const featuredClassesContainer = document.getElementById('featuredClasses');
  if (!featuredClassesContainer) return;
  
  // Sample featured classes data (in a real app, this would come from an API)
  const featuredClasses = [
    {
      title: "Advanced Calculus for Beginners",
      subject: "Mathematics",
      teacher: {
        name: "Prof. Michael Brown",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.5
      },
      date: "June 15, 2025",
      time: "10:00 AM - 12:00 PM",
      seats: "15/20",
      price: 25,
      description: "Learn the fundamentals of calculus with practical examples and problem-solving techniques."
    },
    {
      title: "Web Development with JavaScript",
      subject: "Programming",
      teacher: {
        name: "Sarah Williams",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5.0
      },
      date: "June 18, 2025",
      time: "2:00 PM - 4:30 PM",
      seats: "8/12",
      price: 30,
      description: "Master JavaScript fundamentals and build interactive web applications from scratch."
    },
    {
      title: "Creative Writing Workshop",
      subject: "English",
      teacher: {
        name: "James Wilson",
        image: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 4.0
      },
      date: "June 20, 2025",
      time: "6:00 PM - 8:00 PM",
      seats: "12/25",
      price: 0,
      description: "Develop your creative writing skills and learn techniques for crafting compelling stories."
    }
  ];
  
  // Generate HTML for featured classes
  featuredClasses.forEach(classItem => {
    const classCard = document.createElement('div');
    classCard.className = 'col-md-4';
    classCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span class="badge bg-light text-primary">${classItem.subject}</span>
          <span class="badge ${classItem.price > 0 ? 'bg-warning' : 'bg-success'}">${classItem.price > 0 ? '$' + classItem.price : 'Free'}</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">${classItem.title}</h5>
          <p class="card-text">${classItem.description}</p>
          <div class="d-flex align-items-center mb-3">
            <img src="${classItem.teacher.image}" alt="Teacher" class="rounded-circle me-2" width="40" height="40">
            <div>
              <p class="mb-0 fw-bold">${classItem.teacher.name}</p>
              <div class="text-warning">
                ${generateStarRating(classItem.teacher.rating)}
                <span class="text-muted ms-1">(${classItem.teacher.rating})</span>
              </div>
            </div>
          </div>
          <ul class="list-group list-group-flush mb-3">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span><i class="fa fa-calendar me-2"></i>Date</span>
              <span>${classItem.date}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span><i class="fa fa-clock-o me-2"></i>Time</span>
              <span>${classItem.time}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span><i class="fa fa-users me-2"></i>Seats</span>
              <span>${classItem.seats}</span>
            </li>
          </ul>
        </div>
        <div class="card-footer bg-white">
          <div class="d-grid">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#enrollModal">Enroll Now</button>
          </div>
        </div>
      </div>
    `;
    
    featuredClassesContainer.appendChild(classCard);
  });
}

// Generate star rating HTML
function generateStarRating(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fa fa-star"></i>';
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    starsHtml += '<i class="fa fa-star-half-o"></i>';
  }
  
  // Add empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="fa fa-star-o"></i>';
  }
  
  return starsHtml;
}

// Initialize form handlers
function initFormHandlers() {
  // Login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      // In a real app, this would send a request to the server
      console.log('Login attempt:', { email, password });
      
      // Show success message (for demo purposes)
      alert('Login successful!');
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modal) modal.hide();
    });
  }
  
  // Student registration form submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // Get selected subjects
      const selectedSubjects = [];
      document.querySelectorAll('#registerForm input[type="checkbox"]:checked').forEach(checkbox => {
        if (checkbox.id !== 'termsCheck') {
          selectedSubjects.push(checkbox.value);
        }
      });
      
      // In a real app, this would send a request to the server
      console.log('Student registration:', { name, email, password, subjects: selectedSubjects });
      
      // Show success message (for demo purposes)
      alert('Registration successful! Welcome to EduConnect.');
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
      if (modal) modal.hide();
    });
  }
  
  // Teacher registration form submission
  const teacherRegisterForm = document.getElementById('teacherRegisterForm');
  if (teacherRegisterForm) {
    teacherRegisterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('teacherName').value;
      const email = document.getElementById('teacherEmail').value;
      const password = document.getElementById('teacherPassword').value;
      const confirmPassword = document.getElementById('teacherConfirmPassword').value;
      const qualifications = document.getElementById('teacherQualifications').value;
      const education = document.getElementById('teacherEducation').value;
      const experience = document.getElementById('teachingExperience').value;
      const bio = document.getElementById('teacherBio').value;
      
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // Get selected subjects
      const selectedSubjects = [];
      document.querySelectorAll('#teacherRegisterForm input[type="checkbox"]:checked').forEach(checkbox => {
        if (checkbox.id !== 'teacherTermsCheck') {
          selectedSubjects.push(checkbox.value);
        }
      });
      
      // In a real app, this would send a request to the server
      console.log('Teacher registration:', { 
        name, 
        email, 
        password, 
        qualifications,
        education,
        experience,
        bio,
        subjects: selectedSubjects 
      });
      
      // Show success message (for demo purposes)
      alert('Teacher registration successful! Your application will be reviewed shortly.');
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('teacherRegisterModal'));
      if (modal) modal.hide();
    });
  }
  
  // Class request form submission
  const classRequestForm = document.getElementById('classRequestForm');
  if (classRequestForm) {
    classRequestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = {
        subject: document.getElementById('subjectArea').value,
        topics: document.getElementById('specificTopics').value,
        goals: document.getElementById('learningGoals').value,
        format: document.querySelector('input[name="classFormat"]:checked').value,
        duration: document.getElementById('classDuration').value,
        frequency: document.getElementById('classFrequency').value,
        startDate: document.getElementById('startDate').value,
        preferredTime: document.getElementById('preferredTime').value,
        level: document.getElementById('currentLevel').value,
        budget: document.getElementById('budgetRange').value
      };
      
      // In a real app, this would send a request to the server
      console.log('Class request submitted:', formData);
      
      // Show success message (for demo purposes)
      alert('Your class request has been submitted! We will match you with a suitable teacher soon.');
      
      // Reset the form
      classRequestForm.reset();
    });
  }
  
  // Enroll form submission
  const completeEnrollmentBtn = document.getElementById('completeEnrollment');
  if (completeEnrollmentBtn) {
    completeEnrollmentBtn.addEventListener('click', function() {
      const paymentMethod = document.getElementById('paymentMethod').value;
      
      if (!paymentMethod) {
        alert('Please select a payment method.');
        return;
      }
      
      // In a real app, this would process the payment and enrollment
      console.log('Enrollment completed with payment method:', paymentMethod);
      
      // Show success message (for demo purposes)
      alert('Enrollment successful! You will receive class details via email.');
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('enrollModal'));
      if (modal) modal.hide();
    });
  }
  
  // Request class from teacher modal
  const submitRequestBtn = document.getElementById('submitRequest');
  if (submitRequestBtn) {
    submitRequestBtn.addEventListener('click', function() {
      const subject = document.getElementById('classSubject').value;
      
      if (!subject) {
        alert('Please select a subject.');
        return;
      }
      
      // In a real app, this would send the request to the teacher
      console.log('Class request sent to teacher');
      
      // Show success message (for demo purposes)
      alert('Your request has been sent to the teacher. They will contact you soon with class details.');
      
      // Close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('requestClassModal'));
      if (modal) modal.hide();
    });
  }
}

// Initialize modal behavior
function initModalBehavior() {
  // Show credit card details when credit card is selected
  const paymentMethodSelect = document.getElementById('paymentMethod');
  if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', function() {
      const creditCardDetails = document.getElementById('creditCardDetails');
      if (creditCardDetails) {
        creditCardDetails.style.display = this.value === 'creditCard' ? 'block' : 'none';
      }
    });
  }
  
  // Show specific teacher field when "Yes" is selected
  const teacherPreferenceSelect = document.getElementById('teacherPreference');
  if (teacherPreferenceSelect) {
    teacherPreferenceSelect.addEventListener('change', function() {
      const specificTeacherDiv = document.getElementById('specificTeacherDiv');
      if (specificTeacherDiv) {
        specificTeacherDiv.style.display = this.value === 'yes' ? 'block' : 'none';
      }
    });
  }
  
  // Show "other subject" field when "Other" is selected
  const subjectAreaSelect = document.getElementById('subjectArea');
  if (subjectAreaSelect) {
    subjectAreaSelect.addEventListener('change', function() {
      const otherSubjectDiv = document.getElementById('otherSubjectDiv');
      if (otherSubjectDiv) {
        otherSubjectDiv.style.display = this.value === 'other' ? 'block' : 'none';
      }
    });
  }
}