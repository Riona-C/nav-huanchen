package com.front.nav.repository;

import com.front.nav.domain.report.Nv_Report;
import org.springframework.data.jpa.repository.JpaRepository;

//对report表
public interface ReportRepository extends JpaRepository<Nv_Report,Integer> {

}
