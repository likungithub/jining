package com.xinhai.customer.business;

import com.xinhai.customer.api.CustomerService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by zhangjunlong on 2016/4/13.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        locations = {"classpath*:sys-root.xml"}
)
public class CustomerServiceImplTest {

    @Autowired
    private CustomerService customerService;

    @Test
    public void getCustomer() throws Exception {
        System.out.println("123");
    }
}