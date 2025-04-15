package com.example.demo.config;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner initDatabase(ItemRepository itemRepository) {
        return args -> {
            // 데이터베이스가 비어있는 경우에만 샘플 데이터 추가
            if (itemRepository.count() == 0) {
                itemRepository.save(new Item("노트북", "고성능 개발용 노트북"));
                itemRepository.save(new Item("모니터", "32인치 4K 모니터"));
                itemRepository.save(new Item("키보드", "기계식 키보드"));
                itemRepository.save(new Item("마우스", "무선 마우스"));
                itemRepository.save(new Item("헤드폰", "노이즈 캔슬링 헤드폰"));
                itemRepository.save(new Item("의자", "인체공학적 사무용 의자"));
                System.out.println("샘플 데이터가 성공적으로 로드되었습니다.");
            }
        };
    }
}