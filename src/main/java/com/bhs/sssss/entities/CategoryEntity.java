package com.bhs.sssss.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"categoryId"})
public class CategoryEntity {
    String categoryId;
    String categoryName;
    String categoryImg;
}
