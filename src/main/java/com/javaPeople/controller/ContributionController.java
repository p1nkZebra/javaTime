package com.javaPeople.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javaPeople.controller.dto.ContributionViewDto;
import com.javaPeople.domain.Contribution;
import com.javaPeople.logic.service.ContributionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/java-people")
public class ContributionController {

    @Autowired
    private ContributionService contributionService;

    @ResponseBody
    @GetMapping(value = "get-contribution-table")
    public String getContributionTable() {
        log.info("Call get-contribution-table. get-all-contributions");

        List<Contribution> contributionList = contributionService.findAllContributions();

        try {
            ObjectMapper mapper = new ObjectMapper();
            Contribution[] contributionArray = contributionList.toArray(new Contribution[0]);

            String jsonString = mapper.writeValueAsString(contributionArray);
            log.info("URL \"get-contribution-table\" return json: {}", jsonString);

            return jsonString;

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @ResponseBody
    @GetMapping(value = "get-contribution-view")
    public String getEventViews() {
        log.info("Start get-contribution-view.");

        List<ContributionViewDto> contributionViewDtos = contributionService.getAllContributionViewDtos();

        ContributionViewDto[] eventViewDtosArray = contributionViewDtos.toArray(new ContributionViewDto[0]);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(eventViewDtosArray);
            log.info("URL \"get-contribution-view\" return json: {}", jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


    @ResponseBody
    @PostMapping(value = "save-contribution")
    public String saveContribution(@RequestBody String json) {
        log.info("Start save or edit Contribution from json: {}.", json);

        try {
            ObjectMapper mapper = new ObjectMapper();
            Contribution contribution = mapper.readValue(json, new TypeReference<Contribution>() {});

            contributionService.saveOrEditContribution(contribution);

            return "OK";

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


}
