package com.javaPeople.controller;


import com.javaPeople.controller.dto.ContributionViewDto;
import com.javaPeople.domain.Contribution;
import com.javaPeople.logic.service.ContributionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/java-people")
public class ContributionController {

    @Autowired
    private ContributionService contributionService;



    @ResponseBody
    @GetMapping(value = "get-contribution-table")
    public ResponseEntity<List<Contribution>> getContributionTable() {
        log.info("Call get-contribution-table. get-all-contributions");

        List<Contribution> contributionList = contributionService.findAllContributions();

        return ResponseEntity.ok(contributionList);
    }


    @ResponseBody
    @GetMapping(value = "get-contribution-view")
    public ResponseEntity<List<ContributionViewDto>> getEventViews() {
        log.info("Start get-contribution-view.");

        List<ContributionViewDto> contributionViewDtos = contributionService.getAllContributionViewDtos();

        return ResponseEntity.ok(contributionViewDtos);
    }


    @ResponseBody
    @PostMapping(value = "save-contribution")
    public ResponseEntity<String> saveContribution(@RequestBody Contribution contribution) {
        log.info("Start save or edit Contribution from json: {}.", contribution);

        contributionService.saveOrEditContribution(contribution);

        return ResponseEntity.ok("OK");
    }


}
