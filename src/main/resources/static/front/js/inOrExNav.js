//id就是id，name要显示的内容，initial 拼音首字母，usetime 用户点击次数
let dataArr2 = [
     {id:"1",name:"11111111111111",initial:"GDZC",useTime:10},
     {id:"2",name:"222222222222",initial:"LDZC",useTime:20},
     {id:"3",name:"333333333333",initial:"CSSR",useTime:30},
     {id:"4",name:"44444444444444",initial:"ZCCS",useTime:40},
     {id:"5",name:"55555555555555",initial:"ZCCS",useTime:50},
     {id:"6",name:"66666666666666",initial:"ZCCS",useTime:60},
     {id:"7",name:"7777777777777",initial:"ZCCS",useTime:70},
     {id:"8",name:"888888888888888",initial:"ZCCS",useTime:80},
     {id:"9",name:"999999999999",initial:"ZCCS",useTime:90}
];

//中间部分
let midDiv = document.getElementsByClassName("mid-choice")[0];
//中间上部分，放置点击量最高的
let firstChoice =document.getElementsByClassName("mid-top")[0];
//中间下部分，放置点击量第二高的
let secondChoice =document.getElementsByClassName("mid-bottom")[0];
//左侧部分，数据少的时候用它，以及放置点击量少的
let threeChoice = document.getElementsByClassName("left-choice")[0];
//右侧部分，放置点击量最少的
let endChoice = document.getElementsByClassName("right-choice")[0];

//数据的条数
let dataNum = dataArr2.length;

if(dataNum <= 2 ){
    //左侧显示  threeChoice
    threeChoice.style.display = "block";
    threeChoice.style.width = "100%";

    //其他隐藏
    midDiv.style.display = "none";
    firstChoice.style.display = "none";
    secondChoice.style.display = "none";
    endChoice.style.display = "none";

    //创建子元素
    createDiv(dataArr2,threeChoice);

}else if (dataNum >=3 && dataNum <=5 ){
    //左侧显示 60% threeChoice
    threeChoice.style.display = "block";
    threeChoice.style.width = "60%";
    //右侧显示 40%  endChoice
    endChoice.style.display = "block";
    endChoice.style.width = "40%";

    //其他隐藏
    midDiv.style.display = "none";
    firstChoice.style.display = "none";
    secondChoice.style.display = "none";

    let threeData = [];//点击量高的
    let endData = [];//稍微高的
    //排名靠前的展示在前面,按照个数分
    for(let m = 0;m<dataArr2.length;m++){
        if(m < 2){
            threeData.push(dataArr2[m]);
        }else {
            endData.push(dataArr2[m]);
        }
    }
    //左边部分
    createDiv(threeData,threeChoice);
    //右边部分
    createDiv(endData,endChoice);

}else if (dataNum >=6 && dataNum <=7 ){
    //左threeChoice20%，中midDiv60%，中上firstChoice，右endChoice20%显示
    //左侧显示 60% threeChoice
    threeChoice.style.display = "block";
    threeChoice.style.width = "20%";
    //右侧显示 40%  endChoice
    endChoice.style.display = "block";
    endChoice.style.width = "20%";

    //其他隐藏
    midDiv.style.display = "block";
    midDiv.style.width = "60%";

    firstChoice.style.display = "block";
    firstChoice.style.height = "100%";

    secondChoice.style.display = "none";

    let firstData = [];
    let threeData = [];
    let endData = [];

    //排名靠前的展示在前面,按照个数分
    for(let m = 0;m<dataArr2.length;m++){
        if(m < 2){
            endData.push(dataArr2[m]);
        }else if ( m >=2 && m <4) {
            threeData.push(dataArr2[m]);
        }else {
            firstData.push(dataArr2[m]);
        }
    }

    //中间部分
    createDiv(firstData,firstChoice);
    //左边部分
    createDiv(threeData,threeChoice);
    //右边部分
    createDiv(endData,endChoice);

}else if (dataNum >=8 && dataNum <=9 ){
    //左threeChoice20%，中midDiv60%，中上firstChoice70%
    //中下secondChoice30%，右endChoice20%显示
    threeChoice.style.display = "block";
    threeChoice.style.width = "20%";
    //右侧显示 40%  endChoice
    endChoice.style.display = "block";
    endChoice.style.width = "20%";

    //其他隐藏
    midDiv.style.display = "block";
    midDiv.style.width = "60%";

    firstChoice.style.display = "block";
    firstChoice.style.height = "70%";

    secondChoice.style.display = "block";
    secondChoice.style.height = "30%";

    let firstData = [];
    let secondData = [];
    let threeData = [];
    let endData = [];

    //排名靠前的展示在前面,按照个数分
    for(let m = 0;m<dataArr2.length;m++){
        if(m < 2){
            endData.push(dataArr2[m]);
        }else if ( m >=2 && m <4) {
            threeData.push(dataArr2[m]);
        }else if(m >=4 && m<6) {
            secondData.push(dataArr2[m]);
        }else {
            firstData.push(dataArr2[m]);
        }
    }
    //中上部分
    createDiv(firstData,firstChoice);
    //中下部分
    createDiv(secondData,secondChoice);
    //右边
    createDiv(threeData,threeChoice);
    //左边
    createDiv(endData,endChoice);


}

//创建子元素
function createDiv(arr,parentDiv) {
    parentDiv.innerHTML = "";
    for(let m = 0;m<arr.length;m++){
        //将数据显示到列表中
        let itemDiv = document.createElement("span");
        itemDiv.className = "item-" + arr[m].id;
        itemDiv.innerHTML = arr[m].name;
        itemDiv.setAttribute("initial",arr[m].initial);
        itemDiv.setAttribute("dataId",arr[m].id);

        parentDiv.appendChild(itemDiv);
    }
}








































