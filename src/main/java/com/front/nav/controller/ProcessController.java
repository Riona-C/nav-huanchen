package com.front.nav.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


//    过程导航
@Controller
public class ProcessController {


    @GetMapping(value = "/process")
    public String processView(){
        return "front/processNav";
    }



}
