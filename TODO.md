# TODO: Add Upload and Display Functionality to Photo Gallery Page

## Tasks

- [x] Modify frontend/js/Photogallery.js to fetch uploaded photos on page load and append to gallery grid
- [x] Add event listener to upload form for AJAX submission using fetch
- [x] On successful upload, refresh the gallery by re-fetching photos
- [x] Ensure lightbox functionality works for dynamically added images
- [x] Test the upload and display functionality

## Notes

- Keep static images as is, add uploaded ones dynamically.
- Use /api/gallery endpoint to fetch photos.
- Handle form submission without page reload.
