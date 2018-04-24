package com.front.nav.service;

import com.front.nav.domain.report.Nv_Report;
import com.front.nav.domain.report.Nv_Report_Detail;
import com.front.nav.domain.report.Nv_Report_Right_List;

import java.util.List;

public interface ReportService {

    //    查询报表列表
    public List<Nv_Report> getReportList();

//    查询单个报表(报表的单元格),根据传的报表id
    public List<Nv_Report_Detail> getTableTd(Integer rptID);


//    点击单元格后获取对应的菜单选项
    public List<Nv_Report_Right_List> getChoices(Integer tdid);


}
