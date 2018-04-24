//id:id,name:显示内容,pId:父id,oId:排序,navId:所属上中下？id,iId:拼音首字母,ut:使用次数

let data = [ {
	id : "1",
	name : "苏序",
	pid : "7",
	oid : "3",
	iid : "sx",
	ut : "0"
}, {
	id : "2",
	name : "苏澹",
	pid : "1",
	oid : "4",
	iid : "sz",
	ut : "0"
}, {
	id : "3",
	name : "苏涣",
	pid : "1",
	oid : "11",
	iid : "sh",
	ut : "0"
}, {
	id : "4",
	name : "苏洵",
	pid : "1",
	oid : "12",
	iid : "sx",
	ut : "0"
}, {
	id : "5",
	name : "苏轼",
	pid : "4",
	oid : "13",
	iid : "ss",
	ut : "0"
}, {
	id : "6",
	name : "苏辙",
	pid : "4",
	oid : "14",
	iid : "sz",
	ut : "0"
}, {
	id : "7",
	name : "苏杲",
	pid : "null",
	oid : "1",
	iid : "sh",
	ut : "0"
}, {
	id : "8",
	name : "苏玩",
	pid : "null",
	oid : "30",
	iid : "sw",
	ut : "0"
}, {
	id : "9",
	name : "苏迈",
	pid : "5",
	oid : "19",
	iid : "sm",
	ut : "0"
}, {
	id : "10",
	name : "苏迨",
	pid : "5",
	oid : "20",
	iid : "sd",
	ut : "0"
}, {
	id : "11",
	name : "苏过",
	pid : "5",
	oid : "21",
	iid : "sg",
	ut : "0"
}, {
	id : "12",
	name : "苏遁",
	pid : "5",
	oid : "22",
	iid : "sx",
	ut : "0"
}, {
	id : "24",
	name : "测试",
	pid : "2",
	oid : "5",
	iid : "cs",
	ut : "5"
}, {
	id : "24",
	name : "测试1",
	pid : "2",
	oid : "6",
	iid : "cs",
	ut : "5"
}, {
	id : "24",
	name : "测试1",
	pid : "2",
	oid : "7",
	iid : "cs",
	ut : "5"
}, {
	id : "24",
	name : "测试1",
	pid : "2",
	oid : "8",
	iid : "cs1",
	ut : "5"
}, {
	id : "24",
	name : "测试1",
	pid : "2",
	oid : "9",
	iid : "cs",
	ut : "5"
}, {
	id : "25",
	name : "测试2",
	pid : "2",
	oid : "10",
	iid : "cs2",
	ut : "5"
} ];

let sendData = {
	id : "",
	name : "",
	pid : "",
	oid : "",
	iid : "",
	ut : ""
};

// 搜索框右边的箭头
let searchBth = document.getElementsByClassName("select-btn")[0];
// 展示搜索结果的盒子
let searchListDiv = document.getElementsByClassName("select-list")[0];
// 输入框
let searchInput = document.getElementsByClassName("select-input")[0];
// 输入框的值
let searchVal;

let show = 1;// 控制下拉列表是否显示,0不显示，1显示

// 要添加树的容器
// let cateTreeDiv = document.getElementsByClassName("left-choice")[0];
// 将树形结构放到下拉中
splitData(data, searchListDiv);

function splitData(data, ele) {
	// 先清空内容
	searchListDiv.innerHTML = "";
	// 遍历数据
	for (let i = 0; i < data.length; i++) {
		let domDiv = document.createElement("div");
		// id
		let cateId = data[i].id;
		// 显示内容
		let cateName = data[i].name;

		// 设置唯一类名
		domDiv.className = "dom-" + cateId;
		// 设置节点的Id
		domDiv.setAttribute("leavesId", cateId);
		// 设置首字母
		domDiv.setAttribute("initial", data[i].iid);
		// 如果父id为空则显示
		if (data[i].pid == "null") {
			domDiv.style.display = "block";
		} else {
			domDiv.style.display = "none";
		}

		// 添加公共类名
		domDiv.classList.add("domTree");

		// 添加到放置树的div中
		ele.appendChild(domDiv);

		// 子节点个数
		let childNum = 0;
		// 遍历是否有子节点
		for (let j = 0; j < data.length; j++) {
			// 如果当前数据的id是另一条数据的父id，则在当前的旁边添加一个向下展开的箭头
			if (data[i].id == data[j].pid) {
				childNum++;
			} else {

			}
		}

		// 设置显示内容
		domDiv.innerHTML = cateName;
		if (childNum == 0) {
			domDiv.innerHTML = cateName;
			domDiv.setAttribute("childLeft", "0");
		} else {
			domDiv.setAttribute("childLeft", "");
			let imgStr = document.createElement("img");
			imgStr.setAttribute("src", 'front/images/select-btn.png');

			domDiv.appendChild(imgStr);

			imgStr.onclick = function() {
				window.event ? window.event.cancelBubble = true : e
						.stopPropagation();
				// 父亲的左间距
				let marLeft = domDiv.getAttribute("childLeft");
				clickShow(data, domDiv, marLeft);

			}

		}

		// 为节点绑定点击事件
		domDiv.onclick = function() {
			// 更改sendData对应的值
			sendData.id = data[i].id;
			sendData.name = data[i].name;
			sendData.pid = data[i].pid;
			sendData.oid = data[i].oid;
			sendData.iid = data[i].iid;
			sendData.ut = data[i].ut;
			// 像后台传值进行查询该类下的常用类，或者显示到中间部分
			ajax(ajaxFirst, "Msel", sendData);
		}

	}

}

function clickShow(data, ele, marLeft) {
	let clickId = ele.getAttribute("leavesId");
	let childrenArr = [];
	for (let m = 0; m < data.length; m++) {
		// 如果点击的id和数据中的父id一样，获取它的子元素（父id等于点击的id）并显示
		if (data[m].pid == clickId) {
			// 将子元素存入数组
			childrenArr.push(data[m]);

			if (marLeft == "") {
				document.getElementsByClassName("dom-" + data[m].id)[0].style.marginLeft = 15 + "px";
				document.getElementsByClassName("dom-" + data[m].id)[0]
						.setAttribute("childLeft", 15);
			} else {
				let intLeft = parseInt(marLeft) + 15;
				document.getElementsByClassName("dom-" + data[m].id)[0].style.marginLeft = intLeft
						+ "px";
				document.getElementsByClassName("dom-" + data[m].id)[0]
						.setAttribute("childLeft", intLeft);

			}

		}
	}

	// 遍历子元素，将子元素显示
	for (let n = 0; n < childrenArr.length; n++) {

		let classQ = "dom-" + childrenArr[n].id;
		let target = document.getElementsByClassName(classQ)[0];
		target.style.display = "block";

		let targetParent = document.getElementsByClassName("dom-" + clickId)[0];
		insertAfter(target, targetParent);

	}

}

searchBth.onclick = function() {

	if (show == 0) {
		searchListDiv.style.display = "block";
		show = 1;
	} else {
		searchListDiv.style.display = "none";
		show = 0;
	}
	splitData(data, searchListDiv);

};

// 输入框中输入内容后查询

searchInput.onkeyup = function() {

	searchListDiv.style.display = "block";

	// 获取输入框的值
	searchVal = searchInput.value;
	// 如果输入框为空,显示树形结构
	if (searchVal == "") {
		console.log("111111")
		splitData(data, searchListDiv);
	} else {

		// 将用户输入的内容转换为大写
		// searchVal = searchVal.toUpperCase();
		searchVal = searchVal.toLowerCase();

		// 满足条件的数据
		let sameArr = [];

		// 遍历数据中的拼音首字母
		for (let n = 0; n < data.length; n++) {
			// 数据中的拼音
			let initletter = data[n].iid;
			initletter = initletter.toLowerCase();
			if (initletter.indexOf(searchVal) > -1) {
				sameArr.push(data[n]);

			}

		}

		// 先清空内容
		createList(sameArr);
	}

};

// searchInput.onblur = function() {
// searchListDiv.style.display = "none";
// // 失去焦点清空输入框，可清可不清，自己决定
// searchInput.value = "";
// show = 0;
// };

// 创建列表
function createList(arr) {
	// 先清空内容
	searchListDiv.innerHTML = "";

	for (let m = 0; m < arr.length; m++) {
		// 将数据显示到列表中
		let itemDiv = document.createElement("div");
		itemDiv.className = "item-" + arr[m].id;
		itemDiv.innerHTML = arr[m].name;
		itemDiv.setAttribute("initial", arr[m].iid);
		itemDiv.setAttribute("dataId", arr[m].id);

		searchListDiv.appendChild(itemDiv);

		itemDiv.onclick = function() {

			// 更改sendData中对应的值
			sendData.id = arr[m].id;
			sendData.name = arr[m].name;
			sendData.pid = arr[m].pid;
			sendData.oid = arr[m].oid;
			sendData.iid = arr[m].iid;
			sendData.ut = arr[m].ut;
			// 像后台传值进行查询该类下的常用类，或者显示到中间部分
			ajax(ajaxFirst, "Msel", sendData);
		}

	}

	// 判断文字内容哪些匹配，更改成红色
	let items = searchListDiv.children;

	for (let k = 0; k < items.length; k++) {
		let initAttr = items[k].getAttribute("initial");
		// 红色开始位置
		let redIndex = initAttr.indexOf(searchVal);
		// 红色结束位置
		let endIndex = redIndex + searchVal.length;

		// 文字内容
		let divHtml = items[k].innerHTML;

		// 前面
		let fontText = divHtml.substring(0, redIndex);
		// 截取要改颜色的文字
		let redText = divHtml.substring(redIndex, endIndex);
		// 后面
		let afterText = divHtml.substring(endIndex, divHtml.length);

		items[k].innerHTML = fontText
				+ "<p style='color: red;display: inline-block;text-indent: 0;'>"
				+ redText + "</p>" + afterText;
	}
}

// DOMinsertAfter()方法
function insertAfter(newElement, targetElement) {
	let parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		// 如果最后的节点是目标元素，则直接添加。因为默认是最后
		parent.appendChild(newElement);
	} else {
		// 如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
		parent.insertBefore(newElement, targetElement.nextSibling);

	}
}
