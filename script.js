document.addEventListener('DOMContentLoaded', () => {
    
    // 1. YOUR IMAGE DATABASE
    // Add the 'category' property (either 'group', 'staff', or 'other')
    // Notice the paths: You can put images in separate folders like 'images/group/...'
    const myPictures = [
       { file: 'images/group/group-1.jpg', title: 'group Photo', downloadName: 'prgc-batch.jpg', category: 'group' },
	   { file: 'images/group/group-2.jpg', title: 'group Photo', downloadName: 'prgc-batch.jpg', category: 'group' },
       { file: 'images/group/group-1.jpg', title: 'group Photo', downloadName: 'prgc-batch.jpg', category: 'group' }
	         
       
    ];

    const galleryContainer = document.getElementById('myGallery');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // 2. FUNCTION TO RENDER GALLERY BASED ON CATEGORY
    const renderGallery = (filterCategory) => {
        // Clear the current gallery
        galleryContainer.innerHTML = '';

        // Filter the array based on what button was clicked
        const filteredPics = myPictures.filter(pic => {
            if (filterCategory === 'all') return true;
            return pic.category === filterCategory;
        });

        // Re-generate the HTML for the filtered pictures
        filteredPics.forEach((pic, index) => {
            // Calculate a slight delay so they animate in one by one
            const delay = (index * 0.1).toFixed(1); 

            const cardHTML = `
                <div class="gallery-item" style="--delay: ${delay}s">
                    <img src="${pic.file}" alt="${pic.title}">
                    <div class="overlay">
                        <button class="action-btn preview-btn">Preview</button>
                        <a href="${pic.file}" download="${pic.downloadName}" class="action-btn download-btn">Download</a>
                    </div>
                </div>
            `;
            galleryContainer.innerHTML += cardHTML;
        });
    };

    // 3. FILTER BUTTON CLICK EVENTS
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add 'active' class to the clicked button
            this.classList.add('active');

            // Get the category from the data-filter attribute (all, group, or staff)
            const selectedCategory = this.getAttribute('data-filter');
            
            // Render the gallery with the new category
            renderGallery(selectedCategory);
        });
    });

    // Initial render: Load all pictures when page first opens
    renderGallery('all');

    // 4. MODAL (PREVIEW) LOGIC (Using Event Delegation for dynamically generated buttons)
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close-btn");

    // Listen for clicks on the entire gallery container
    galleryContainer.addEventListener('click', (e) => {
        // Check if the clicked element was a preview button
        if (e.target.classList.contains('preview-btn')) {
            const card = e.target.closest('.gallery-item');
            const img = card.querySelector('img');
            
            modal.style.display = "block";
            setTimeout(() => modal.classList.add("show"), 10);
            modalImg.src = img.src;
            captionText.innerHTML = img.alt;
        }
    });

    // Close Modal Logic
    const closeModal = () => {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 400); 
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function(e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && modal.style.display === "block") closeModal();
    });
});
