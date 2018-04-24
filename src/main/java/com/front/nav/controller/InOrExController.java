package com.front.nav.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//    收支导航

@Controller
public class InOrExController {

    @GetMapping(value = "/inOrEx")
    public String inOrExView(){
        return "front/inOrExNav";
    }


}
