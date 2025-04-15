package com.example.demo.mapper;

import com.example.demo.dto.CreateItemRequest;
import com.example.demo.dto.ItemResponse;
import com.example.demo.model.Item;
import java.util.List;
import java.util.stream.Collectors;

public class ItemMapper {
    
    // Entity -> Response DTO 변환
    public static ItemResponse toResponse(Item entity) {
        if (entity == null) {
            return null;
        }
        
        return new ItemResponse(
            entity.getId(),
            entity.getName(),
            entity.getDescription()
        );
    }
    
    // Request DTO -> Entity 변환 (생성용)
    public static Item toEntity(CreateItemRequest dto) {
        if (dto == null) {
            return null;
        }
        
        Item entity = new Item();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        
        return entity;
    }
    
    // Request DTO와 ID -> Entity 변환 (수정용)
    public static Item toEntity(CreateItemRequest dto, Long id) {
        if (dto == null) {
            return null;
        }
        
        Item entity = new Item();
        entity.setId(id);
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        
        return entity;
    }
    
    // Entity 리스트 -> Response DTO 리스트 변환
    public static List<ItemResponse> toResponseList(List<Item> entities) {
        return entities.stream()
            .map(ItemMapper::toResponse)
            .collect(Collectors.toList());
    }
}