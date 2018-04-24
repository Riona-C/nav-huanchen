//画布
let content = document.getElementsByClassName("content")[0];

//水平线
let horizonLine = document.getElementsByClassName("horizon-line")[0];

//右上盒子
let choiceBox = document.getElementsByClassName("choice")[0];
let choiceHeight = choiceBox.offsetHeight;

//右下盒子
let previewBox = document.getElementsByClassName("preview")[0];
let previewHeight = previewBox.offsetHeight;

//水平线的拖拽事件
horizonLine.onmousedown = function () {
    moveLine(horizonLine,"horizon")
};

content.onmouseup = function () {
    content.onmousemove = false;
};

//移动线更改窗口大小
function moveLine(ele,par) {

    //线初始位置
    let lineStartX = ele.offsetLeft;
    let lineStartY = ele.offsetTop;

    //鼠标初始位置
    let mousePosStartX = getMousePos().x;
    let mousePosStartY = getMousePos().y;

    //鼠标位置
    let mousePosEndX;
    let mousePosEndY;

    //结束时竖线的位置
    let lineEnd;

    //右上盒子
    let choiceBoxH = choiceBox.offsetHeight;//初始高
    let newChoiceBoxH;//新高

    //右下盒子
    let previewBoxH = previewBox.offsetHeight;//初始高
    let newPreviewBoxH;//新高

    content.onmousemove = function () {

        //鼠标的位移
        mousePosEndX = getMousePos().x;
        mousePosEndY = getMousePos().y;

        if(par == "horizon"){
            //移动时横线距离上边的位移
            lineEnd = lineStartY + (mousePosEndY - mousePosStartY);
            ele.style.top = lineEnd + "px";

            //更改右方块的高
            newChoiceBoxH = choiceBoxH + (mousePosEndY - mousePosStartY);
            choiceBox.style.height = newChoiceBoxH + "px";

            newPreviewBoxH = previewBoxH -  (mousePosEndY - mousePosStartY);
            previewBox.style.height = newPreviewBoxH + "px";
        }


    };


}


//点击最大化，还原按钮
let changeSizeBtn = document.getElementsByClassName("change-size");
let contentHeight = content.offsetHeight;

for(let i = 0;i <changeSizeBtn.length;i++){

    changeSizeBtn[i].onclick = function () {
        //获取当前要放大谁
        let parentBox = this.parentNode;

        //此时图片地址
        let imgUrl = this.src;
        let newUrl;
        //放大
        if(imgUrl.indexOf("maxWindow") > -1){

            //右上盒子的高
            choiceHeight = choiceBox.offsetHeight;

            //右下盒子的高
            previewHeight = previewBox.offsetHeight;

            newUrl = imgUrl.replace(/maxWindow/,"reset");

            //更改当前盒子的高和层级
            parentBox.style.height = contentHeight +"px";
            parentBox.style.zIndex = "5";

            //    操作的是右上的盒子
            if(parentBox.classList.contains("choice")){

                previewBox.style.display = "none";

                //    操作右下盒子
            }else if(parentBox.classList.contains('preview')){

                choiceBox.style.display = "none";
            }

            //将线隐藏
            horizonLine.style.display = "none";

        }else {
            //还原
            newUrl = imgUrl.replace(/reset/,"maxWindow");

            if(parentBox.classList.contains("choice")){

                parentBox.style.height = choiceHeight +"px";
                previewBox.style.display = "block";
            }else if(parentBox.classList.contains('preview')){

                parentBox.style.height = previewHeight +"px";
                choiceBox.style.display = "block";
            }
            //更改当前盒子的宽高和层级
            parentBox.style.zIndex = "1";
            //将线显示
            horizonLine.style.display = "block";
        }

        this.src = newUrl;

    };
}


//获取鼠标当前点击位置
function getMousePos(event) {
    let e = event || window.event;
    return {'x':e.pageX,'y':e.pageY}
}







