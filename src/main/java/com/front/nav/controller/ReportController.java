package com.front.nav.controller;


import com.alibaba.fastjson.JSONObject;
import com.front.nav.domain.report.Nv_Report;
import com.front.nav.domain.report.Nv_Report_Detail;
import com.front.nav.domain.report.Nv_Report_Right_List;
import com.front.nav.service.ReportService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.UUID;

//    报表导航

@Controller
public class ReportController {


    @Resource
    ReportService reportService;


    //        获取报表列表reportNav/Tsel
    @GetMapping(value = "/reportNav/Tsel")
    public String reportList(Model model){
        List<Nv_Report> reports = reportService.getReportList();
        // 这里是返给前端的值
        model.addAttribute("reports",reports);
        return "front/reportNav";
    }


    //    根据报表id查询报表中的单元格
    @PostMapping(value = "/reportNav/Msel")
    @ResponseBody
    public List<Nv_Report_Detail> tdList(@RequestBody JSONObject params){

        Integer pid = params.getInteger("id");
//        获取前端通过ajax传过来的值
        List<Nv_Report_Detail> reportDetails = reportService.getTableTd(pid);
        return reportDetails;
    }


    //    获取点击的单元格对应的选项
    @PostMapping(value = "/reportNav/Bsel")
    @ResponseBody
    public List<Nv_Report_Right_List> choiceList(@RequestBody JSONObject params){

        Integer tdId = params.getInteger("id");
//        获取前端通过ajax传过来的值
        List<Nv_Report_Right_List> choices = reportService.getChoices(tdId);
        return choices;
    }



    /**
     * 提取上传方法为公共方法
     * @param uploadDir 上传文件目录
     * @param file 上传对象
     * @throws Exception
     */
    private void executeUpload(String uploadDir,MultipartFile file) throws Exception
    {
        //文件后缀名
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        //上传文件名
        String filename = UUID.randomUUID() + suffix;
        //服务器端保存的文件对象
        File serverFile = new File(uploadDir + filename);
        //将上传的文件写入到服务器端文件内
        file.transferTo(serverFile);
    }



    //多文件上传
    @PostMapping(value = "/reportNav/upWord")

    public @ResponseBody String uploads(HttpServletRequest request,MultipartFile[] file) {
        try {
            //上传目录地址，项目真实的路径
            // String uploadDir = request.getSession().getServletContext().getRealPath("/") +"upload/";
//            暂时定的本地的
            String uploadDir = "E:/workSpace/idea/nav0420/nav/src/upload/";
            System.out.println("dkdfdkjfhdkjhfkdj"+uploadDir);
            //如果目录不存在，自动创建文件夹
            File dir = new File(uploadDir);
            if(!dir.exists())
            {
                dir.mkdir();
            }
            //遍历文件数组执行上传
            for (int i =0;i<file.length;i++) {
                if(file[i] != null) {
                    //调用上传方法
                    executeUpload(uploadDir, file[i]);
                }
            }
        }catch (Exception e)
        {
            //打印错误堆栈信息
            e.printStackTrace();
            return "上传失败";
        }

        return "上传成功";
    }





}
