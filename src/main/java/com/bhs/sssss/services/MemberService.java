package com.bhs.sssss.services;

import com.bhs.sssss.entities.MemberEntity;
import com.bhs.sssss.exceptions.TransactionalException;
import com.bhs.sssss.mappers.MemberMapper;
import com.bhs.sssss.results.CommonResult;
import com.bhs.sssss.results.Result;
import com.bhs.sssss.results.member.LoginResult;
import com.bhs.sssss.results.member.SignupResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class MemberService {
    private final MemberMapper memberMapper;

    @Autowired
    public MemberService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }


    public Result duplicationCheck(String contact, String memberId, String email) {
        if (this.memberMapper.selectUserByContact(contact) != null) {
            return SignupResult.FAILURE_DUPLICATE_CONTACT;
        }

        if (this.memberMapper.selectUserById(memberId) != null) {
            return SignupResult.FAILURE_DUPLICATE_ID;
        }

        if (this.memberMapper.selectUserByEmail(email) != null) {
            return SignupResult.FAILURE_DUPLICATE_EMAIL;
        }

        return CommonResult.SUCCESS;
    }


    public Result login(MemberEntity member) {
        if(member == null ||
           member.getId() == null || member.getId().length() < 6 || member.getId().length() > 16 ||
           member.getPassword() == null || member.getPassword().length() < 6 || member.getPassword().length() > 16 ) {
            return CommonResult.FAILURE;
        }
        MemberEntity dbMember = memberMapper.selectUserById(member.getId());
        if(dbMember == null || dbMember.getDeletedAt() != null) {
            return CommonResult.FAILURE;
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if(!encoder.matches(member.getPassword(), dbMember.getPassword())) {
            return CommonResult.FAILURE;
        }
        if(!dbMember.isVerified()){
            return LoginResult.FAILURE_NOT_VERIFIED;
        }
        if(dbMember.isSuspended()){
            return LoginResult.FAILURE_SUSPENDED;
        }
        member.setPassword(dbMember.getPassword());
        member.setUserName(dbMember.getUserName());
        member.setEmail(dbMember.getEmail());
        member.setContact(dbMember.getContact());
        member.setAddress(dbMember.getAddress());
        member.setGender(dbMember.getGender());
        member.setBirth(dbMember.getBirth());
        member.setCreatedAt(dbMember.getCreatedAt());
        member.setUpdatedAt(dbMember.getUpdatedAt());
        member.setDeletedAt(dbMember.getDeletedAt());
        member.setAdmin(dbMember.isAdmin());
        member.setSuspended(dbMember.isSuspended());
        member.setVerified(dbMember.isVerified());

        return CommonResult.SUCCESS;
    }

    @Transactional
    public Result signup(MemberEntity member) {
        if (member == null ||
            member.getId() == null || member.getId().length() < 6 || member.getId().length() > 16 ||
            member.getEmail() == null || member.getEmail().length() < 8  || member.getEmail().length() > 50 ||
            member.getPassword() == null || member.getPassword().length() < 6 || member.getPassword().length() > 16 ||
            member.getContact() == null || member.getContact().length() < 10 || member.getContact().length() > 12) {
            return CommonResult.FAILURE;
        }
        if (this.memberMapper.selectUserByContact(member.getContact()) != null) {
            return SignupResult.FAILURE_DUPLICATE_CONTACT;
        }

        if (this.memberMapper.selectUserById(member.getId()) != null) {
            return SignupResult.FAILURE_DUPLICATE_ID;
        }

        if (this.memberMapper.selectUserByEmail(member.getEmail()) != null) {
            return SignupResult.FAILURE_DUPLICATE_EMAIL;
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        member.setPassword(encoder.encode(member.getPassword()));
        member.setCreatedAt(LocalDateTime.now());
        member.setUpdatedAt(LocalDateTime.now());
        member.setDeletedAt(null);
        member.setAdmin(false);
        member.setSuspended(false);
        member.setVerified(false);
        if(this.memberMapper.insertMember(member) == 0) {
            throw new TransactionalException();
        }

        return CommonResult.SUCCESS;
    }


}
