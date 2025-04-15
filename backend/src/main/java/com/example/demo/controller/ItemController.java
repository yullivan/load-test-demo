package com.example.demo.controller;

import com.example.demo.dto.CreateItemRequest;
import com.example.demo.dto.ItemResponse;
import com.example.demo.mapper.ItemMapper;
import com.example.demo.model.Item;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<ItemResponse>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        List<ItemResponse> itemResponses = ItemMapper.toResponseList(items);
        return new ResponseEntity<>(itemResponses, HttpStatus.OK);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable Long id) {
        Item item = itemService.getItemById(id);
        ItemResponse itemResponse = ItemMapper.toResponse(item);
        return new ResponseEntity<>(itemResponse, HttpStatus.OK);
    }

    @PostMapping("/items")
    public ResponseEntity<ItemResponse> createItem(@RequestBody CreateItemRequest createItemRequest) {
        Item item = ItemMapper.toEntity(createItemRequest);
        Item savedItem = itemService.saveItem(item);
        ItemResponse savedItemResponse = ItemMapper.toResponse(savedItem);
        return new ResponseEntity<>(savedItemResponse, HttpStatus.CREATED);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<ItemResponse> updateItem(@PathVariable Long id, @RequestBody CreateItemRequest createItemRequest) {
        Item item = ItemMapper.toEntity(createItemRequest, id);
        Item updatedItem = itemService.saveItem(item);
        ItemResponse updatedItemResponse = ItemMapper.toResponse(updatedItem);
        return new ResponseEntity<>(updatedItemResponse, HttpStatus.OK);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}