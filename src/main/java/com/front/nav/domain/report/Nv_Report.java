package com.front.nav.domain.report;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.awt.*;

//报表列表
@Entity
public class Nv_Report {

    @Id
    @GeneratedValue
    //代表id自增
    private Integer id;
    //对应的报表名字
    private  String name;
//    报表表格html字符串
    private TextArea tableStr;


    public Integer getId() {
        return id;
    }

    public Nv_Report setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Nv_Report setName(String name) {
        this.name = name;
        return this;
    }

    public TextArea getTableStr() {
        return tableStr;
    }

    public void setTableStr(TextArea tableStr) {
        this.tableStr = tableStr;
    }
}
