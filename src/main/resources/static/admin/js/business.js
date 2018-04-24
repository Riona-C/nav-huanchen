//获取更多操作按钮
let moreBtn = document.getElementById('more');
let moreOperate = document.getElementsByClassName('more-operate')[0];
let packUp = document.getElementById('packUp');
//给按钮绑定点击事件
moreBtn.onclick = function(){
    moreOperate.classList.add('trans');
};
packUp.onclick = function(){
    moreOperate.classList.remove('trans');
};