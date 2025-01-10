package com.bhs.sssss.services;

import com.bhs.sssss.entities.CartEntity;
import com.bhs.sssss.entities.MemberEntity;
import com.bhs.sssss.entities.PayLoadEntity;
import com.bhs.sssss.mappers.PayMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PayService {
    private final PayMapper payMapper;

    @Autowired
    public PayService(PayMapper payMapper) {
        this.payMapper = payMapper;
    }


    public List<CartEntity> getAllPay(MemberEntity member) {
        return this.payMapper.selectAllCarts(member.getId());
    }


    // 전달받은 값을 db에 저장, 하기 전에 검사 진행
    public boolean processPayment(List<PayLoadEntity> payload, int totalPrice, MemberEntity member) {
        int totalPriceSum = 0;

        for (PayLoadEntity item : payload) {
            CartEntity cartItem = this.payMapper.selectCartById(item.getPayItemId());
            if (cartItem == null || member == null ||
                    !cartItem.getItemName().equals(item.getPayItemName()) ||
                    cartItem.getItemPrice() * cartItem.getQuantity() != Integer.parseInt(item.getPayItemPrice()) ||
                    cartItem.getQuantity() != Integer.parseInt(item.getPayQuantity())) {
                return false;
            }
            totalPriceSum += cartItem.getItemPrice() * cartItem.getQuantity();


            List<Integer> cartIndexes = this.payMapper.getPayIndexByCartIndex(item.getPayItemId());
            if (cartIndexes == null || cartIndexes.isEmpty()) {
                throw new IllegalStateException("해당 cartIndex에 연결된 payIndex가 없습니다: " + item.getPayItemId());
            }


            for (Integer cartIndex : cartIndexes) {
                item.setCartIndex(cartIndex);
            }
        }

        if (totalPriceSum == totalPrice) {
            for (PayLoadEntity item : payload) {
                CartEntity cartItem = this.payMapper.selectCartById(item.getPayItemId());
                item.setTotalPrice(totalPrice);

                item.setMemberId(member.getId());
                item.setPurchaseDay(LocalDateTime.now());

                if (this.payMapper.insertItemLoad(item) > 0) {
                    this.payMapper.deleteCartItem(cartItem.getCartId(), cartItem.getItemId());
                }
            }
            return true;
        }
        return false;
    }

    // Comparator : getPurchaseDay(날짜) 기준으로 정렬
    // Collectors : 받은 결제 내역을 리스트(List)나 맵(Map) 형태로 묶기 위해// Comparator :
    public List<PayLoadEntity> getAllPayByCartId(MemberEntity member) {
        List<PayLoadEntity> payLoadList = this.payMapper.selectAllPayLoads(member.getId());
        return payLoadList.stream()
                .sorted(Comparator.comparing(PayLoadEntity::getPurchaseDay))
                .collect(Collectors.toList());
    }


}
