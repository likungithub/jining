package com.xinhai.caiyun.commonmanager;

/**
 * @description:常量类
 * @author lixp
 * @date: 2017年6月28日 下午14:50:53
 * @version: v1.0
 */
public final class SettingKEYS {
    

    /**
     * 极光推送 true生产环境  false开发环境
     */
    public static final boolean ISJPUSH = false;
    
    /**
     * 删除标志0未删除
     */
    public static final  String SHBZ_0 = "0";
    
    /**
     * 删除标志1已删除
     */
    public static final  String SHBZ_1 = "1";


    /**
     * 短信验证码键值
     */
    public static final  String SESSION_CODE_SMS = "SESSION_CODE_SMS";
    
    
    /**
     * 代理记账公司组织机构列表
     */
    public static final  String REDIS_ORGANIZATION = "REDIS_ORGANIZATION";
    
    
    /**
     * 省市区（下拉框连动或其它）
     */
    public static final  String REDIS_PROVINCESCITIES = "REDIS_PROVINCESCITIES";
    
    /**
     * 税种（下拉框连动或其它）
     */
    public static final  String REDIS_TAXCATEGORY = "REDIS_TAXCATEGORY";
    
    /**
     * 行业类型（下拉框连动或其它）
     */
    public static final  String REDIS_INDUSTRYTYPE = "REDIS_INDUSTRYTYPE";
    
    /**
     * 系统菜单
     */
    public static final  String REDIS_MENU = "REDIS_MENU";
    
    /**
     * 收费排名
     */
    public static final  String REDIS_TOLLRANKING = "REDIS_TOLLRANKING";
    
    /**
     * 新增客户
     */
    public static final  String REDIS_NEWCUSTOMERS = "REDIS_NEWCUSTOMERS";
    
    /**
     * 付款方式
     */
    public static final  String REDIS_PAYMENTMETHOD = "REDIS_PAYMENTMETHOD";
    
    /**
     * 收费项目
     */
    public static final  String REDIS_PAYSERVICE = "REDIS_PAYSERVICE";
    
    /**
     * 增值税性质
     */
    public static final  String REDIS_VALUEADDEDTAXTYPE = "REDIS_VALUEADDEDTAXTYPE";
    
    /**
     * 审核状态
     */
    public static final  String REDIS_AUDITSTATUS = "REDIS_AUDITSTATUS";
    
    /**
     * 用户状态
     */
    public static final  String REDIS_USERSTATUS = "REDIS_USERSTATUS";
    
    /**
     * 收费月份
     */
    public static final  String REDIS_CHARGINGMONTH = "REDIS_CHARGINGMONTH";
    
    /**
     * 收费状态
     */
    public static final  String REDIS_CHARGESTATUS = "REDIS_CHARGESTATUS";
    
    /**
     * 客户等级
     */
    public static final  String REDIS_CUSTOMERLEVEL = "REDIS_CUSTOMERLEVEL";
    
    /**
     * AES加密秘钥
     */
    public static final  String AES_SECRET_KEY = "Gx_Cys_key@2017!";
    
    //现金流量表行次 start
    /**
     * 销售商品、提供劳务收到的现金
     */
    public static final  int XJLLB_HC1 = 1;
    
    /**
     * 收到的税费返还
     */
    public static final  int XJLLB_HC3 = 3;
    
    /**
     * 收到的其他与经营活动有关的现金
     */
    public static final  int XJLLB_HC8 = 8;
    
    /**
     * 现金流入小计
     */
    public static final  int XJLLB_HC9 = 9;
    
    /**
     * 购买商品、接受劳务支付的现金
     */
    public static final  int XJLLB_HC10 = 10;
    
    /**
     * 支付给职工以及为职工支付的现金
     */
    public static final  int XJLLB_HC12 = 12;
    
    /**
     * 支付的各项税费
     */
    public static final  int XJLLB_HC13 = 13;
    
    /**
     * 支付的其他与经营活动有关的现金
     */
    public static final  int XJLLB_HC18 = 18;
    
    /**
     * 现金流出小计
     */
    public static final  int XJLLB_HC20 = 20;
    
    /**
     * 经营活动产生的现金流量净额
     */
    public static final  int XJLLB_HC21 = 21;
    
    /**
     * 收回投资所收到的现金
     */
    public static final  int XJLLB_HC22 = 22;

    /**
     * 取得投资收益所收到的现金
     */
    public static final  int XJLLB_HC23 = 23;
    
    /**
     * 处置固定资产、无形资产和其他长期资产所收回的现金净额
     */
    public static final  int XJLLB_HC25 = 25;
    
    /**
     * 收到的其他与投资活动有关的现金
     */
    public static final  int XJLLB_HC28 = 28;
    
    /**
     * 现金流入小计
     */
    public static final  int XJLLB_HC29 = 29;
    
    /**
     * 购建固定资产、无形资产和其他长期资产所支付的现金
     */
    public static final  int XJLLB_HC30 = 30;
    
    /**
     * 投资所支付的现金
     */
    public static final  int XJLLB_HC31 = 31;
    
    /**
     * 支付的其他与投资活动有关的现金
     */
    public static final  int XJLLB_HC35 = 35;
    
    /**
     * 现金流出小计
     */
    public static final  int XJLLB_HC36 = 36;
    
    /**
     * 投资活动产生的现金流量净额
     */
    public static final  int XJLLB_HC37 = 37;
    
    /**
     * 吸收投资所收到的现金
     */
    public static final  int XJLLB_HC38 = 38;
    
    /**
     * 借款所收到的现金
     */
    public static final  int XJLLB_HC40 = 40;
    
    /**
     * 收到的其他与筹资活动有关的现金
     */
    public static final  int XJLLB_HC43 = 43;
    
    /**
     *  现金流入小
     */
    public static final  int XJLLB_HC44 = 44;
    
    /**
     * 偿还债务所支付的现金 
     */
    public static final  int XJLLB_HC45 = 45;
    
    /**
     * 分配股利、利润或偿付利息所支付的现金
     */
    public static final  int XJLLB_HC46 = 46;
    
    /**
     * 支付的其他与筹资活动有关的现金
     */
    public static final  int XJLLB_HC52 = 52;
    
    /**
     * 现金流出小计
     */
    public static final  int XJLLB_HC53 = 53;
    
    
    /**
     * 筹资活动产生的现金流量净额
     */
    public static final  int XJLLB_HC54 = 54;
    
    
    /**
     * 汇率变动对现金的影响
     */
    public static final  int XJLLB_HC55 = 55;
    
    /**
     * 现金及现金等价物净增加额
     */
    public static final  int XJLLB_HC56 = 56;
    
    /**
     * 债务转为资本
     */
    public static final  int XJLLB_HC76 = 76;
    
    /**
     * 一年内到期的可转换公司债券
     */
    public static final  int XJLLB_HC77 = 77;
    
    /**
     * 融资租入固定资产
     */
    public static final  int XJLLB_HC78 = 78;
    
    /**
     * 现金的期末余额
     */
    public static final  int XJLLB_HC79 = 79;
    
    /**
     * 减：现金的期初余额
     */
    public static final  int XJLLB_HC80 = 80;
    
    /**
     * 加：现金等价物的期末余额
     */
    public static final  int XJLLB_HC81 = 81;
    
    /**
     * 减：现金等价物的期初余额
     */
    public static final  int XJLLB_HC82 = 82;
    
    /**
     * 现金及现金等价物净增加额
     */
    public static final  int XJLLB_HC83 = 83;
    
    // 现金流量表行次 end
    
    // 资产负债表行次 start
    
    /**
     * 货币资金
     */
    public static final  int ZCFZB_HC1 = 1;
    
    /**
     * 短期投资
     */
    public static final  int ZCFZB_HC2 = 2;
    
    /**
     * 应收票据
     */
    public static final  int ZCFZB_HC3 = 3;
    
    /**
     * 应收股利
     */
    public static final  int ZCFZB_HC4 = 4;
    
    /**
     * 应收利息
     */
    public static final  int ZCFZB_HC5 = 5;
    
    /**
     * 应收账款
     */
    public static final  int ZCFZB_HC6 = 6;
    
    /**
     * 减：坏账准备
     */
    public static final  int ZCFZB_HC7 = 7;
    
    /**
     * 应收账款净额
     */
    public static final  int ZCFZB_HC8 = 8;
    
    /**
     * 其他应收款
     */
    public static final  int ZCFZB_HC9 = 9;
    
    /**
     * 预付账款
     */
    public static final  int ZCFZB_HC10 = 10;
    
    /**
     * 应收补贴款
     */
    public static final  int ZCFZB_HC11 = 11;
    
    /**
     * 存货
     */
    public static final  int ZCFZB_HC12 = 12;
    
    /**
     * 待摊费用
     */
    public static final  int ZCFZB_HC13 = 13;
    
    /**
     * 一年内到期的长期债权投资
     */
    public static final  int ZCFZB_HC21 = 21;
    
    /**
     * 其他流动资产
     */
    public static final  int ZCFZB_HC24 = 24;
    
    
    /**
     * 流动资产合计
     */
    public static final  int ZCFZB_HC31 = 31;
    
    /**
     * 长期股权投资
     */
    public static final  int ZCFZB_HC32 = 32;
    
    /**
     * 长期债权投资
     */
    public static final  int ZCFZB_HC34 = 34;
    
    /**
     * 长期投资合计
     */
    public static final  int ZCFZB_HC38 = 38;
    
    /**
     * 固定资产原价
     */
    public static final  int ZCFZB_HC39 = 39;
    
    /**
     *  减：累计折旧
     */
    public static final  int ZCFZB_HC40 = 40;
    
    /**
     * 固定资产净值
     */
    public static final  int ZCFZB_HC41 = 41;
    
    /**
     * 减：固定资产减值准备
     */
    public static final  int ZCFZB_HC42 = 42;
    
    /**
     * 固定资产净额
     */
    public static final  int ZCFZB_HC43 = 43;
    
    /**
     * 工程物资
     */
    public static final  int ZCFZB_HC44 = 44;
    
    /**
     * 在建工程
     */
    public static final  int ZCFZB_HC45 = 45;
    
    /**
     * 固定资产清理
     */
    public static final  int ZCFZB_HC46 = 46;
    
    /**
     * 固定资产合计
     */
    public static final  int ZCFZB_HC50 = 50;
    
    /**
     *  无形资产
     */
    public static final  int ZCFZB_HC51 = 51;
    
    /**
     * 长期待摊费用
     */
    public static final  int ZCFZB_HC52 = 52;
    
    /**
     * 其他长期资产
     */
    public static final  int ZCFZB_HC53 = 53;
    
    /**
     * 无形及其他资产合计
     */
    public static final  int ZCFZB_HC60 = 60;
    
    /**
     * 递延税款借项
     */
    public static final  int ZCFZB_HC61 = 61;
    
    /**
     *  资产总计
     */
    public static final  int ZCFZB_HC67 = 67;
    
    /**
     * 长期借款
     */
    public static final  int ZCFZB_HC101 = 101;
    
    /**
     * 应付债券
     */
    public static final  int ZCFZB_HC102 = 102;
    
    /**
     * 长期应付款
     */
    public static final  int ZCFZB_HC103 = 103;
    
    /**
     * 专项应付款
     */
    public static final  int ZCFZB_HC106 = 106;
    
    /**
     * 其他长期负债
     */
    public static final  int ZCFZB_HC108 = 108;
    
    /**
     * 长期负债合计
     */
    public static final  int ZCFZB_HC110 = 110;
    
    /**
     * 递延税款贷项
     */
    public static final  int ZCFZB_HC111 = 111;
    
    /**
     * 负债合计
     */
    public static final  int ZCFZB_HC114 = 114;
    
    /**
     * 实收资本（股本）
     */
    public static final  int ZCFZB_HC115 = 115;
    
    /**
     * 减：已归还投资
     */
    public static final  int ZCFZB_HC116 = 116;
    
    /**
     * 实收资本（股本）净额
     */
    public static final  int ZCFZB_HC117 = 117;
    
    /**
     * 资本公积
     */
    public static final  int ZCFZB_HC118 = 118;
    
    /**
     * 盈余公积
     */
    public static final  int ZCFZB_HC119 = 119;
    
    /**
     * 其中：法定公益金
     */
    public static final  int ZCFZB_HC120 = 120;
    
    /**
     * 未分配利润
     */
    public static final  int ZCFZB_HC121 = 121;
    
    /**
     * 所有者权益合计
     */
    public static final  int ZCFZB_HC122 = 122;
    
    /**
     * 负债和所有者权益总计
     */
    public static final  int ZCFZB_HC135 = 135;
    
    // 资产负债表行次 end
    
    // 利润表start
    
    /**
     * 一、主营业务收入
     */
    public static final  int LRB_HC1 = 1;
    
    /**
     * 减：主营业务成本
     */
    public static final  int LRB_HC4 = 4;
    
    /**
     * 主营业务税金及附加
     */
    public static final  int LRB_HC5 = 5;
    
    /**
     * 二、主营业务利润（亏损以“-”填列）
     */
    public static final  int LRB_HC10 = 10;
    
    /**
     * 加：其他业务利润（亏损以“-”填列）
     */
    public static final  int LRB_HC11 = 11;
    
    /**
     *  减：营业费用
     */
    public static final  int LRB_HC14 = 14;
    
    /**
     * 管理费用
     */
    public static final  int LRB_HC15 = 15;
    
    /**
     *  财务费用
     */
    public static final  int LRB_HC16 = 16;
    
    /**
     * 三、营业利润（亏损以“-”填列）
     */
    public static final  int LRB_HC18 = 18;
    
    /**
     *  加：投资收益（损失以“-”填列）
     */
    public static final  int LRB_HC19 = 19;
    
    /**
     * 补贴收入
     */
    public static final  int LRB_HC22 = 22;
    
    /**
     * 营业外收入
     */
    public static final  int LRB_HC23 = 23;
    
    /**
     *  减：营业外支出
     */
    public static final  int LRB_HC25 = 25;
    
    /**
     * 四、利润总额（亏损总额以“-”填列）
     */
    public static final  int LRB_HC27 = 27;
    
    /**
     * 减：所得税
     */
    public static final  int LRB_HC28 = 28;
    
    /**
     * 五：净利润（净亏损以“-”填列）
     */
    public static final  int LRB_HC30 = 30;
    
    /**
     * 出售，处置部门或被投资单位所得收益
     */
    public static final  int LRB_HC31 = 31;
    
    /**
     * 自然灾害发生的损失
     */
    public static final  int LRB_HC32 = 32;
    
    /**
     * 会计政策变更增加（或减少）利润总额
     */
    public static final  int LRB_HC33 = 33;
    
    /**
     * 会计估计变更增加（或减少）利润总额
     */
    public static final  int LRB_HC34 = 34;
    
    /**
     * 债务重组损失
     */
    public static final  int LRB_HC35 = 35;
    
    /**
     * 其他
     */
    public static final  int LRB_HC36 = 36;
    
    // 利润表end
    public static final String TASK_FWTZ = "task-fwtz";
    
    public static final String TMP_TASK_FWTZ = "tmp-task-fwtz";
    
    public static final String TASK_XXTX = "task-xxtx";
    
    public static final String TMP_TASK_XXTX = "tmp-task-xxtx";
    
    public static final String TASK_JPUSH = "task-jpush";
    
    public static final String TMP_TASK_JPUSH = "tmp-task-jpush";
    
    public static final String INSTANTMESSAGEING = "instantMessageing";
    
    
    public static final String PGBDTX = "派工变动提醒";
    public static final String HTSHTX_LR = "合同录入提醒(提交审核)";
    
    
    public static final String HTSHTX_BH = "合同审核提醒(审核驳回)";
    
    public static final String HTSHTX_CX = "合同审核提醒(审核撤销)";
    
    public static final String SFLRTX = "收费录入提醒";
    
    public static final String SFSHTX_TJ = "收费审核提醒(提交收费审核)";
    
    public static final String SFSHTX_TY = "收费审核提醒(审核通过)";
    
    public static final String SFSHTX_BTY = "收费审核提醒(审核不通过)";
    
    public static final String PJTX = "客户评价";
    
    public static final String FFTX = "付费提醒(收费台账收费提醒)";
    

}
