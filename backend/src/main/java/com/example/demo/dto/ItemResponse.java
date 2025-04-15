package com.example.demo.dto;

public class ItemResponse {
    
    private Long id;
    private String name;
    private String description;
    
    // 기본 생성자
    public ItemResponse() {}
    
    // 모든 필드를 포함한 생성자
    public ItemResponse(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
    
    // Getter와 Setter 메소드
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
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