package com.front.nav.service;

import com.front.nav.domain.business.Nv_Business_tree;

import java.util.List;

public interface BusinessService {

    //    查询业务的树节点
    public List<Nv_Business_tree> getBusTreeDom();

    //    像树添加节点执行保存
    public void saveDom(Nv_Business_tree nvBusinessTree);

//   更新节点数据
    public Nv_Business_tree editDom(Integer id);

// 删除节点
    public void delDom(Integer id);

}
