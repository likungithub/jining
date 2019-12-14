package com.xinhai.caiyun.customermanage.business;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.Contacts;
import com.xinhai.caiyun.customermanage.api.ContactsService;

/**
 * 通讯录实现类
 * @author pusilin
 *
 */
@Repository
public class ContactsImpl implements ContactsService {

	@Override
	public List<Contacts> findContacts(String dljg_bm, String id) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
