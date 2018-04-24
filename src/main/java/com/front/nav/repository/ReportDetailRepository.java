package com.front.nav.repository;

import com.front.nav.domain.report.Nv_Report_Detail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//针对报表的单元格的表进行操作
public interface ReportDetailRepository extends JpaRepository<Nv_Report_Detail,Integer> {

//    根据报表id查找单元格
    public List<Nv_Report_Detail> findByRptID(Integer rptID);
}
