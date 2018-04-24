package com.front.nav.service.impl;


import com.front.nav.domain.report.Nv_Report;
import com.front.nav.domain.report.Nv_Report_Detail;
import com.front.nav.domain.report.Nv_Report_Right_List;
import com.front.nav.repository.ReportDetailRepository;
import com.front.nav.repository.ReportRepository;
import com.front.nav.repository.ReportRightListRepository;
import com.front.nav.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;//报表列表

    @Autowired
    private ReportDetailRepository reportDetailRepository;//报表详细内容

    @Autowired
    ReportRightListRepository reportRightListRepository;//报表单元格对应选项


    //    获取报表列表
    @Override
    public List<Nv_Report> getReportList(){
        return reportRepository.findAll();
    }


    //    点击列表中的报表，根据报表id查询单元格，获取报表单元格
    @Override
    public List<Nv_Report_Detail> getTableTd(Integer rptID){
        return reportDetailRepository.findByRptID(rptID);
    }


    //    点击单元格获取对应的选项
    @Override
    public List<Nv_Report_Right_List> getChoices(Integer tdid){
        return reportRightListRepository.findByTdid(tdid);
    }



}
