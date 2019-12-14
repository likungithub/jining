package com.xinhai.reportmanager.business;

import java.util.List;

import com.xinhai.reportmanager.api.Sample;
import com.xinhai.reportmanager.api.SampleItem;
import com.xinhai.reportmanager.dao.QuantitationReportMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.reportmanager.api.QuantitationReport;
import com.xinhai.reportmanager.api.QuantitationReportService;
import org.springframework.stereotype.Service;


/**
 * QuantitationReportService接口实现类
 * 
 * @author xinhai conper 2016-03-11
 *
 */
@Service
public class QuantitationReportServiceImpl implements QuantitationReportService {
	@Autowired
	private QuantitationReportMapper reportMapper;


	public void createReport(QuantitationReport report) {
		reportMapper.createReport(report);
	}

	public void updateReport(QuantitationReport report){
		reportMapper.updateReport(report);
	}

	public void deleteReports(List<String> reportIds){
		reportMapper.deleteReports(reportIds);
	}

	public void deleteReport(String reportId){
		reportMapper.deleteReport(reportId);
	}

	public List<QuantitationReport> findAll(){
		return reportMapper.findAll();
	}

	public QuantitationReport findReport(String sampleId,String itemId){
		QuantitationReport report=reportMapper.findReport(sampleId,itemId);
		return report;
	}

	public List<QuantitationReport> findSampleReports(String sampleId){
		List<QuantitationReport> list=reportMapper.findSampleReports(sampleId);
		return list;
	}
	public List<QuantitationReport> findReports(String keyword)
	{
		return reportMapper.findReports(keyword);
	}

	public List<Sample> getSamples(){
		return reportMapper.getSamples();
	}

	public SampleItem getSampleItem(String sampleId,String itemId){
		return reportMapper.getSampleItem(sampleId,itemId);
	}

	public List<SampleItem> getSampleItems(String sampleId){
		return reportMapper.getSampleItems(sampleId);
	}

	public void setItemReport(SampleItem item){
		reportMapper.setItemReport(item);
	}
}
