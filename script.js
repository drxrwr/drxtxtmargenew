let filesArray = [];

const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const fileCount = document.getElementById("fileCount");
const outputFileName = document.getElementById("outputFileName");
const mergeBtn = document.getElementById("mergeBtn");
const resetBtn = document.getElementById("resetBtn");

fileInput.addEventListener("change", () => {
  filesArray = Array.from(fileInput.files);
  renderFileList();
});

function renderFileList() {
  fileList.innerHTML = "";
  fileCount.textContent = `${filesArray.length} file dipilih`;

  filesArray.forEach((file, index) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    li.setAttribute("data-index", index);
    fileList.appendChild(li);
  });
}

new Sortable(fileList, {
  animation: 150,
  onEnd: () => {
    const newOrder = [];
    fileList.querySelectorAll("li").forEach((li) => {
      const index = li.getAttribute("data-index");
      newOrder.push(filesArray[index]);
    });
    filesArray = newOrder;
  },
});

mergeBtn.addEventListener("click", async () => {
  if (filesArray.length === 0) {
    alert("Pilih minimal 1 file .txt terlebih dahulu.");
    return;
  }

  let mergedText = "";
  for (const file of filesArray) {
    const text = await file.text();
    mergedText += text + "\n";
  }

  const filename = outputFileName.value.trim() || "gabungan";
  const blob = new Blob([mergedText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename + ".txt";
  link.click();
});

resetBtn.addEventListener("click", () => {
  fileInput.value = "";
  filesArray = [];
  fileList.innerHTML = "";
  fileCount.textContent = "0 file dipilih";
  outputFileName.value = "";
});
