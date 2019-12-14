package com.xinhai.reportmanager.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.net.httpserver.HttpContext;
import com.xinhai.reportmanager.api.QuantitationReport;
import com.xinhai.reportmanager.api.QuantitationReportService;
import com.xinhai.reportmanager.api.Sample;
import com.xinhai.reportmanager.api.SampleItem;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.security.controller.InvokeResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

/**
 * Created by shanmaoju on 2018/6/22.
 */
@Controller
@RequestMapping("/report")
public class ReportController {
    @Autowired
   private QuantitationReportService reportService;

    @RequestMapping(value = "/samples", method = RequestMethod.GET)
    @ResponseBody
    public List<Sample> getSamples() {
        List<Sample> list=reportService.getSamples();
        return list;
    }

    @RequestMapping(value = "/view/{sampleId}/{itemId}", method = RequestMethod.GET)
    @ResponseBody
    public List<QuantitationReport> getDetails(@PathVariable("sampleId") String sampleId,@PathVariable("itemId") String itemId) {
        List<QuantitationReport> reportList=new ArrayList<QuantitationReport>();
        if(itemId.equals("null")||itemId.isEmpty()) {
            reportList = reportService.findSampleReports(sampleId);
        }else{
            QuantitationReport report=reportService.findReport(sampleId,itemId);
            reportList.add(report);
        }
        return reportList;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteReport(@PathVariable("id") String id) {
        reportService.deleteReport(id);
    }

    @RequestMapping(value = "/items/{sampleId}", method = RequestMethod.GET)
    @ResponseBody
    public List<SampleItem> getItems(@PathVariable("sampleId") String sampleId) {
        List<SampleItem> list=reportService.getSampleItems(sampleId);
        return list;
    }

    @RequestMapping(value = "/getfiles", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray getFiles() {
        JSONArray files=new JSONArray();
        Properties props=new Properties();
        try {
            InputStream in=Thread.currentThread().getContextClassLoader().getResourceAsStream("/custom.properties");
            props.load(in);
            String reportPath = props.getProperty("report.path");
            File file = new File(reportPath);
            if (!file.isDirectory()||!file.exists()) {
                return files;
            } else if (file.isDirectory()) {
                String[] filelist = file.list();
                int length=filelist.length;
                for(int i=0;i< length ;i++){
                    JSONObject jo=new JSONObject();
                    jo.put("fileName",filelist[i]);
                    files.add(jo);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return files;
        }
        return files;
    }

    @RequestMapping(value = "/setItemReport", method = RequestMethod.POST)
    @ResponseBody
    @JsonIgnoreProperties(ignoreUnknown = true)
    public void setItemReport(@RequestBody SampleItem item) {
        String userId= CurrentLoginUser.getId();
        item.setUpdatedBy(userId);
        item.setUpdatedAt(new Date());
        reportService.setItemReport(item);
    }

    @RequestMapping(value = "/getSampleItem/{sampleId}/{itemId}", method = RequestMethod.GET)
    @ResponseBody
    public SampleItem getFileName(@PathVariable("sampleId")String sampleId,@PathVariable("itemId")String itemId){
        SampleItem item=reportService.getSampleItem(sampleId,itemId);
        return item;
    }
}
