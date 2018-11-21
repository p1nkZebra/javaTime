package com.javaPeople.controller.dto.converter;

import com.javaPeople.controller.dto.ContributionViewDto;
import com.javaPeople.domain.CircleResource;
import com.javaPeople.domain.Contribution;
import com.javaPeople.repository.CircleResourceRepository;
import com.javaPeople.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;

@Service
public class ContributionDtoConverter {

    @Autowired
    private CircleResourceRepository resourceRepository;
    @Autowired
    private EventRepository eventRepository;



    @NotNull
    public ContributionViewDto convertContributionToContributionViewDto(@NotNull Contribution contribution) {

        CircleResource resource = resourceRepository.findById(contribution.getResourceId())
                .orElseThrow(() -> new RuntimeException("Error. Contribution not found."));

        int eventCount = eventRepository.findEventCountByContribution(contribution);

        return ContributionViewDto.builder()
                .id(contribution.getId())
                .resourceId(resource.getId())
                .resourceName(resource.getName())
                .name(contribution.getName())
                .factor(contribution.getFactor())
                .eventCount(eventCount)
                .build();
    }
}
