package com.bhs.sssss.mappers;

import com.bhs.sssss.entities.MemberEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
    MemberEntity selectUserByContact(@Param("contact") String contact);

    MemberEntity selectUserById(@Param("id") String id);

    MemberEntity selectUserByEmail(@Param("email") String email);

    int insertMember(MemberEntity member);

    int updateMember(MemberEntity member);


}
