// BLOCK OTHER DEVICES
function blockMobile() {
    if (window.innerWidth <= 1280) {
        alert("Chỉ hỗ trợ PC hoặc để cửa sổ toàn màn hình!");
        location.reload()
    }
}
blockMobile();

window.addEventListener("resize", function(){
    blockMobile();
});