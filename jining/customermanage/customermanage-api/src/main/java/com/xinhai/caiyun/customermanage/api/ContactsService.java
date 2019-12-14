package com.xinhai.caiyun.customermanage.api;

import java.util.List;

import org.springframework.stereotype.Service;
/**
 * 员工通讯录接口
 * @author pusilin
 *
 */
@Service
public interface ContactsService {
	 /**
	  * 根据dljg_bm查询员工通讯
	  * @param dljg_bm
	  * @return
	  */
	 List<Contacts> findContacts(String dljg_bm,String id);

}
