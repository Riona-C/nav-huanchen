//页面容器的宽，高
// let pageBox = document.getElementsByClassName("content");

//页面的宽高
let pageW = document.documentElement.clientWidth || document.body.clientWidth;
// let pageH = document.documentElement.clientHeight || document.body.clientHeight;

//菜单选项
let choiceData;


//选项盒子的宽
let firstGrade = document.getElementsByClassName("func-first")[0];
let secondGrade = document.getElementsByClassName("func-two")[0];
let threeGrade = document.getElementsByClassName("func-three")[0];
let choicW;
let choicH;

//放置报表列表的盒子
let reportListDiv = document.getElementsByClassName("report-list")[0];

//报表列表
let reportList = reportListDiv.children;

//报表数目
let reportNum = reportList.length;

//对应报表的单元格数据
let reportId;


for(let i = 0;i<reportNum;i++){
    reportList[i].onclick = function () {
        reportId = this.getAttribute("tid");
        let data={
            id:reportId
        };
        getTdsData(data);
    }
}

//点击报表选项执行
function getTdsData(data) {
    //像后台请求获取行列
    ajax("POST",
        "/reportNav/Msel",
        data,
        function success(data) {
            //请求成功后执行获取行列，创建表格

            if(data.length >0){
                getRowCol(data);
            }else {
                alert("暂时没有对应的数据")
            }

        }
    );


}

//放置表格的盒子
let reportDiv = document.getElementsByClassName("preview")[0];
// col:1content:"摘要"haschild:"no"id:10pid:2row:1
//获取行列，创建表格
function getRowCol(data) {
    //存储报表的行
    let rowArr = [];
    //存储报表的列
    let colArr = [];
    for(let i=0;i<data.length;i++){
        rowArr.push(data[i].row);
        colArr.push(data[i].col);
    }
//    行列
    let rowNum = Math.max.apply(null,rowArr);
    let colNum = Math.max.apply(null,colArr);

    //获取到行列，创建表格
    createTable(rowNum,colNum,reportDiv,reportId,data);
}


/*
*根据行列创建表格
* 参数说明
*rows,表格行数
* cols,表格列数
* tableDiv,放置表格的盒子
* reportId,报表id
* data单元格数据
* */
function createTable(rows,cols,tableDiv,reportId,data){

    let tableNode=document.createElement("table");//获得对象

    //设置报表id
    tableNode.setAttribute("reportId",reportId);
    tableNode.setAttribute("border","1");
    tableNode.style.width="90%";
    tableNode.style.marginLeft ="5%";


    //遍历行，插入单元格
    for(let x=0;x<rows;x++){
        //插入行
        let trNode=tableNode.insertRow();

        for(let y=0;y<cols;y++){

            for(let k = 0; k <data.length;k++){

                if(data[k].row == (x+1) &&data[k].col == (y+1)){

                    let tdNode=document.createElement("td");
                    trNode.appendChild(tdNode);
                    //设置单元格内容
                    tdNode.innerHTML = data[k].content;
                    //设置单元格id
                    tdNode.setAttribute("tdid",data[k].id);
                    //设置单元格内容居中
                    tdNode.style.textAlign = "center";

                    //显示禁用，并且不执行点击事件
                    tdNode.style.cursor = "not-allowed";

                    tdNode.setAttribute("colspan",data[k].colspan);
                    tdNode.setAttribute("rowspan",data[k].rowspan);

                    //如果当前单元格有菜单选项，鼠标变成手指
                    if(data[k].haschoic == "yes"){
                        tdNode.style.cursor = "pointer";
                        //    给插入的单元格绑定事件
                        tdNode.onclick = function () {
                            //当前单元格的id
                            let tdId = this.getAttribute("tdid");
                            tdClick(tdId);
                        }
                    }


                }

            }
        }

    }

    //添加表
    tableDiv.appendChild(tableNode);//添加到那个位置
}



//点击单元格要执行的事件

function tdClick(tID) {
    let data = {
        id:tID
    }

    ajax("POST",
        "/reportNav/Bsel",
        data,
        function success(data) {

            if(data.length > 0){
                choiceData = data;
                //获取一级菜单要显示的
                let firstShow =getShowData(0,choiceData);
                showChoices(firstGrade,firstShow);
            }else {
                firstGrade.style.display = "none";
                secondGrade.style.display = "none";
                threeGrade.style.display = "none";
                setTimeout(function() {
                    alert("当前单元格暂时没有选项可选");
                }, 500);

            }

        }
    );

    firstGrade.style.display = "block";
    //显示一级选项
    choicW = firstGrade.offsetWidth;
    choicH = firstGrade.offsetHeight;


    //    获取当前鼠标点击的位置
    let mousePos = getMousePos();
    showPos(1,mousePos);

}

//选项框的内容
function showChoices(div,data) {
    div.style.display = "block";
    div.innerHTML = "";

    for (let j = 0;j<data.length;j++){
        //菜单的选项
        let firstC = document.createElement("div");
        firstC.setAttribute("choiceId",data[j].id);
        firstC.setAttribute("belong",div.classList[0]);
        firstC.innerHTML = data[j].name;
        div.appendChild(firstC);

        //    绑定鼠标经过事件
        firstC.addEventListener("mouseenter", function(event) {

            let mousePos = getMousePos();
            //获取当前悬浮的id
            let thisId = this.getAttribute("choiceId");

            let secondShow = getShowData(thisId,choiceData);

            let belong =  this.getAttribute("belong");
            if(belong == "func-first"){
                threeGrade.style.display =  "none";

                if(secondShow.length >0){
                    //查询再新建
                    showChoices(secondGrade,secondShow);
                    showPos(2,mousePos);
                }else {
                    secondGrade.style.display =  "none";
                }

            }else if(belong =="func-two"){
                if(secondShow.length >0){
                    //查询再新建
                    showChoices(threeGrade,secondShow);
                    showPos(3,mousePos);
                }else {
                    threeGrade.style.display =  "none";
                }

            }

            // 在短暂的延时之后关闭选项框
            // setTimeout(function() {
            //     event.target.style.color = "";
            // }, 5000);

        }, false);

    }
}


//菜单选项的悬浮事件
function getShowData(pid,data){

    // 获取要显示的数据
    let showArr = [];
    for (let i = 0;i<data.length;i++){
        if(data[i].pid == pid){

            showArr.push(data[i]);
        }
    }

    return showArr;
}





//选项框应该出现的位置num当前显示的选项框个数，mp鼠标坐标
function showPos(num,mp) {
    let mouseL = mp.x;
    let mouseT = mp.y;
    let allW;
    let allH;

    //获取一级菜单的left值
    let firstLeft;

    switch (num){
        case 1:
            allW = choicW + mouseL;
            if(allW > pageW){
                //如果从当前点，加上盒子的宽超过容器宽，
                firstGrade.style.top = mouseT +"px";
                firstGrade.style.left =(mouseL-choicW) +"px";
            }else if(allW < pageW) {
                //如果从当前点，加上盒子的宽没有超过容器宽，
                firstGrade.style.top = mouseT +"px";
                firstGrade.style.left = mouseL +"px";
            }
            break;

        case 2:
            //一级选框的左边
            firstLeft = firstGrade.offsetLeft;
            allW = choicW * 2 + firstLeft;
            secondGrade.style.top = mouseT - 5+"px";
            //如果从一级选项框左边开始，加上二级选项框超过屏幕宽
            if(allW > pageW){
                //就让二级过一级的左边显示
                secondGrade.style.left = (firstLeft - choicW) +  "px";
            }else if(allW < pageW) {
                //否则二级选项框就正常在一级的右边显示
                secondGrade.style.left = firstLeft + choicW +  "px";
            }

            break;

        case 3:
            //一级选框的左边
            firstLeft = firstGrade.offsetLeft;
            console.log(firstLeft,choicW)
            allW = choicW * 3 + firstLeft;
            threeGrade.style.top = mouseT-5 +"px";
            //如果从一级选项框左边开始，加上二级和三级选项框超过屏幕宽
            if(allW > pageW){
                //就让二级过一级的左边显示
                secondGrade.style.left = (firstLeft - choicW) +  "px";
                //三级过二级的左边
                threeGrade.style.left = (firstLeft-choicW*2) +"px";

            }else if(allW < pageW) {
                //否则二级选项框就正常在一级的右边显示
                secondGrade.style.left = firstLeft + choicW +  "px";
                //三级过二级的右边
                threeGrade.style.left = (firstLeft+choicW*2) +"px";
            }


            break;
    }

}






