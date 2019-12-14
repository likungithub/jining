package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.MailList;
import com.xinhai.caiyun.customermanage.api.MailListService;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: admin
 * Date: 2017-12-21
 * Time: 18:16
 */
@Repository
public class MailListServiceImpl implements MailListService{

	@Override
	public List<MailList> getAllMailList(String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MailList getMailListById(String id, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<MailList> getMailListByKeyWord(String lxrhdw, String dljgbm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addMailList(MailList mailList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void editMailList(String id, MailList mailList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delMailList(String id, MailList mailList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delMailLists(List<String> list, MailList mailList) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<String> getAllMailSjhmList(String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> getAllMailNameList(String dl) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<MailList> getAllMailListByfy(String dljgbm, int startA,
			int lengthA, String searchText) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public long getAllMailListByfyLen(String dljgbm, String searchText) {
		// TODO Auto-generated method stub
		return 0;
	}

   
}
