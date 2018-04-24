package com.front.nav.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class SubjectController {

    //    科目导航
    @GetMapping(value = "/subject")
    public String subjectView(){
        return "front/subjectNav";
    }


}
