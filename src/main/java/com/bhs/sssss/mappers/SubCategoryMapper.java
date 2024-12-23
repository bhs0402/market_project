package com.bhs.sssss.mappers;

import com.bhs.sssss.entities.SubCategoryEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SubCategoryMapper {

    SubCategoryEntity[] selectSubCategories();
}
