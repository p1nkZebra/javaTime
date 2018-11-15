package com.javaPeople.logic.service;

import com.javaPeople.domain.Contribution;
import com.javaPeople.repository.ContributionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;

@Service
public class ContributionService {
    @Autowired
    private ContributionRepository contributionRepository;

    public List<Contribution> findAllContributions() {
        return contributionRepository.findAll();
    }

    public void saveNewContribution(@NotNull Contribution contribution) {
        contributionRepository.save(contribution);
    }

    public void editContribution(@NotNull Contribution contribution) {contributionRepository.save(contribution);}
}
