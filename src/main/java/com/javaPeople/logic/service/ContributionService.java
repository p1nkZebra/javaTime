package com.javaPeople.logic.service;

import com.javaPeople.controller.dto.ContributionViewDto;
import com.javaPeople.controller.dto.converter.ContributionDtoConverter;
import com.javaPeople.domain.CircleResource;
import com.javaPeople.domain.Contribution;
import com.javaPeople.repository.CircleResourceRepository;
import com.javaPeople.repository.ContributionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContributionService {
    @Autowired
    private ContributionRepository contributionRepository;
    @Autowired
    private CircleResourceRepository circleResourceRepository;
    @Autowired
    private ContributionDtoConverter converter;



    public List<Contribution> findAllContributions() {
        return contributionRepository.findAll();
    }

    public void saveOrEditContribution(@NotNull Contribution contribution) {
        Long resourceId = contribution.getResourceId();
        Optional<CircleResource> resourceOptional = circleResourceRepository.findById(resourceId);
        if (resourceOptional.isPresent()) {
            CircleResource resource = resourceOptional.get();
            contribution.setResource(resource);
            contributionRepository.save(contribution);
        } else {
            throw new RuntimeException("CircleResource not fount. resourceId: " + resourceId);
        }
    }

    @NotNull
    public List<ContributionViewDto> getAllContributionViewDtos() {
        List<ContributionViewDto> resultList = new ArrayList<>();

        List<Contribution> contributions = contributionRepository.findAll();
        for ( Contribution contribution : contributions ) {
            resultList.add(converter.convertContributionToContributionViewDto(contribution));
        }

        return resultList;
    }
}
