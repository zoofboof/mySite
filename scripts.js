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