// Flint Directors Onboarding Portal JavaScript

// Application Data
const appData = {
  "flint_values": [
    {
      "title": "Trust",
      "description": "Building lasting relationships through transparency and reliability",
      "icon": "fa-handshake"
    },
    {
      "title": "Integrity", 
      "description": "Maintaining the highest ethical standards in all our dealings",
      "icon": "fa-shield-alt"
    },
    {
      "title": "Excellence",
      "description": "Delivering exceptional service and outcomes for every client",
      "icon": "fa-star"
    },
    {
      "title": "Innovation",
      "description": "Leveraging cutting-edge technology and processes",
      "icon": "fa-lightbulb"
    }
  ],
  "tech_stack": [
    {
      "name": "HubSpot",
      "description": "CRM and Marketing Automation",
      "icon": "fa-chart-line"
    },
    {
      "name": "BrokerEngine",
      "description": "Loan Origination Platform", 
      "icon": "fa-cogs"
    },
    {
      "name": "AOL",
      "description": "Application Processing System",
      "icon": "fa-file-alt"
    },
    {
      "name": "FlintEngine",
      "description": "Back Office Support Team",
      "icon": "fa-users"
    },
    {
      "name": "FlintMedia",
      "description": "Marketing and Content Platform",
      "icon": "fa-bullhorn"
    }
  ],
  "onboarding_steps": [
    {
      "step": 1,
      "title": "Welcome & Introduction",
      "description": "Learn about Flint's mission, values, and unique business model",
      "estimated_time": "30 minutes"
    },
    {
      "step": 2, 
      "title": "Legal & Compliance Setup",
      "description": "Complete legal requirements, ABN setup, and compliance documentation",
      "estimated_time": "45 minutes"
    },
    {
      "step": 3,
      "title": "Accounting & Financial Orientation", 
      "description": "Set up accounting systems, understand revenue flows and financial planning",
      "estimated_time": "60 minutes"
    },
    {
      "step": 4,
      "title": "Operational Training",
      "description": "Master Flint's technology stack and operational processes",
      "estimated_time": "90 minutes"
    },
    {
      "step": 5,
      "title": "Branding & Marketing Launch",
      "description": "Develop personal brand and launch marketing campaigns",
      "estimated_time": "75 minutes"
    },
    {
      "step": 6,
      "title": "Partnership & Growth Strategy",
      "description": "Build strategic partnerships and develop growth plans",
      "estimated_time": "60 minutes"
    },
    {
      "step": 7,
      "title": "Continuous Support & Feedback",
      "description": "Access ongoing support and feedback mechanisms", 
      "estimated_time": "30 minutes"
    }
  ],
  "testimonials": [
    {
      "name": "Sarah Mitchell",
      "role": "Flint Director, Sydney",
      "quote": "Joining Flint transformed my business. The support system and technology are unmatched.",
      "rating": 5
    },
    {
      "name": "Michael Chen", 
      "role": "Flint Director, Melbourne",
      "quote": "The Directors model gives me complete control while having enterprise-level support.",
      "rating": 5
    },
    {
      "name": "Emma Thompson",
      "role": "Flint Director, Brisbane", 
      "quote": "Best decision I made for my mortgage broking career. The results speak for themselves.",
      "rating": 5
    }
  ],
  "support_channels": [
    {
      "name": "Live Chat",
      "description": "Instant support during business hours",
      "icon": "fa-comments",
      "availability": "Mon-Fri 9AM-6PM AEST"
    },
    {
      "name": "Phone Support",
      "description": "Direct line to Flint support team", 
      "icon": "fa-phone",
      "number": "1300 FLINT"
    },
    {
      "name": "Slack Community",
      "description": "Connect with other Flint Directors",
      "icon": "fa-slack",
      "members": "150+ active members"
    },
    {
      "name": "Email Support",
      "description": "Detailed support via email",
      "icon": "fa-envelope", 
      "email": "support@flintgroup.au"
    }
  ]
};

// Global Variables
let currentSection = 'landing';
let completedSteps = new Set();

// Initialize when DOM is ready
$(document).ready(function() {
    console.log('Initializing Flint Directors Portal...');
    
    // Load saved progress
    loadProgress();
    
    // Generate dynamic content
    generateDynamicContent();
    
    // Setup dark mode
    setupDarkMode();
    
    // Update progress display
    updateProgressDisplay();
    
    // Setup mobile navigation
    updateMobileNextButton();
    
    console.log('Flint Directors Portal initialized successfully');
});

// Navigation Function - Main function for section switching
function navigateToSection(sectionId) {
    console.log(`Navigating to section: ${sectionId}`);
    
    // Hide all sections
    $('.section-page').removeClass('active');
    
    // Show target section
    $('#' + sectionId).addClass('active');
    
    // Update navigation active state
    $('.navbar-nav .nav-link').removeClass('active');
    $('.navbar-nav a[onclick*="' + sectionId + '"]').addClass('active');
    
    // Update current section
    currentSection = sectionId;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update mobile button
    updateMobileNextButton();
    
    // Update step progress if viewing a step
    updateStepProgress();
    
    return false; // Prevent any default action
}

// Complete Step Function
function completeStep(stepNumber) {
    console.log(`Completing step: ${stepNumber}`);
    
    // Add to completed steps
    completedSteps.add(stepNumber);
    
    // Save progress
    saveProgress();
    
    // Update displays
    updateProgressDisplay();
    generateOnboardingSteps();
    
    // Show completion notification
    showNotification(`Step ${stepNumber} completed!`, 'success');
}

// Show Video Modal
function showVideoModal() {
    console.log('Showing video modal');
    $('#videoModal').modal('show');
}

// Show FAQ Modal
function showFaqModal() {
    console.log('Showing FAQ modal');
    $('#faqModal').modal('show');
}

// Show Completion Modal
function showCompletionModal() {
    console.log('Showing completion modal');
    
    // Mark all steps as completed
    for (let i = 1; i <= 7; i++) {
        completedSteps.add(i);
    }
    
    saveProgress();
    updateProgressDisplay();
    generateOnboardingSteps();
    
    $('#completionModal').modal('show');
}

// Generate Dynamic Content
function generateDynamicContent() {
    generateOnboardingSteps();
    generateTestimonials();
    generateSupportChannels();
    generateValuesGrid();
    generateTechStackGrid();
    generateSupportResourcesGrid();
}

function generateOnboardingSteps() {
    const container = $('#onboardingSteps');
    if (container.length === 0) return;
    
    container.empty();
    
    appData.onboarding_steps.forEach(step => {
        const isCompleted = completedSteps.has(step.step);
        const statusBadge = isCompleted ? 
            '<span class="status status--success">Completed</span>' :
            '<span class="status status--info">Not Started</span>';
        
        const stepCard = `
            <div class="col-lg-6">
                <div class="step-card" onclick="navigateToSection('step${step.step}')">
                    <div class="step-card-header">
                        <div class="step-number">${step.step}</div>
                        <div>
                            <h4>${step.title}</h4>
                            <p class="lead">${step.description}</p>
                        </div>
                    </div>
                    <div class="step-meta">
                        <span class="step-time"><i class="fas fa-clock me-1"></i>${step.estimated_time}</span>
                        ${statusBadge}
                    </div>
                </div>
            </div>
        `;
        container.append(stepCard);
    });
}

function generateTestimonials() {
    const container = $('#testimonialsContainer');
    if (container.length === 0) return;
    
    container.empty();
    
    appData.testimonials.forEach((testimonial, index) => {
        const isActive = index === 0 ? 'active' : '';
        const stars = '★'.repeat(testimonial.rating);
        
        const testimonialSlide = `
            <div class="carousel-item ${isActive}">
                <div class="testimonial-item">
                    <div class="testimonial-quote">
                        "${testimonial.quote}"
                    </div>
                    <div class="testimonial-author">${testimonial.name}</div>
                    <div class="testimonial-role">${testimonial.role}</div>
                    <div class="testimonial-rating">${stars}</div>
                </div>
            </div>
        `;
        container.append(testimonialSlide);
    });
}

function generateSupportChannels() {
    const container = $('#supportChannels');
    if (container.length === 0) return;
    
    container.empty();
    
    appData.support_channels.forEach(channel => {
        const supportItem = `
            <div class="support-item">
                <div class="support-icon">
                    <i class="fas ${channel.icon}"></i>
                </div>
                <div class="support-details">
                    <h6>${channel.name}</h6>
                    <p>${channel.description}</p>
                    ${channel.availability ? `<small class="d-block">${channel.availability}</small>` : ''}
                    ${channel.number ? `<small class="d-block">${channel.number}</small>` : ''}
                    ${channel.email ? `<small class="d-block">${channel.email}</small>` : ''}
                    ${channel.members ? `<small class="d-block">${channel.members}</small>` : ''}
                </div>
            </div>
        `;
        container.append(supportItem);
    });
}

function generateValuesGrid() {
    const container = $('#valuesGrid');
    if (container.length === 0) return;
    
    container.empty();
    
    appData.flint_values.forEach(value => {
        const valueCard = `
            <div class="col-lg-3 col-md-6">
                <div class="value-card">
                    <div class="value-icon">
                        <i class="fas ${value.icon}"></i>
                    </div>
                    <h4>${value.title}</h4>
                    <p>${value.description}</p>
                </div>
            </div>
        `;
        container.append(valueCard);
    });
}

function generateTechStackGrid() {
    const container = $('#techStackGrid');
    if (container.length === 0) return;
    
    container.empty();
    
    appData.tech_stack.forEach(tech => {
        const techCard = `
            <div class="col-lg-4 col-md-6">
                <div class="tech-item">
                    <div class="tech-icon">
                        <i class="fas ${tech.icon}"></i>
                    </div>
                    <h5>${tech.name}</h5>
                    <p>${tech.description}</p>
                </div>
            </div>
        `;
        container.append(techCard);
    });
}

function generateSupportResourcesGrid() {
    const container = $('#supportResourcesGrid');
    if (container.length === 0) return;
    
    container.empty();
    
    appData.support_channels.forEach(channel => {
        const resourceCard = `
            <div class="col-lg-3 col-md-6">
                <div class="card h-100">
                    <div class="card__body text-center">
                        <i class="fas ${channel.icon} fa-2x mb-3 text-primary"></i>
                        <h5>${channel.name}</h5>
                        <p>${channel.description}</p>
                        <button class="btn btn--sm btn--primary">Access Now</button>
                    </div>
                </div>
            </div>
        `;
        container.append(resourceCard);
    });
}

// Progress Management
function updateProgressDisplay() {
    const totalSteps = appData.onboarding_steps.length;
    const completed = completedSteps.size;
    const overallProgress = Math.round((completed / totalSteps) * 100);
    
    // Update progress circles
    $('.progress-circle .progress-text').text(`${overallProgress}%`);
    
    // Update progress bar
    $('.progress-bar-fill').css('width', `${overallProgress}%`);
    
    // Update step indicators
    appData.onboarding_steps.forEach(step => {
        const indicator = $(`.step-indicator[data-step="${step.step}"]`);
        if (completedSteps.has(step.step)) {
            indicator.addClass('completed');
        } else {
            indicator.removeClass('completed');
        }
    });
}

function updateStepProgress() {
    // Update individual step progress
    const stepMatch = currentSection.match(/step(\d+)/);
    if (stepMatch) {
        const stepNumber = parseInt(stepMatch[1]);
        const progress = completedSteps.has(stepNumber) ? 100 : 25;
        $(`.progress-circle[data-step="${stepNumber}"] .progress-text`).text(`${progress}%`);
    }
}

// Mobile Navigation
function updateMobileNextButton() {
    const btn = $('#mobileNextBtn');
    const stepMatch = currentSection.match(/step(\d+)/);
    
    if (stepMatch) {
        const currentStepNum = parseInt(stepMatch[1]);
        const nextStepNum = currentStepNum + 1;
        
        if (nextStepNum <= 7) {
            btn.text(`Next Step (${nextStepNum})`);
            btn.off('click').on('click', function() {
                completeStep(currentStepNum);
                navigateToSection(`step${nextStepNum}`);
            });
            btn.show();
        } else {
            btn.text('Complete Onboarding');
            btn.off('click').on('click', function() {
                completeStep(currentStepNum);
                showCompletionModal();
            });
            btn.show();
        }
    } else if (currentSection === 'landing') {
        btn.text('Start Onboarding');
        btn.off('click').on('click', function() {
            navigateToSection('step1');
        });
        btn.show();
    } else {
        btn.hide();
    }
}

// Dark Mode
function setupDarkMode() {
    const toggle = $('#darkModeToggle');
    if (toggle.length === 0) return;
    
    // Check for saved preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode !== null) {
        setDarkMode(savedMode === 'true');
    } else {
        setDarkMode(prefersDark);
    }
    
    toggle.on('click', function(e) {
        e.preventDefault();
        const isDark = document.documentElement.getAttribute('data-color-scheme') === 'dark';
        setDarkMode(!isDark);
    });
}

function setDarkMode(enabled) {
    const toggle = $('#darkModeToggle');
    
    if (enabled) {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
        toggle.html('<i class="fas fa-sun"></i>');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.documentElement.setAttribute('data-color-scheme', 'light');
        toggle.html('<i class="fas fa-moon"></i>');
        localStorage.setItem('darkMode', 'false');
    }
}

// Progress Persistence
function saveProgress() {
    const progressData = {
        completedSteps: Array.from(completedSteps)
    };
    sessionStorage.setItem('flintProgress', JSON.stringify(progressData));
}

function loadProgress() {
    const saved = sessionStorage.getItem('flintProgress');
    if (saved) {
        try {
            const progressData = JSON.parse(saved);
            completedSteps = new Set(progressData.completedSteps || []);
        } catch (e) {
            console.error('Error loading progress:', e);
            completedSteps = new Set();
        }
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = `
        <div class="notification notification--${type}">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    $('body').append(notification);
    
    setTimeout(() => {
        $('.notification').fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}

// Add notification styles
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-16) var(--space-20);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: var(--space-12);
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        }
        
        .notification--success {
            border-color: var(--color-success);
            background: var(--color-bg-3);
        }
        
        .notification i {
            color: var(--color-success);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `)
    .appendTo('head');

console.log('Flint Directors Portal JavaScript loaded successfully');