package com.bhs.sssss.services;

import com.bhs.sssss.entities.CartEntity;
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


    public List<CartEntity> getAllPay() {
        return this.payMapper.selectAllCarts();
    }


    // 전달받은 값을 db에 저장, 하기 전에 검사 진행
    public boolean processPayment(List<PayLoadEntity> payload, int totalPrice) {
        int totalPriceSum = 0;

        for (PayLoadEntity item : payload) {
            CartEntity cartItem = this.payMapper.selectCartById(item.getPayItemId());
            if (cartItem == null ||
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
                item.setTotalPrice(totalPrice);

                // 테스트를 위한
                String testMemberId = "'test122'";
                item.setMemberId(testMemberId);


                item.setPurchaseDay(LocalDateTime.now());


                this.payMapper.insertItemLoad(item);
            }


            return true;
        }
        return false;
    }


    // Comparator :
    public List<PayLoadEntity> getAllPayByCartId() {
        return this.payMapper.selectAllPayLoads().stream()
                .sorted(Comparator.comparing(PayLoadEntity::getPurchaseDay))
                .collect(Collectors.toList());
    }


}
