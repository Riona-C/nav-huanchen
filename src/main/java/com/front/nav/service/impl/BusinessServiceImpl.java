package com.front.nav.service.impl;


import com.front.nav.domain.business.Nv_Business_tree;
import com.front.nav.repository.BusinessTreeRepository;
import com.front.nav.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessServiceImpl implements BusinessService {
    @Autowired
    private BusinessTreeRepository businessTreeRepository;

    @Override
    public List<Nv_Business_tree> getBusTreeDom(){
        return businessTreeRepository.findAll();
    }

    //    保存新添加的节点
    @Override
    public void saveDom(Nv_Business_tree nvBusinessTree){
        businessTreeRepository.save(nvBusinessTree);
    }


//更新节点
    @Override
    public Nv_Business_tree editDom(Integer id){
        return businessTreeRepository.findById(id).get();

    }

// 删除节点
    @Override
    public void delDom(Integer id){
        businessTreeRepository.deleteById(id);
    }


}
