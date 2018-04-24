文件说明
收支（摘要分类）
业务（三定方案）
报表（）
资金（月份）
过程（工资）
科目（）

images:图片文件夹



css:样式文件夹
catalog.css   分类导航的中间部分的样式
event.css
leftBar.css 左侧导航，以及页面的公共部分样式（搜索框，上下结构，底部固定条）



html:页面文件夹
catalogNav.jsp  分类导航
eventNav.jsp  事项导航
reportNav.jsp  报表导航



js:js文件夹
catalog.js   分类导航的事件，中间部分的分类按照数据条数
event.js    事项导航的事件
report.js   报表导航的事件
resize.js  上下两部分的放大缩小
tree.js  树，输入框的搜索


url=
/*
1、收支 inOrExNav
2、业务 businessNav
3、报表 reportNav
4、资金 capitalNav
5、过程 processNav
6、科目 subjectNav
+------+------+------+------+
| 查询 | 增加 | 删除 | 修改 |
| Tsel | Tins | Tdel | Tupd |
| Msel | Mins | Mdel | Mupd |
| Bsel | Bins | Bdel | Bupd |
+------+------+------+------+
//(post,url,true)
var id=ID;
var name=Name;
var pid=PID;
var oid=OID;
var iid=IID:
var ut=UT;
var url=fileName.jsp?id=ID&name=Name&pid=PID&oid=OID&iid=IID&ut=UT
例如：收支导航上部分增加fileName就是
url=InOrExNavTins.jsp?id="22"&name="测试增加"&pid="2"&oid="33"&iid="cszj"&ut="0" //新增加的ut=0
*/



/*
服务器
+------------------------+-----------------------------------------------------------+
|财务软件的服务器地址：　| http://192.168.1.30:8088/R9iIndex.jsp 用户名1密码1
+------------------------+-----------------------------------------------------------+
|数据库ＳＱＬ服务器地址：| 192.168.1.30 :1433 用户sa密码空
+------------------------+-----------------------------------------------------------+
|数据库文件地址：　　　　| \\192.168.1.30\李皓\dataBase
+------------------------+-----------------------------------------------------------+
|数据库文件：　　　　　　| u8g15_dat.mdf , u8g15_log.ldf  //需要停止服务后拷贝、覆盖
|　　　　　　　　　　　　| \\192.168.1.30\李皓\凭证导航Nav系统
+------------------------+-----------------------------------------------------------+
|财务软件注册表地址：
+------------------------+-----------------------------------------------------------+
|	HKEY_CURRENT_USER\Software\UFGOV\U8\DbInfo\D:&UFGOV&U8&Client&
|	HKEY_CURRENT_USER\Software\UFGOV\U8
+------------------------+-----------------------------------------------------------+
*/


















