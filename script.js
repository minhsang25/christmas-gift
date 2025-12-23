document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded"); // Debug

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "123451211";

  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      console.log("Data loaded:", data); // Debug

      const person = data.people.find((p) => p.id === id);
      if (!person) return alert("Không tìm thấy người nhận!");

      // Cập nhật tên và ảnh
      document.getElementById("person-name").textContent = person.name;
      document.getElementById("person-photo").src = person.imagePath;

      // Các element
      const legoBtn = document.getElementById("lego-btn");
      const legoModal = document.getElementById("lego-modal");
      const modalClose = document.querySelector(".modal-close");
      const cards = document.querySelectorAll(".lego-card");
      const pdfOverlay = document.getElementById("pdf-overlay");
      const pdfFrame = document.getElementById("pdf-frame");
      const pdfClose = document.querySelector(".close-btn");

      console.log("legoBtn:", legoBtn); // Debug

      // Mở modal chọn kiểu
      legoBtn.addEventListener("click", () => {
        console.log("Button clicked"); // Debug
        legoModal.classList.add("active");
      });

      // Đóng modal chọn kiểu
      modalClose.addEventListener("click", () => {
        legoModal.classList.remove("active");
      });

      // Click ngoài modal để đóng
      legoModal.addEventListener("click", (e) => {
        if (e.target === legoModal) {
          legoModal.classList.remove("active");
        }
      });

      // Khi chọn card → mở PDF tương ứng
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          const shape = card.dataset.shape; // I, L, U, F
          const pdfPath = person.pdfPaths[shape];
          console.log("Selected shape:", shape, "PDF:", pdfPath);
          if (pdfPath) {
            pdfFrame.src = pdfPath;
            pdfOverlay.classList.remove("hidden");
            legoModal.classList.remove("active"); // đóng modal chọn
          }
        });
      });

      // Đóng PDF
      pdfClose.addEventListener("click", () =>
        pdfOverlay.classList.add("hidden")
      );
      pdfOverlay.addEventListener("click", (e) => {
        if (e.target === pdfOverlay) pdfOverlay.classList.add("hidden");
      });
    });
});
