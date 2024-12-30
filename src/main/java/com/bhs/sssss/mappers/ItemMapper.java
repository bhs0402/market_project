package com.bhs.sssss.mappers;

import com.bhs.sssss.entities.ItemEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ItemMapper {

    ItemEntity[] selectItems();

    ItemEntity[] selectItemsByLimit(@Param("limitCount") int limitCount,
                             @Param("offsetCount") int offsetCount);

    int selectItemCount();
}
