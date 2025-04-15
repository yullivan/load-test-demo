package com.example.demo.repository;

import com.example.demo.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // 기본 CRUD 기능은 JpaRepository에서 제공됨
    // 필요한 경우 여기에 사용자 지정 쿼리 메소드를 추가할 수 있음
}