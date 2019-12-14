package com.xinhai.reportmanager.api;

import java.util.List;


/**
 * QuantitationReportService服务类接口
 * 
 * @author xinhai conper 2016-03-10
 *
 * @version 1.0
 */

public interface QuantitationReportService {

	QuantitationReport findReport(String sampleId,String itemId);

	List<QuantitationReport> findSampleReports(String sampleId);

	void createReport(QuantitationReport report);

	void updateReport( QuantitationReport report);

	void deleteReport(String id);

	void deleteReports(List<String> reportIds);

	List<QuantitationReport> findAll();

	List<QuantitationReport> findReports(String keyword);

	List<Sample> getSamples();

	List<SampleItem> getSampleItems(String sampleId);

	SampleItem getSampleItem(String sampleId,String itemId);

	void setItemReport(SampleItem item);
}
