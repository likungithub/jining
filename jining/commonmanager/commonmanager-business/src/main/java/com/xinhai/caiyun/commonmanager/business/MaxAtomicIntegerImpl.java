package com.xinhai.caiyun.commonmanager.business;

import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.xinhai.caiyun.commonmanager.api.MaxAtomicInteger;
import com.xinhai.caiyun.commonmanager.dao.CommonManagerMapper;

import redis.clients.jedis.Jedis;

/**
 * @description:获取最大值实现类
 * @date: 2017年6月20日 上午9:24:54
 * @version: v1.0
 * @author lixp
 */
@Component
public class MaxAtomicIntegerImpl implements MaxAtomicInteger {

    /**
     * log
     */
    private Logger logger = LogManager.getLogger(MaxAtomicIntegerImpl.class
            .getName());

    /**
     * 静态变量存储最大值-合同号码
     */
    private static final AtomicInteger HTBM_MAX = new AtomicInteger();

    /**
     * 静态变量存储最大值-编码
     */
    private static final AtomicInteger DLJGBM_MAX = new AtomicInteger();

    /**
     * 静态变量存储最大值-代理记账公司税号(纳税人识别号)编码
     */
    private static final AtomicInteger NSRSBH_MAX = new AtomicInteger();

    /**
     * 静态变量存储最大值-员工编码（会计编码、职员编码）
     */
    private static final AtomicInteger YGBM_MAX = new AtomicInteger();

    /**
     * 静态变量存储最大值-客户编码（代理记账公司的客户）
     */
    private static final AtomicInteger KHBM_MAX = new AtomicInteger();

    /**
     * 收据编码
     */
    private static final AtomicInteger SJBM_MAX = new AtomicInteger();

    /**
     * 不满10位补足0
     */
    private static final String BUZU10WEI = "%010d";

    /**
     * 不满16位补足0
     */
    private static final String BUZU16WEI = "%016d";

    /**
     * 编码长度12位
     */
    private static final int CODE_LENGTH_12 = 12;

    /**
     * 编码长度18位
     */
    private static final int CODE_LENGTH_18 = 18;

    /**
     * 代理记账公司税号(纳税人识别号)编码：900000000000000001
     */
    private static final String NSRSBHBM = "YP";

    /**
     * 编码：DL0000000001
     */
    private static final String DLJGBM = "WT";

    /**
     * 员工编码（会计编码、职员编码）：KJ0000000001
     */
    private static final String YGBM = "KJ";

    /**
     * 客户编码（代理记账公司的客户）：KH0000000001
     */
    private static final String KHBM = "KH";

    /**
     * 合同编码：HT0000000001
     */
    private static final String HTBM = "HT";

    /**
     * 数据编码：0000000001
     */
    private static final String SJBM = "SJ";

    /** 初始化分组编号 */
    private static final int INIT_ZERO = 0;

    /**
     * Redis实现分布式锁
     */
    @Autowired
    private RedisLock redisLock;

    /**
     * Mapper接口，对应同名称的xml文件
     */
    @Autowired
    private CommonManagerMapper commonManagerMapper;

    /**
     * Jedis工具
     */
    // private Jedis redis;

    /**
     * @Description :初始化设置编号最大值
     * 
     */
    //@PostConstruct
    public void initMaxNum() {
        // 合同编码初始化
        initHtbm();
        // 代理记账公司税号(纳税人识别号)编码初始化
        initNsrsbhbm();
        // 编码初始化
        initDljgbm();
        // 员工编码（会计编码、职员编码）初始化
        initYgbm();
        // 客户编码（代理记账公司的客户）初始化
        initKhbm();
        // 收据编码初始化
        initSjbm();
    }

    /**
     * 客户编码（代理记账公司的客户）初始化
     */
    private void initKhbm() {
        Jedis redis = redisLock.getJedis();
        try {
            int maxKhNum = KHBM_MAX.get();
            int khbm = strToint(redis.get(KHBM));
            if (maxKhNum <= INIT_ZERO || khbm <= INIT_ZERO || maxKhNum != khbm) {
                // TODO 数据库获取最大值
                String maxbm = commonManagerMapper.getMaxKhbm();

                KHBM_MAX.set(strToint(maxbm));
                redis.set(KHBM, KHBM + String.format(BUZU10WEI, KHBM_MAX.get()));
                logger.debug("客户编码（代理记账公司的客户）编码初始化分组编号最大值为：" + redis.get(KHBM));
            }
        } catch (Exception e) {
            logger.error("客户编码（代理记账公司的客户）编码初始化获取分组编号最大值异常", e);
        } finally {
            redis.close();
        }

    }

    /**
     * 员工编码（会计编码、职员编码）初始化
     */
    private void initYgbm() {
        Jedis redis = redisLock.getJedis();
        try {
            int maxYgNum = YGBM_MAX.get();
            int ygbm = strToint(redis.get(YGBM));
            if (maxYgNum <= INIT_ZERO || ygbm <= INIT_ZERO || maxYgNum != ygbm) {
                // 数据库获取最大值
                String maxbm = commonManagerMapper.getMaxYgbm();

                YGBM_MAX.set(strToint(maxbm));
                redis.set(YGBM, YGBM + String.format(BUZU10WEI, YGBM_MAX.get()));
                logger.debug("员工编码（会计编码、职员编码）初始化分组编号最大值为：" + redis.get(YGBM));
            }

        } catch (Exception e) {
            logger.error("员工编码（会计编码、职员编码）编码初始化获取分组编号最大值异常", e);
        } finally {
            redis.close();
        }
    }

    /**
     * 编码初始化
     */
    private void initDljgbm() {
        Jedis redis = redisLock.getJedis();
        try {
            int maxDljgNum = DLJGBM_MAX.get();
            int dljgbm = strToint(redis.get(DLJGBM));
            if (maxDljgNum <= INIT_ZERO || dljgbm <= INIT_ZERO
                    || maxDljgNum != dljgbm) {
                // 数据库获取最大值
                String maxbm = commonManagerMapper.getMaxDljgbm();

                DLJGBM_MAX.set(strToint(maxbm));
                redis.set(DLJGBM,
                        DLJGBM + String.format(BUZU10WEI, DLJGBM_MAX.get()));
                logger.debug("编号最大值为：" + redis.get(DLJGBM));

            }
        } catch (Exception e) {
            logger.error("编号最大值异常", e);
        } finally {
            redis.close();
        }

    }

    /**
     * 代理记账公司税号(纳税人识别号)编码初始化
     */
    private void initNsrsbhbm() {
        Jedis redis = redisLock.getJedis();
        try {
            int maxNsrsbhNum = NSRSBH_MAX.get();
            int nsrsbhbm = strToint(redis.get(NSRSBHBM));
            if (maxNsrsbhNum <= INIT_ZERO || nsrsbhbm <= INIT_ZERO
                    || maxNsrsbhNum != nsrsbhbm) {
                // 数据库获取最大值
                String maxbm = commonManagerMapper.getMaxNsrsbh();
                NSRSBH_MAX.set(strToint(maxbm));
                redis.set(NSRSBHBM,
                        NSRSBHBM + String.format(BUZU16WEI, NSRSBH_MAX.get()));
                logger.debug("理记账公司税号(纳税人识别号)最大值为：" + redis.get(NSRSBHBM));
            }
        } catch (Exception e) {
            logger.error("理记账公司税号(纳税人识别号)异常", e);
        } finally {
            redis.close();
        }

    }

    /**
     * 合同号码初始化
     */
    private void initHtbm() {
        Jedis redis = redisLock.getJedis();
        try {
            int maxHtNum = HTBM_MAX.get();
            int htbm = strToint(redis.get(HTBM));
            if (maxHtNum <= INIT_ZERO || htbm <= INIT_ZERO || maxHtNum != htbm) {
                // 数据库获取最大值
                String maxbm = commonManagerMapper.getMaxHtbm();

                HTBM_MAX.set(strToint(maxbm));
                redis.set(HTBM, HTBM + String.format(BUZU10WEI, HTBM_MAX.get()));
                logger.debug("合同编码初始化分组编号最大值为：" + redis.get(HTBM));
            }
        } catch (Exception e) {
            logger.error("合同编码初始化获取分组编号最大值异常", e);
        } finally {
            redis.close();
        }

    }

    /**
     * 收据初始化
     */
    private void initSjbm() {
        Jedis redis = redisLock.getJedis();
        try {
            int maxSjNum = SJBM_MAX.get();
            String sj = redis.get(SJBM);
            int sjbm = INIT_ZERO;
            if (!StringUtils.isEmpty(sj)) {
                sjbm = Integer.parseInt(sj);
            }
            if (maxSjNum <= INIT_ZERO || sjbm <= INIT_ZERO || maxSjNum != sjbm) {
                // 数据库获取最大值
                String maxbm = commonManagerMapper.getMaxSjbm();

                if (!StringUtils.isEmpty(maxbm)) {
                    SJBM_MAX.set(Integer.parseInt(maxbm));
                }

                redis.set(SJBM, String.format(BUZU10WEI, SJBM_MAX.get()));
                logger.debug("收据编码初始化分组编号最大值为：" + redis.get(SJBM));
            }
        } catch (Exception e) {
            logger.error("收据编码初始化获取分组编号最大值异常", e);
        } finally {
            redis.close();
        }
    }

    /**
     * @Description 获取最大合同编码
     * @return 最大合同编码
     */
    public String getMaxHtbm() {
        // 设定锁KEY
        Jedis redis = redisLock.getJedis();
        String newStrNum = null;
        try {
            String aLock = redisLock.acquireLockWithTimeOut(redis, "aLockHtbm", 10000, 1);
            // 加锁 此方法适用于分布式锁
            if (null != aLock) {

            initHtbm();
            // 线程安全的原子操作，所以此方法无需同步
            int newNum = HTBM_MAX.incrementAndGet();
            // 数字长度为10位，长度不够数字前面补0
            newStrNum = HTBM + String.format(BUZU10WEI, newNum);

            // 存入缓存服务器
            redis.set(HTBM, newStrNum);
            // 解锁
            redisLock.releaseLock(redis, "aLockHtbm", aLock, 100);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            redis.close();
        }
        return newStrNum;
    }

    /**
     * @Description 获取最大员工编码（会计编码、职员编码）编码
     * @return 最大员工编码（会计编码、职员编码）编码
     */
    public String getMaxYgbm() {
        // 设定锁KEY
        Jedis redis = redisLock.getJedis();
        String newStrNum = null;
        try {
            String aLock = redisLock.acquireLockWithTimeOut(redis, "aLockYgbm", 10000, 1);
            // 加锁 此方法适用于分布式锁
            if (null != aLock) {
                initYgbm();
                // 线程安全的原子操作，所以此方法无需同步
                int newNum = YGBM_MAX.incrementAndGet();
                // 数字长度为10位，长度不够数字前面补0
                newStrNum = YGBM + String.format(BUZU10WEI, newNum);
                // 存入缓存服务器
                redis.set(YGBM, newStrNum);
                // 解锁
                redisLock.releaseLock(redis, "aLockYgbm", aLock, 100);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            redis.close();
        }
        return newStrNum;
    }

    /**
     * @Description 获取最大编码
     * @return 最大编码编码
     */
    public String getMaxWtbm() {
        // 设定锁KEY
        Jedis redis = redisLock.getJedis();
        String newStrNum = null;
        try {
            String aLock = redisLock.acquireLockWithTimeOut(redis, "aLockDljgbm", 10000,
                    1);
            // 加锁 此方法适用于分布式锁
            if (null != aLock) {
                initDljgbm();
                // 线程安全的原子操作，所以此方法无需同步
                int newNum = DLJGBM_MAX.incrementAndGet();
                // 数字长度为10位，长度不够数字前面补0
                newStrNum = DLJGBM + String.format(BUZU10WEI, newNum);
                // 存入缓存服务器
                redis.set(DLJGBM, newStrNum);
                // 解锁
                redisLock.releaseLock(redis, "aLockDljgbm", aLock, 100);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            redis.close();
        }
       
        return newStrNum;
    }

    /**
     * @Description 获取最大代理记账公司税号(纳税人识别号)
     * @return 最大代理记账公司税号(纳税人识别号)
     */
    @Override
    public String getMaxYpbm() {
        // 设定锁KEY
        // redisLock.getJedisLockKey(NSRSBHBM);
        Jedis redis = redisLock.getJedis();
        String newStrNum = null;
        try {

            String aLock = redisLock.acquireLockWithTimeOut(redis, "aLockNsrsbh", 10000,
                    1);
            // 加锁 此方法适用于分布式锁
            if (null != aLock) {
                initNsrsbhbm();
                // 线程安全的原子操作，所以此方法无需同步
                int newNum = NSRSBH_MAX.incrementAndGet();
                // 数字长度为10位，长度不够数字前面补0
                newStrNum = NSRSBHBM + String.format(BUZU16WEI, newNum);
                // 存入缓存服务器
                redis.set(NSRSBHBM, newStrNum);
                // 解锁
                redisLock.releaseLock(redis, "aLockNsrsbh", aLock, 100);
            }
        } catch (Exception e) {
            // // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            redis.close();
        }
        return newStrNum;
    }

    /**
     * @Description 获取最大客户编码（代理记账公司的客户）编码
     * @return 最大客户编码（代理记账公司的客户）编码
     */
    public String getMaxKhbm() {
        // 设定锁KEY
        Jedis redis = redisLock.getJedis();
        String newStrNum = null;
        try {

            String aLock = redisLock.acquireLockWithTimeOut(redis, "aLockKhbm", 10000, 1);
            // 加锁 此方法适用于分布式锁
            if (null != aLock) {
                initKhbm();
                // 线程安全的原子操作，所以此方法无需同步
                int newNum = KHBM_MAX.incrementAndGet();
                // 数字长度为10位，长度不够数字前面补0
                newStrNum = KHBM + String.format(BUZU10WEI, newNum);
                // 存入缓存服务器
                redis.set(KHBM, newStrNum);
                // 解锁
                redisLock.releaseLock(redis, "aLockKhbm", aLock, 100);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            redis.close();
        }
        return newStrNum;
    }

    /**
     * 收据编码最大值
     * 
     * @return 收据编码 最大值
     */
    public String getMaxSjbm() {
        Jedis redis = redisLock.getJedis();
        String newStrNum = null;
        try {

            String aLock = redisLock.acquireLockWithTimeOut(redis, "aLockSjbm", 10000, 1);
            if (null != aLock) {
                initSjbm();
                // 线程安全的原子操作，所以此方法无需同步
                int newNum = SJBM_MAX.incrementAndGet();
                // 数字长度为10位，长度不够数字前面补0
                newStrNum = String.format(BUZU10WEI, newNum);
                // 存入缓存服务器
                redis.set(SJBM, newStrNum);
                // 解锁
                redisLock.releaseLock(redis, "aLockSjbm", aLock, 100);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            redis.close();
        }
        return newStrNum;
    }

    @Override
    public String getMaxDljgbm() {
    	// TODO Auto-generated method stub
    	return null;
    }
    
    @Override
    public String getMaxNsrsbh() {
    	// TODO Auto-generated method stub
    	return null;
    }
    
    
    /**
     * 12位字符串转INT 如：KJ0000100001---->100001
     * 
     * @param str
     *            编码
     * @return 数字编码
     */
    private int strToint(String str) {

        if ("".equals(str)
                || str == null
                || (str.length() != CODE_LENGTH_12 && str.length() != CODE_LENGTH_18)) {
            return 0;
        }
        return Integer.parseInt(str.substring(2));
    }

   
}
