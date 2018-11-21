package com.javaPeople.controller.dto.converter;

import com.javaPeople.controller.dto.ResourceViewDto;
import com.javaPeople.domain.CircleResource;
import com.javaPeople.repository.ContributionRepository;
import com.javaPeople.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

@Service
public class ResourceDtoConverter {

    @Autowired
    private ContributionRepository contributionRepository;
    @Autowired
    private EventRepository eventRepository;


    @NotNull
    public ResourceViewDto convertResourceToResourceViewDto(@NotNull CircleResource resource) {

        int eventCount = contributionRepository.findEventCountByResourceId(resource.getId());
        int contributionCount = contributionRepository.findContributionCountByResource(resource);

        return ResourceViewDto.builder()
                .id(resource.getId())
                .name(resource.getName())
                .comment(resource.getComment())
                .contributionCount(contributionCount)
                .eventCount(eventCount)
                .build();
    }
}
