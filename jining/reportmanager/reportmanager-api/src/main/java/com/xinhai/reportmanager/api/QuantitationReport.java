package com.xinhai.reportmanager.api;

import java.util.Date;

/**
 * Created by fanxi on 2016-3-7.
 */
public class QuantitationReport {
	private int id;
	private String sampleId;
	private String itemId;
	private String sampleName;
	private String itemName;
	private String labName;
	private String instrument;
	private String user;
	private String batch;
	private String fileName;
	private String sampleType;
	private String vialPosition;
	private int injectionVolume;
	private Date acquisitionDate;
	private String compoundName;
	private String totalArea;
	private String retentionTime;
	private String calculatedAmount;
	private String units;
	private String uploadedBy;
	private Date uploadedAt;

	public String getLabName() {
		return labName;
	}

	public void setLabName(String labName) {
		this.labName = labName;
	}

	public String getSampleId(){return sampleId;}

	public void setSampleId(String sampleId){this.sampleId=sampleId; }

	public String getItemId(){ return itemId;}

	public void setItemId(String itemId){ this.itemId=itemId; }

	public String getSampleName(){return sampleName;}

	public void setSampleName(String sampleName){ this.sampleName=sampleName;}

	public String getItemName(){ return this.itemName;}

	public void setItemName(String itemName){this.itemName=itemName; }

	public String getInstrument() {
		return instrument;
	}

	public void setInstrument(String instrument) {
		this.instrument = instrument;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getBatch() {
		return batch;
	}

	public void setBatch(String batch) {
		this.batch = batch;
	}

	public String getUploadedBy() {
		return uploadedBy;
	}

	public void setUploadedBy(String uploadedBy) {
		this.uploadedBy = uploadedBy;
	}

	public Date getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(Date uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getSampleType() {
		return sampleType;
	}

	public void setSampleType(String sampleType) {
		this.sampleType = sampleType;
	}

	public String getVialPosition() {
		return vialPosition;
	}

	public void setVialPosition(String vialPosition) {
		this.vialPosition = vialPosition;
	}

	public int getInjectionVolume() {
		return injectionVolume;
	}

	public void setInjectionVolume(int injectionVolume) {
		this.injectionVolume = injectionVolume;
	}

	public Date getAcquisitionDate() {
		return acquisitionDate;
	}

	public void setAcquisitionDate(Date acquisitionDate) {
		this.acquisitionDate = acquisitionDate;
	}

	public String getCompoundName() {
		return compoundName;
	}

	public void setCompoundName(String compoundName) {
		this.compoundName = compoundName;
	}

	public String getTotalArea() {
		return totalArea;
	}

	public void setTotalArea(String totalArea) {
		this.totalArea = totalArea;
	}

	public String getRetentionTime() {
		return retentionTime;
	}

	public void setRetentionTime(String retentionTime) {
		this.retentionTime = retentionTime;
	}

	public String getCalculatedAmount() {
		return calculatedAmount;
	}

	public void setCalculatedAmount(String calculatedAmount) {
		this.calculatedAmount = calculatedAmount;
	}

	public String getUnits() {
		return units;
	}

	public void setUnits(String units) {
		this.units = units;
	}
}
