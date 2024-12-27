package com.bhs.sssss.services;

import com.bhs.sssss.entities.CategoryEntity;
import com.bhs.sssss.entities.ItemEntity;
import com.bhs.sssss.entities.SubCategoryEntity;
import com.bhs.sssss.mappers.CategoryMapper;
import com.bhs.sssss.mappers.ItemMapper;
import com.bhs.sssss.mappers.SubCategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PrivateKey;

@Service
public class ItemService {
    private final CategoryMapper categoryMapper;
    private final SubCategoryMapper subCategoryMapper;
    private final ItemMapper itemMapper;

    @Autowired
    public ItemService(CategoryMapper categoryMapper, SubCategoryMapper subCategoryMapper, ItemMapper itemMapper) {
        this.categoryMapper = categoryMapper;
        this.subCategoryMapper = subCategoryMapper;
        this.itemMapper = itemMapper;
    }

    public CategoryEntity[] getCategories() {
        return this.categoryMapper.selectCategories();
    }

    public SubCategoryEntity[] getSubCategoriesById(String categoryId) {
        String parentId = categoryId;
        return this.subCategoryMapper.selectSubCategoriesByParentId(parentId);
    }

    public ItemEntity[] getItems() {
        return this.itemMapper.selectItems();
    }
}
