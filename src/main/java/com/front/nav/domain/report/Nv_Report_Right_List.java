package com.front.nav.domain.report;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

//报表单元格右键菜单选项
@Entity
public class Nv_Report_Right_List {
    @Id
    @GeneratedValue
    //代表id自增
    private Integer id;
//    对用的父id
    private  Integer Pid;
//    显示内容
    private String name;
//    菜单的颜色和字体
    private String style;
//    对应的报表中的单元格的id
    private Integer tdid;
//    对应的凭证id
    private Integer pzid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPid() {
        return Pid;
    }

    public void setPid(Integer pid) {
        Pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public Integer getTdid() {
        return tdid;
    }

    public void setTdid(Integer tdid) {
        this.tdid = tdid;
    }

    public Integer getPzid() {
        return pzid;
    }

    public void setPzid(Integer pzid) {
        this.pzid = pzid;
    }
}
