// BLOCK OTHER DEVICES
function blockMobile() {
    if (window.innerWidth <= 992) {
        alert("Chỉ hỗ trợ cho Laptop / Máy tính bàn hoặc để tab full màn hình")
        location.reload()
    }
}
blockMobile();