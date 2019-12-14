package com.xinhai.reportmanager.controller;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import com.alibaba.fastjson.JSONObject;
import com.sun.net.httpserver.HttpContext;
import org.apache.pdfbox.text.PDFTextStripperByArea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.xinhai.reportmanager.api.QuantitationReport;
import com.xinhai.reportmanager.api.QuantitationReportService;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.*;


import java.awt.Rectangle;
import java.util.Properties;

@Controller
@RequestMapping("/parsereport")
public class PdfUploadController {

	@Autowired
	private QuantitationReportService reportService;

	@RequestMapping("/import")
	@ResponseBody
	public JSONObject importPdf(@RequestParam("pdfFile") MultipartFile file, HttpServletRequest request)
			throws IOException {
		JSONObject message=new JSONObject();
		if(!file.isEmpty()) {
			InputStream inputStream = file.getInputStream();
			PDDocument document = PDDocument.load(inputStream);

			QuantitationReport report=new QuantitationReport();
			report.setSampleId("");
			report.setFileName("");
			report.setItemId("");

			doParse(document,report,message);
		}
		else{
			message.put("state","empty");
		}
		return message;
	}

	@RequestMapping("/parse/{fileName}/{sampleId}/{itemId}")
	@ResponseBody
	public JSONObject parsePdf(@PathVariable("fileName") String fileName,@PathVariable("sampleId") String sampleId,@PathVariable("itemId") String itemId, HttpServletRequest request)
	throws IOException {
		JSONObject message=new JSONObject();
		Properties props=new Properties();
		InputStream in=Thread.currentThread().getContextClassLoader().getResourceAsStream("/custom.properties");
		props.load(in);
		String reportPath = props.getProperty("report.path");
		File file=new File(reportPath+"/"+fileName);
		PDDocument document=PDDocument.load(file);

		QuantitationReport report=reportService.findReport(sampleId,itemId);
		if(report==null) {
			report = new QuantitationReport();
			report.setSampleId(sampleId);
			report.setItemId(itemId);
		}

		doParse(document,report,message);
		return message;
	}

	private void doParse(PDDocument document,QuantitationReport report,JSONObject message){
		try
		{
			if(document.isEncrypted()){
				//如果是加密的，不进行处理
				message.put("state","failed");
				message.put("message","加密文件，不进行处理。");
				return;
			}
			PDFTextStripperByArea stripper = new PDFTextStripperByArea();
			stripper.setSortByPosition(true);
			//划定区域
			Rectangle rect= new Rectangle(0, 0, 700, 800);
			stripper.addRegion("area", rect);
			PDPageTree allPages = document.getDocumentCatalog().getPages();
			int i = 0;
			Iterator<PDPage> pages=allPages.iterator();
			String data = "";
			boolean isTable=false;
			SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd HH:mm" );
			while(pages.hasNext()){
				PDPage page=pages.next();
				stripper.extractRegions(page);
				//获取区域的text
				data = stripper.getTextForRegion("area");
				data = data.trim();
				String[] datas = data.split("\r\n");
				//对文本进行分行处理
				String[] infos;
				for( i = 0; i<datas.length; ++i){
					infos = datas[i].split(" ");
					if(i==0){
						continue;
					}
					if(i==1){
						report.setLabName(datas[1].replaceAll("Lab Name:",""));
						continue;
					}else if(i==2){
						infos=datas[2].split("Method:");
						report.setInstrument(infos[0].replaceAll("Instrument:",""));
					}else if(i==3){//here
						report.setUser(infos[1]);
					}else if(i==4){
						infos=datas[4].split("Cali");
						report.setBatch(infos[0].replaceAll("Batch:",""));
					}else if(datas[i].startsWith("Sample Raw File")) {
						isTable=true;
					}else if(datas[i].startsWith("Flag Legend")) break;
					else if(isTable){
						report.setFileName(infos[0]);
						report.setSampleType(infos[1]+infos[2]);
						report.setVialPosition(infos[3]);
						String[] acDateInfo=infos[4].split("/");
						String month=acDateInfo[0].length()==1?("0"+acDateInfo[0]):acDateInfo[0];
						String day=acDateInfo[1].length()==1?("0"+acDateInfo[1]):acDateInfo[1];
						String year=acDateInfo[2];
						String acDate=year+"-"+month+"-"+day;
						report.setAcquisitionDate(sdf.parse(acDate+" "+ infos[5]));
						report.setInjectionVolume(Integer.parseInt(infos[6]));
						report.setCompoundName(infos[7]);
						report.setTotalArea(infos[8]);
						report.setRetentionTime(infos[9]);
						report.setCalculatedAmount(infos[10]);
						if(infos.length==12) {
							report.setUnits(infos[11]);
						}
						if(report.getId()==0) {
							reportService.createReport(report);
						}else{
							reportService.updateReport(report);
						}
						System.out.println(report.toString());
						message.put("state","success");
						message.put("message","图谱信息读取完毕");
					}
				}
			}

			document.close();
		} catch (Exception e){
			e.printStackTrace();
			message.put("state","hasError");
			message.put("message",e.getMessage());
		}
	}
}