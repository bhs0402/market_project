package com.bhs.sssss.mappers;

import com.bhs.sssss.entities.ItemEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ItemMapper {

    ItemEntity[] selectItems();
}
