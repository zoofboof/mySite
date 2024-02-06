document.addEventListener("DOMContentLoaded", function () {
    var project1 = document.getElementById("project1");
    var project2 = document.getElementById("project2");
  
    project1.addEventListener("click", function () {
      window.location.href = "project1.html"; // Replace with the actual URL for Project 1
    });
  
    project2.addEventListener("click", function () {
      window.location.href = "https://rpggamezoofboofv1.github.io/"; // Replace with the actual URL for Project 2
    });
  
    // Add similar event listeners for other projects as needed
  });

  document.addEventListener("DOMContentLoaded", function () {
    $('#videoModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget);
      var videoId = button.data('video-id');
      var modal = $(this);
      modal.find('#videoPlayer').attr('src', 'https://www.youtube.com/embed/' + videoId + '?rel=0');
    });
  
    $('#videoModal').on('hide.bs.modal', function () {
      var modal = $(this);
      modal.find('#videoPlayer').attr('src', ''); // Pause the video when modal is closed
    });
  });

    document.addEventListener("DOMContentLoaded", function () {
    // Function to check if an element is in the viewport
    function isInViewport(element) {
      var rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Function to add animation class if an element is in the viewport
    function animateHeroContainers() {
      var heroContainers = document.querySelectorAll('.hero-container');
      
      heroContainers.forEach(function (heroContainer) {
        if (isInViewport(heroContainer)) {
          heroContainer.classList.add('animate-in');
        }
      });
    }

    // Initial check on page load
    animateHeroContainers();

    // Check on scroll
    window.addEventListener('scroll', function () {
      animateHeroContainers();
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    var heroContainers = document.querySelectorAll('.hero-container');

    function checkVisibility() {
      heroContainers.forEach(function (container) {
        var rect = container.getBoundingClientRect();
        var isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
        
        if (isVisible) {
          container.classList.add('active');
        } else {
          container.classList.remove('active');
        }
      });
    }

    // Initial check on page load
    checkVisibility();

    // Check visibility on scroll
    window.addEventListener('scroll', function () {
      checkVisibility();
    });
  });