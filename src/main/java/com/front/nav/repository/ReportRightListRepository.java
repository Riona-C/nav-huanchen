package com.front.nav.repository;

import com.front.nav.domain.report.Nv_Report_Right_List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRightListRepository extends JpaRepository<Nv_Report_Right_List,Integer> {

//    通过单元格tdid进行查找
    public List<Nv_Report_Right_List> findByTdid(Integer tdid);

}
