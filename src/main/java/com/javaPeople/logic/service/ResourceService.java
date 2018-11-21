package com.javaPeople.logic.service;

import com.javaPeople.controller.dto.CircleResourceDto;
import com.javaPeople.controller.dto.ResourceViewDto;
import com.javaPeople.controller.dto.converter.ResourceDtoConverter;
import com.javaPeople.domain.CircleResource;
import com.javaPeople.repository.CircleResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResourceService {

    @Autowired
    private CircleResourceRepository resourceRepository;
    @Autowired
    private ResourceDtoConverter converter;


    public List<CircleResource> findAllResources() {
        return resourceRepository.findAll();
    }


    public void saveNewResource(@NotNull CircleResource resource) {
        resourceRepository.save(resource);
    }

    public void editResource(@NotNull CircleResource resource) {resourceRepository.save(resource);}

    public List<CircleResourceDto> countContributionsByResource(){

        List<CircleResourceDto> resultDto = new ArrayList<>();
        List<CircleResource> allResources = resourceRepository.findAll();
        for (CircleResource resource : allResources) {
            Long count = resourceRepository.countContributionsByResource(resource.getId());
            resultDto.add(CircleResourceDto.builder()
                    .name(resource.getName())
                    .value(count)
                    .build());

        }
        return resultDto;
    }

    public List<ResourceViewDto> getAllResourceViewDtos() {
        List<ResourceViewDto> resultList = new ArrayList<>();

        List<CircleResource> resourceList = resourceRepository.findAll();
        for ( CircleResource resource : resourceList ) {
            resultList.add(converter.convertResourceToResourceViewDto(resource));
        }

        return resultList;

    }
}
