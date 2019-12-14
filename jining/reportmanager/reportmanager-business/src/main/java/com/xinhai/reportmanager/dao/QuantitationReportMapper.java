package com.xinhai.reportmanager.dao;

import java.util.List;

import com.xinhai.reportmanager.api.QuantitationReport;
import com.xinhai.reportmanager.api.Sample;
import com.xinhai.reportmanager.api.SampleItem;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * mybatis Mapper接口，对应同名称的xml文件
 * 
 * @author xinhai conper 2016-03-11
 *
 */
@Repository
public interface QuantitationReportMapper {

	void createReport(QuantitationReport report);

	void updateReport(@Param("report") QuantitationReport report);

	void deleteReports(List<String> reportIds);

	void deleteReport(@Param("id")String id);

	QuantitationReport findReport(@Param("sampleId")String sampleId,@Param("itemId")String itemId);

	List<QuantitationReport> findSampleReports(@Param("sampleId")String sampleId);

	List<QuantitationReport> findAll();

    List<QuantitationReport> findReports(@Param("keyword")String keyword);

	List<Sample> getSamples();

	List<SampleItem> getSampleItems(@Param("sampleId")String sampleId);

	SampleItem getSampleItem(@Param("sampleId")String sampleId,@Param("itemId")String itemId);

	void setItemReport(SampleItem item);
}