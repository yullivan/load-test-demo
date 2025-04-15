package com.example.demo.dto;

public class CreateItemRequest {
    
    private String name;
    private String description;
    
    // 기본 생성자
    public CreateItemRequest() {}
    
    // 모든 필드를 포함한 생성자
    public CreateItemRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }
    
    // Getter와 Setter 메소드
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
}