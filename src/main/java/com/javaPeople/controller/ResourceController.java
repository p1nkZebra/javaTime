package com.javaPeople.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javaPeople.controller.dto.ResourceViewDto;
import com.javaPeople.domain.CircleResource;
import com.javaPeople.logic.service.ResourceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/java-people")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;


    @ResponseBody
    @GetMapping(value = "get-resource-table")
    public String getResourceTable() {
        log.info("Call get-resource-table. get-all-resources");

        List<CircleResource> resourceList = resourceService.findAllResources();

        try {
            ObjectMapper mapper = new ObjectMapper();
            CircleResource[] resourceArray = resourceList.toArray(new CircleResource[0]);

            String jsonString = mapper.writeValueAsString(resourceArray);
            log.info("URL \"get-resource-table\" return json: {}", jsonString);

            return jsonString;

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @ResponseBody
    @GetMapping(value = "get-resource-view")
    public String getEventViews() {
        log.info("Start get-resource-view.");

        List<ResourceViewDto> resourceViewDtos = resourceService.getAllResourceViewDtos();

        ResourceViewDto[] resourceViewDtosArray = resourceViewDtos.toArray(new ResourceViewDto[0]);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(resourceViewDtosArray);
            log.info("URL \"get-resource-view\" return json: {}", jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


    @ResponseBody
    @PostMapping(value = "save-new-resource")
    public String saveResource(@RequestBody String json) {
        log.info("Start save new resource from json: {}.", json);

        try {
            ObjectMapper mapper = new ObjectMapper();
            CircleResource resource = mapper.readValue(json, new TypeReference<CircleResource>() {

            });

            log.info("New Resource to save: {}", resource);
            resourceService.saveNewResource(resource);

            return "OK";

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @ResponseBody
    @PostMapping(value = "edit-resource")
    public String editResource(@RequestBody String json) {
        log.info("Start edit resource from json: {}.", json);

        try {
            ObjectMapper mapper = new ObjectMapper();
            CircleResource resource = mapper.readValue(json, new TypeReference<CircleResource>() {

            });

            log.info("edit Resource to save: {}", resource);
            resourceService.editResource(resource);

            return "OK";

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
