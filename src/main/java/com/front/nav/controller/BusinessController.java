package com.front.nav.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.front.nav.domain.business.Nv_Business_tree;
import com.front.nav.service.BusinessService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//    业务导航

@Controller
public class BusinessController {

    @Resource
    BusinessService businessService;


    //前台部分
    @GetMapping(value = "/business")
    public String businessView(){
        return "front/businessNav";
    }




    //    后台的业务树状图操作
    //获取数据库中的数据
    @GetMapping(value = "/admin/business")
    public String businessData(Model model){
        List<Nv_Business_tree> businessTrees = businessService.getBusTreeDom();


        String  treeDatas = JSON.toJSONString(businessTrees);

        model.addAttribute("busiTree",treeDatas);

        return "admin/businessNav";
    }



    //    像数据库中插入节点
    @PostMapping(value = "/business/addDom")
    @ResponseBody
    public String addBusDom(@RequestBody JSONObject params){

        Nv_Business_tree treeData = new Nv_Business_tree();

        treeData.setDomc(params.getString("domc"));
        treeData.setDompid(params.getInteger("dompid"));
        treeData.setIid(params.getString("iid"));
        treeData.setOid(params.getInteger("oid"));
        treeData.setUt(params.getInteger("ut"));
        treeData.setStyle(params.getString("style"));

        businessService.saveDom(treeData);

        Map map=new HashMap();
        map.put("id",treeData.getId());
        String  state= JSON.toJSONString(map);

        return state;
    }




    //更新节点数据
    @PostMapping(value = "/business/editDom")
    @ResponseBody
    public String editBusiDom(@RequestBody JSONObject params){

        Integer domId = params.getInteger("id");
        Nv_Business_tree editDom = businessService.editDom(domId);
        editDom.setStyle(params.getString("style"));
        editDom.setUt(params.getInteger("ut"));
        editDom.setOid(params.getInteger("oid"));
        editDom.setIid(params.getString("iid"));
        editDom.setDompid(params.getInteger("dompid"));
        editDom.setDomc(params.getString("domc"));
        businessService.saveDom(editDom);


        Map map=new HashMap();
        map.put("msg","更新成功");
        String  state= JSON.toJSONString(map);

        return state;

    }


    //删除节点
    @PostMapping(value = "/business/delDom")
    @ResponseBody
    public String delBusiDom(@RequestBody JSONObject params){
        Integer domId = params.getInteger("id");
        businessService.delDom(domId);

        Map map=new HashMap();
        map.put("msg","删除成功");
        String  state= JSON.toJSONString(map);

        return state;

    }



}
