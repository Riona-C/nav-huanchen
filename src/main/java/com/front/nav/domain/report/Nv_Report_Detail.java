package com.front.nav.domain.report;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

//报表详细内容
@Entity
public class Nv_Report_Detail {
    @Id
    @GeneratedValue
    //代表id自增
    private Integer id;

    //对应的报表中的id
    private Integer rptID;

    //报表中对应的行
    private Integer row;

    //报表中对应的列
    private  Integer col;

    //对应单元格内容
    private  String content;

    //是否具有选项("yes"  or  "no")
    private  String haschoic;

    //跨行数
    private Integer rowspan;

    //跨列数
    private Integer colspan;

    //可存样式（表头一样用这个）
    private String itstyle;

    //文字是否可换行"yes"  "no"
    private String hr;

    //文字是否可缩小"yes"  "no"
    private String tosm;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRptID() {
        return rptID;
    }

    public void setRptID(Integer rptID) {
        this.rptID = rptID;
    }

    public Integer getRow() {
        return row;
    }

    public void setRow(Integer row) {
        this.row = row;
    }

    public Integer getCol() {
        return col;
    }

    public void setCol(Integer col) {
        this.col = col;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getHaschoic() {
        return haschoic;
    }

    public void setHaschoic(String haschoic) {
        this.haschoic = haschoic;
    }

    public Integer getRowspan() {
        return rowspan;
    }

    public void setRowspan(Integer rowspan) {
        this.rowspan = rowspan;
    }

    public Integer getColspan() {
        return colspan;
    }

    public void setColspan(Integer colspan) {
        this.colspan = colspan;
    }

    public String getItstyle() {
        return itstyle;
    }

    public void setItstyle(String itstyle) {
        this.itstyle = itstyle;
    }

    public String getHr() {
        return hr;
    }

    public void setHr(String hr) {
        this.hr = hr;
    }

    public String getTosm() {
        return tosm;
    }

    public void setTosm(String tosm) {
        this.tosm = tosm;
    }
}
