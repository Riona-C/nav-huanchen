package com.front.nav.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//    资金导航


@Controller
public class CapitalController {


    @GetMapping(value = "/capital")
    public String capitalView(){
        return "front/capitalNav";
    }

}
