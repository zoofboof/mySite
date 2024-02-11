document.addEventListener("DOMContentLoaded", function () {
    var project1 = document.getElementById("project1");
    var project2 = document.getElementById("project2");
  
    project1.addEventListener("click", function () {
      window.location.href = "project1.html"; // Replace with the actual URL for Project 1
    });
  
    project2.addEventListener("click", function () {
      window.location.href = "https://rpggamezoofboofv1.github.io/"; // Replace with the actual URL for Project 2
    });

    project3.addEventListener("click", function () {
      window.location.href = "blackjack/blackJackV1.html"; // Replace with the actual URL for Project 2
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

  document.addEventListener("DOMContentLoaded", function () {
    const text = "Ryan Pothier";
    const delay = 100; // Delay in milliseconds between each character

    let index = 0;
    const intervalId = setInterval(function () {
      document.getElementById("animated-text").textContent += text[index];
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, delay);
  });
  
  // Sample data for video thumbnails with tags
const videos = [
  { src: "assets/portfolio1.JPG", alt: "Video 1", tags: ["tag1", "tag2"] },
  { src: "assets/portfolio1.JPG", alt: "Video 2", tags: ["tag2"] },
  { src: "assets/portfolio1.JPG", alt: "Video 3", tags: ["tag1", "tag3"] },
  // Add more video data as needed
];

// Function to initialize video thumbnails
function initializeVideoThumbnails() {
  const videoThumbnailsContainer = document.getElementById("video-thumbnails");
  videoThumbnailsContainer.innerHTML = ""; // Clear existing content

  videos.forEach(video => {
    const thumbnail = document.createElement("div");
    thumbnail.classList.add("col-md-4", "video-thumbnail");
    thumbnail.dataset.tags = video.tags.join(" "); // Store tags as dataset attribute

    thumbnail.innerHTML = `
      <img src="${video.src}" alt="${video.alt}">
      <div class="tags">
        ${video.tags.map(tag => `<span class="badge bg-primary">${tag}</span>`).join("")}
      </div>
    `;

    videoThumbnailsContainer.appendChild(thumbnail);
  });
}

// Function to filter videos by tag
function filterVideos(tag) {
  const videoThumbnails = document.querySelectorAll(".video-thumbnail");

  videoThumbnails.forEach(thumbnail => {
    if (tag === "all" || thumbnail.dataset.tags.includes(tag)) {
      thumbnail.style.display = "block"; // Show thumbnails with selected tag or show all thumbnails
    } else {
      thumbnail.style.display = "none"; // Hide thumbnails without selected tag
    }
  });
}

// Initialize video thumbnails when the page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeVideoThumbnails();
});