package com.bhs.sssss.services;

import com.bhs.sssss.entities.CategoryEntity;
import com.bhs.sssss.entities.SubCategoryEntity;
import com.bhs.sssss.mappers.CategoryMapper;
import com.bhs.sssss.mappers.SubCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PrivateKey;

@Service
public class ItemService {
    private final CategoryMapper categoryMapper;
    private final SubCategoryMapper subCategoryMapper;

    @Autowired
    public ItemService(CategoryMapper categoryMapper, SubCategoryMapper subCategoryMapper) {
        this.categoryMapper = categoryMapper;
        this.subCategoryMapper = subCategoryMapper;
    }

    public CategoryEntity[] getCategories() {
        return this.categoryMapper.selectCategories();
    }

    public SubCategoryEntity[] getSubCategoriesById(String categoryId) {
        String parentId = categoryId;
        return this.subCategoryMapper.selectSubCategoriesByParentId(parentId);
    }
}
