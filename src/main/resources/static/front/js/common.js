// 可能会公用的方法
//获取鼠标当前点击位置
function getMousePos(event) {
    let e = event || window.event;
    return {'x':e.pageX,'y':e.pageY}
}



//获取表格某一列
function getTdValue(table,nth)
{
    for(let i=1;i<table.rows.length;i++)
    {
        alert(table.rows[i].cells[nth].innerHTML);
    }
}
