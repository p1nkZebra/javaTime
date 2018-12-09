package com.javaPeople.controller;

import com.javaPeople.controller.dto.ResourceViewDto;
import com.javaPeople.domain.CircleResource;
import com.javaPeople.logic.service.ResourceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/java-people")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;



    @ResponseBody
    @GetMapping(value = "get-resource-table")
    public ResponseEntity<List<CircleResource>> getResourceTable() {
        log.info("Call get-resource-table. get-all-resources");

        List<CircleResource> resourceList = resourceService.findAllResources();

        return ResponseEntity.ok(resourceList);
    }


    @ResponseBody
    @GetMapping(value = "get-resource-view")
    public ResponseEntity<List<ResourceViewDto>> getEventViews() {
        log.info("Start get-resource-view.");

        List<ResourceViewDto> resourceViewDtos = resourceService.getAllResourceViewDtos();

        return ResponseEntity.ok(resourceViewDtos);
    }


    @ResponseBody
    @PostMapping(value = "save-new-resource")
    public ResponseEntity<String> saveResource(@RequestBody CircleResource resource) {
        log.info("Start save new resource from json: {}.", resource);

        resourceService.saveNewResource(resource);

        return ResponseEntity.ok("Status OK");

    }


    @ResponseBody
    @PostMapping(value = "edit-resource")
    public ResponseEntity<String> editResource(@RequestBody CircleResource resource) {
        log.info("Start edit resource from json: {}.", resource);

        resourceService.editResource(resource);

        return ResponseEntity.ok("OK");
    }
}
