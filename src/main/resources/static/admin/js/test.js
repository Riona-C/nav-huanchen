
let data = [
        {id:"7",name:"苏杲",pid:"",oid:"1",iid:"sh",ut:"0" }, 
        {id:"8",name:"苏玩",pid:"",oid:"2",iid:"sw",ut:"0" }, 
        {id:"1",name:"苏序",pid:"7",oid:"3",iid:"sx",ut:"0" }, 
        {id:"2",name:"苏澹",pid:"1",oid:"4",iid:"sz",ut:"0" }, 
        {id:"3",name:"苏涣",pid:"1",oid:"5",iid:"sh",ut:"0" }, 
        {id:"4",name:"苏洵",pid:"1",oid:"6",iid:"sx",ut:"0" }, 
        {id:"5",name:"苏轼",pid:"4",oid:"7",iid:"ss",ut:"0" }, 
        {id:"6",name:"苏辙",pid:"4",oid:"8",iid:"sz",ut:"0" }, 
        {id:"9",name:"苏迈",pid:"5",oid:"9",iid:"sm",ut:"0" }, 
        {id:"10",name:"苏迨",pid:"5",oid:"10",iid:"sd",ut:"0" }, 
        {id:"11",name:"苏过",pid:"5",oid:"11",iid:"sg",ut:"0" }, 
        {id:"12",name:"苏遁",pid:"5",oid:"12",iid:"sx",ut:"0" }, 
        {id:"24",name:"测试",pid:"2",oid:"13",iid:"cs",ut:"5" }, 
        {id:"24",name:"测试1",pid:"2",oid:"14",iid:"cs",ut:"5" }, 
        {id:"24",name:"测试1",pid:"2",oid:"15",iid:"cs",ut:"5" }, 
        {id:"24",name:"测试1",pid:"2",oid:"16",iid:"cs",ut:"5" }, 
        {id:"24",name:"测试1",pid:"2",oid:"17",iid:"cs",ut:"5" }, 
        {id:"25",name:"测试2",pid:"2",oid:"18",iid:"cs",ut:"5" } 
    ];

//获取外容器对象
let Box = document.getElementById('box');
//获取按钮对象
let btn = document.getElementById('btn');
//获取所有类名为list的节点
let List = document.getElementsByClassName('list');

//把已存在的数据的id,保存到一个数组中
let idArr = [];

//为每个新添加的节点定义一个唯一的标识
let n;
//定义添加状态
let status = false;
//获取按钮盒子   
let button = document.getElementsByClassName('choice-btn')[0];
// 获取文本编辑框
let input = document.getElementById('input'),
    inputText = document.getElementById('inputText');
//编辑警告
let Warning = document.getElementById('warning');

//获取添加同级、下级、删除当前、编辑文本按钮
let addSibling = document.getElementById('addSibling');
let addChild = document.getElementById('addChild');
let removeNode = document.getElementById('removeNode');
let editorText = document.getElementById('editorText');
let closeOperate = document.getElementById('close');
// 定义当前点击的对象
let clickObj;

//调用遍历节点显示位置函数
splitData(data,Box);
//给id数组进行排序，取最大值，赋值给n
idArr.sort(function (m, n) {
    if (m < n) return -1;
    else if (m > n) return 1;
    else return 0;
});
let idMax = idArr[idArr.length-1];
n = idMax+1;

//遍历节点显示的位置
function splitData(data,ele) {
    //先清空内容
    ele.innerHTML="";
    let div;
    //遍历数据
    for(let i = 0;i<data.length;i++){
        // 给新添加的节点赋值
        div = displayData(data,i);
        //把iid添加到idarr数组中
        idArr.push(Number(data[i].id));
        div.onclick = function(){ 
            addClick(this);
        }
        //调用显示下拉或收起下拉
        displayChild(div);
        // 定义一个数组用来接收所有的子元素
        let arr = [];

        // 遍历是否有子节点
        for(let j=0;j<data.length;j++){
            // 如果当前数据的id是另一条数据的父id,就把那条数据添加到数组里
            if(data[i].id == data[j].pid){
                arr.push(data[j]);
            }
        }
        
        // 判断当前的pid是否为空
        if(data[i].pid == ''){
            // 如果没有pid,就把节点添加到最外边的容器里
            ele.appendChild(div);
            // 开始让子元素隐藏
            div.querySelector('.child-box').style.display = 'none';
        }else{

        }
        // 遍历所有的子元素节点
        for(let t=0;t<arr.length;t++){
            // 给创建的子元素进行赋值
            let div2 = displayData(arr,t);
            // 设置所有子元素的marginLeft值为15px
            div2.style.marginLeft = 15+'px';
            // 获取与当前pid相等的id的元素
            let domDiv = document.getElementsByClassName('dom-'+data[i].id);
            
            // 当与pid相等的data[i].id的元素存在时，就把创建的子元素添加进去
            if(domDiv.length > 0){
                // 把新创建的元素添加到与pid相等的data[i].id的元素的子元素中
                domDiv[0].querySelector('.child-box').appendChild(div2);
                div2.onclick = function(){
                    // 阻止冒泡事件发生
                    window.event? window.event.cancelBubble = true : e.stopPropagation();
                    // 给当前节点绑定单击事件
                    addClick(this);
                }
                //开始让所有的子元素隐藏
                div2.querySelector('.child-box').style.display = 'none';
                // 给当前元素绑定下拉显示事件(不要把显示下拉的函数放到单击事件里，否则会先发生单击事件)
                displayChild(div2);
            }
        }  
    }
}

// 遍历显示节点
function displayData(data,i){
    //添加节点元素
    let div = document.createElement('div');
    let icon = document.createElement('i');
    let span = document.createElement('span');
    let child = document.createElement('div');
    child.classList.add('child-box');
    // 获得唯一标识
    let cateId = data[i].id;
    let cateName = data[i].name;
    //设置唯一类名
    div.className = "dom-" + cateId;
    //设置节点的Id
    div.setAttribute("leavesId",cateId);
    //设置首字母
    span.setAttribute("initial",data[i].iid);

    // 给创建元素添加公共类名
    div.classList.add('list');
    // 给箭头符添加类名
    icon.classList.add('iconfont');
    icon.classList.add('icon-jiantou3');
    // 把箭头元素和span元素都添加到div中
    div.appendChild(icon);
    div.appendChild(span);
    div.appendChild(child);

    // 给span标签添加类名
    span.classList.add('title');
    // 设置默认文本
    span.innerHTML = cateName;

    // 设置默认颜色
    span.style.color = '#D2D3D1';  
    
    return div;
}

// 给按钮绑定添加分类事件
btn.onclick = function(){
    // 调用添加分类函数
    addNode(Box);
}
// 创建分类节点 函数
function addNode(obj){
    n++;
    //添加节点元素
    let div = document.createElement('div');
    let icon = document.createElement('i');
    let span = document.createElement('span');
    let childDiv = document.createElement('div');
    childDiv.classList.add('child-box');
    // 获得唯一标识
    let cateId = n;
    let cateName = span.innerHTML;
    //设置唯一类名
    div.className = "dom-" + n;
    //设置节点的Id
    div.setAttribute("leavesId",cateId);

    // 给创建元素添加公共类名
    div.classList.add('list');
    //给所有新创建节点也添加 clickNow类名
    div.classList.add('clickNow');
    // 给箭头符添加类名
    icon.classList.add('iconfont');
    icon.classList.add('icon-jiantou3');

    // 给span标签添加类名
    span.classList.add('title');
    // 设置默认文本
    span.innerHTML = '请输入文本';
    // 把文本转换为拼音首字母
    let valueText = pinyinUtil.getFirstLetter(span.innerHTML, true);
    // 给文本节点设置拼音首字母属性
    span.setAttribute('initial',valueText);
    // 设置默认颜色
    span.style.color = '#D2D3D1';  
    // 把箭头元素和span元素都添加到div中
    div.appendChild(icon);
    div.appendChild(span);
    div.appendChild(childDiv);
    //创建一个对象来保存

    // 把新创建的div元素添加到所传对象里
    if(status == true){
        insertNextSibling(obj,div);
    }else{
        if(obj.className == 'treeBox'){
            obj.appendChild(div);
            editorNode(div,div,5,15);
        }else{
            insertChild(obj,div);
        }
    }
    // 给新节点绑定点击事件
    div.onclick = function(e){
        e.stopPropagation();
        // 调用点击事件函数
        addClick(div);
    }

    // 给当前元素绑定下拉显示事件（由于显示下拉的函数是用户点击箭头时调用的，所以箭头的点击事件
    // 不能放到父节点的点击事件里边，否则会先执行父节点的单击事件）
    displayChild(div);
}

//增加节点发送请求
// function addNodeAjax(data){
//     //1.实例化ajax对象
//     let xhr = new XMLHttpRequest();
//     //准备数据，确定请求路径
//     xhr.open('post',url/business/addDom,true);
//     xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
//     //发送请求
//     xhr.send(data);
//     xhr.onreadystatechange = function(){
//         alert('发送成功');
//     }
// }







//who代表哪个页，dow代表哪部分（上或中或下）做什么，data是数据
function ajax1(who,dow,data)
{
    let result;
    let xmlhttp;
    let url;

    switch (who) {
//    收支
        case "i":
            url = "inOrExNav" ;
            break;
//		业务
        case "b":
            url ="businessNav" ;
            break;
//		报表
        case "r":
            url = "reportNav" ;
            break;
//		资金
        case "c":
            url ="capitalNav" ;
            break;
//		过程
        case "p":
            url = "processNav";
            break;
//		科目
        case "s":
            url = "subjectNav";
            break;

        default:
            break;
    }

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            result =xmlhttp.responseText;
        }
    }

    xmlhttp.open("POST",url+dow+".jsp?id="+data.id + "&name="+data.name+"&pid="+data.pid+"&oid="+data.oid+"&iid="+data.iid+"&ut="+data.ut,true);
    xmlhttp.send();
////    将返回的值return出去
//    return result;
}

// 获取当前点击的节点对象
clickObj = document.getElementsByClassName('clickNow');

//添加下级分类 函数
function insertChild(obj,div){
    //获取当前操作节点的第一个子节点
    let oldChild = obj.firstElementChild;
    //在第一个子节点前插入节点
    obj.insertBefore(div,oldChild);
}

//添加同级分类 函数
function insertNextSibling(obj,div){
    //获取当前操作的节点
    let oldChild = clickObj[0];
    //把新节点插入当前操作节点之前
    obj.insertBefore(div,oldChild);
    //替换新节点和当前操作节点的位置
    obj.insertBefore(oldChild,div);

}

//封装正则匹配录入内容
function mateText(value){
    let patt = /[@*&$%!\/""“”’‘^#~`;；]/g;
    let res = patt.test(value);
    return res;
}

// 给节点绑定点击事件
function addClick(obj){
    // 给当前点击的元素添加唯一的类名
    obj.classList.add('clickNow');
    // obj.querySelector('.title').style.background = '#e1e9f3';
    //让文本编辑框隐藏
    inputText.style.display = 'none';
    // 获取所有类名为list的节点元素
    let lists = document.getElementsByClassName('list');
    // 遍历所有类名为list的元素
    for(let i=0;i<lists.length;i++){
        // 如果所遍历到的元素不是当前点击的那一个
        if(lists[i] !== obj){
            // 就把其他元素上的clickNow类名给移除
            //保证只有当前点击的元素有clickNow类名
            lists[i].classList.remove('clickNow');
            lists[i].querySelector('.title').style.background = '#fff';
        }else{
            lists[i].querySelector('.title').style.background = '#e1e9f3';
        }
    }
    
    // 获取当前点击元素的offset值
    let x = obj.offsetLeft;
    let y = obj.offsetTop;
    let tWidth =  obj.querySelector('.title').offsetWidth;
    //让按钮容器显示在当前点击的元素附近
    button.style.top = y-5+'px';
    button.style.left = x+15+tWidth+'px';
    // 让按钮容器显示
    button.style.display = 'block';
}

//点击关闭按钮，让透明操作层隐藏
closeOperate.onclick = function(){
    button.style.display = 'none';
}

// 绑定添加同级事件
addSibling.onclick = function(e){
    // 阻止冒泡事件
    e.stopPropagation();
    status = true;
    // 获取当前点击元素
    let clickNow = clickObj[0];

    // 获取所点击节点的父亲节点
    let clickPrent = clickNow.parentNode;
    
    //调用添加节点函数
    addNode(clickPrent);
    
    // 获取新添加同级分类的节点
    let newNode = Box.querySelector(".dom-"+n);

    // 获取当前点击节点父节点的marginLeft值
    let marL = clickNow.style.marginLeft;
    newNode.style.marginLeft = marL;

    //给新的同级节点绑定右击事件
    addClick(clickNow);

    //调用编辑节点函数
    editorNode(clickNow,newNode,5,15);

    //为新节点绑定单击显示下拉事件
    displayChild(clickNow);
    // 让按钮容器隐藏
    button.style.display = 'none';
    status = false;
    //给新节点添加clickNow类名，方便控制颜色样式
    newNode.classList.add('clickNow');
}

// 绑定添加下级事件
addChild.onclick = function(e){
    // 阻止冒泡事件的发生
    e.stopPropagation();
    // 获取当前点击节点
    let clickNow = clickObj[0];

    // 判断如果当前作用元素的父亲的父亲元素内有没有类名为child-box的元素
    if(!clickNow.querySelector('.child-box')){
        // 如果没有，去创建
        let childBox = document.createElement('div');
        // 添加类名
        childBox.classList.add('child-box');
        // 给当前点击元素添加子节点
        clickNow.append(childBox);
        // document.body.insertBefore(childBox,clickNow);
        // 调用添加节点函数
        addNode(childBox);
    }else{
        let childBox = clickNow.querySelector('.child-box');
        addNode(childBox);
    }
    // 获取新添加同级分类的节点
    let newNode = clickNow.querySelector(".dom-"+n);

    // 设置新添加节点的marginLeft值
    newNode.style.marginLeft = 15+'px';
    // 为新节点绑定右击事件
    addClick(newNode);
    //获取当前点击节点的i子节点
    let icon = clickNow.querySelector('.iconfont');
    // //判断i子节点的当前状态下的类名
    if(icon.className.indexOf('icon-jiantou3') > -1){
        icon.classList.remove('icon-jiantou3');
        icon.classList.add('icon-jiantouarrow486');
        icon.parentNode.querySelector('.child-box').style.display = 'block';
    }
    //调用编辑节点函数
    editorNode(clickNow,newNode,5,15);

    newNode.parentNode.parentNode.classList.add('clickNow');
    // 为新节点绑定单击显示下拉函数
    displayChild(newNode);
    button.style.display = 'none';
}

//封装编辑节点函数
function editorNode(clickNow,newNode,topT,leftT){
    let _value;
    // 获取当前点击节点的offset值
    let tLeft = newNode.offsetLeft;
    let tTop = newNode.offsetTop;
    inputText.style.display = 'block';
    inputText.style.top = tTop+topT+'PX';
    inputText.style.left = tLeft+leftT+'PX';
    //让input框出现时，自动获取焦点
    input.focus();
    //定义发送ajax请求参数
    let argData;
    //绑定键盘事件
    input.onkeydown = function(e){
        e.stopPropagation();
        //让操作按钮容器隐藏
        button.style.display = 'none';
        if(e.keyCode == 13){
            //让文本框失去焦点
            input.blur();
        }
    }
    //失去焦点时
    input.onblur = function(){
        //获取文本输入框的值
        _value = input.value;
        // 把文本转换为拼音首字母
        let valueText = pinyinUtil.getFirstLetter(_value, true);
        //失去焦点时，再次判断value值是否为空，若为空，就删除新加的节点，
        //否则给input框的value值赋值为空
        if(input.value == ''){
            console.log('fsdfsfsfsdfsdf');
            //调用删除新节点函数
            deleteNewNode(newNode);
        }else{
            console.log(_value);
            //替换文本
            newNode.querySelector('.title').innerHTML = _value;
            //发送ajax请求
            let parentNodeId = newNode.parentNode.parentNode.getAttribute('leavesid');
            let pNum = parseInt(parentNodeId);
            console.log(pNum);
            //发送ajax请求
            argData = {
                id:n,
                domc:_value,
                dompid:pNum,
                oid:0,
                iid:valueText,
                style:'',
                ut:0
            }
            //调用ajax函数
            ajax("POST",
                "/business/addDom",
                argData,
                function success(data) {
                    //请求成功后执行获取行列，创建表格
                    console.log('请求成功');
                }
            );
            //让输入框文本为空
            this.value = '';
        }
        //让input框隐藏
        inputText.style.display = 'none';
    }
}

// 绑定删除节点事件
removeNode.onclick = function(e){ 
    e.stopPropagation();
    //调用删除操作节点函数
    deleteNode();
}

//封装删除操作节点函数
function deleteNode(){
    //获取当前点击节点 
    let clickNow = clickObj[0];
    // 把当前删除按钮的父亲的父亲节点从祖先节点中移除
    clickNow.parentNode.removeChild(clickNow);
    button.style.display = 'none';
}

//封装删除新添加节点函数
function deleteNewNode(newNode){
    console.log(newNode);
    if(newNode){
        // 把当前删除按钮的父亲的父亲节点从祖先节点中移除
        newNode.parentNode.removeChild(newNode);
    }
    button.style.display = 'none';
}

// 编辑文本事件
editorText.onclick = function(e){
    e.stopPropagation();
    //获取当前点击节点（在此加下标获取节点元素
    //是为了避免，当用户没有点击时，获取不到类名为clickNow的元素）
    let clickNow = clickObj[0];

    // 获取当前点击节点的offset值
    let tLeft = clickNow.offsetLeft;
    let tTop = clickNow.offsetTop;

    //设置文本编辑框的位置
    inputText.style.top = tTop+'px';
    inputText.style.left = tLeft+15+'px';
    // 让文本编辑框在当前点击节点附近显示
    inputText.style.display = 'block';
    // 让button按钮容器隐藏
    button.style.display = 'none';
    input.focus();
    input.onkeydown = function(e){
        e.stopPropagation();
        button.style.display = 'none';
        if(e.keyCode == 13){
            let _value = input.value;
            // 把文本转换为拼音首字母
            let valueText = pinyinUtil.getFirstLetter(_value, true);
            //调用正则匹配函数
            let result = mateText(_value);
            if(result){
                alert('输入内容不能包含：* @ % $ ! & "" ‘’ / ~ # `');
            }else{
                clickNow.querySelector('.title').innerHTML = _value;
                // 给文本节点设置拼音首字母属性
                clickNow.querySelector('.title').setAttribute('iid',valueText);
                clickNow.querySelector('.title').style.color = '#000';
                inputText.style.display = 'none';
            }
            if(input.value == ''){
                //调用删除节点函数
                deleteNode();
            }
        }
    }
    //失去焦点时，让文本框内容为空
    input.onblur = function(){
        this.value = '';
        inputText.style.display = 'none';
    }
}

// 给所有节点绑定显示下拉函数
function displayChild(obj){
    // 获取所传对象的类名为iconfont的子元素
    let object = obj.querySelector('.iconfont');
    // 给箭头绑定单击事件
    object.onclick = function(e){
        //让文本编辑框按钮隐藏
        inputText.style.display = 'none';
        // 阻止事件冒泡
        e.stopPropagation();
        // 箭头元素的类名包含icon-jiantou3，则把当前类名移除，加上新的类名子
        // 并让下拉子元素的内容显示
        if(this.className.indexOf('icon-jiantou3') > -1){
            this.classList.remove('icon-jiantou3');
            this.classList.add('icon-jiantouarrow486');
            this.parentNode.querySelector('.child-box').style.display = 'block';
        }else{
            this.classList.remove('icon-jiantouarrow486');
            this.classList.add('icon-jiantou3');
            this.parentNode.querySelector('.child-box').style.display = 'none';
        }
    }
}

