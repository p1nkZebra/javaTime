package com.javaPeople.logic.service;

import com.javaPeople.domain.CircleResource;
import com.javaPeople.domain.Contribution;
import com.javaPeople.repository.CircleResourceRepository;
import com.javaPeople.repository.ContributionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Service
public class ContributionService {
    @Autowired
    private ContributionRepository contributionRepository;
    @Autowired
    private CircleResourceRepository circleResourceRepository;

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
}
