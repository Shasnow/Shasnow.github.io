document.getElementById('sponsorBtn').addEventListener('click', function() {
    document.getElementById('qrModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('qrModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});

// 点击遮罩层也可以关闭弹窗
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('qrModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});