package com.front.nav.domain.business;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Nv_Business_tree {

    @Id
    @GeneratedValue
    //代表id自增
    private Integer id;

    //节点内容
    private String domc;

    //节点的父id
    private Integer dompid;

    //    节点的顺序
    private Integer oid;

    //首字母缩写
    private String iid;

    //使用次数
    private Integer ut;

    //节点样式
    private String style;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDomc() {
        return domc;
    }

    public void setDomc(String domc) {
        this.domc = domc;
    }

    public Integer getDompid() {
        return dompid;
    }

    public void setDompid(Integer dompid) {
        this.dompid = dompid;
    }

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public String getIid() {
        return iid;
    }

    public void setIid(String iid) {
        this.iid = iid;
    }

    public Integer getUt() {
        return ut;
    }

    public void setUt(Integer ut) {
        this.ut = ut;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }
}
