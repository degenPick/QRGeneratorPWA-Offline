document.getElementById("downloadBtn").addEventListener("click", function () {
    const src = document.getElementById("qrImage").src.replace("preview", "download");
    const link = document.createElement("a");
    link.href = src;
    link.target = "_blank";
    link.download = "QRCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  