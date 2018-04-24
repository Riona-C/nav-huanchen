
//wmethod传“GET”或“POST”，url问后台要,data是数据，success成功后调用的方法
function ajax(method,url,data,success)
{
    let xmlhttp;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    // get 跟post  需要分别写不同的代码
    if (method=='GET') {
        // // get请求
        // if (data) {
        //     // 如果有值
        //     url+='?';
        //     url+=data;
        // }else{
        //
        // }
        // 设置 方法 以及 url
        xmlhttp.open(method,url);

        // send即可
        xmlhttp.send();
    }else{
        // post请求
        // post请求 url 是不需要改变
        xmlhttp.open(method,url);

        // 需要设置请求报文,这里代表传json
        xmlhttp.setRequestHeader("Content-type","application/json;charset=utf-8");

        // 判断data send发送数据
        if (data) {
            data = JSON.stringify(data);
            // 如果有值 从send发送
            xmlhttp.send(data);
        }else{
            // 木有值 直接发送即可
            xmlhttp.send();
        }
    }

    // 注册事件
    xmlhttp.onreadystatechange = function () {
        // 在事件中 获取数据 并修改界面显示
        if (xmlhttp.readyState==4&&xmlhttp.status==200) {

            // 当 onreadystatechange 调用时 说明 数据回来了
            // ajax.responseText;

            // 如果说 外面可以传入一个 function 作为参数 success,将后台返回的数据字符串转对象

            let response = xmlhttp.responseText;
            if (typeof response == 'string') {
                try {
                    JSON.parse(response);
                    success(JSON.parse(response));
                } catch(e) {
                    console.log(e);
                    success(response);
                }
            }
        }
    };
}