package com.javaPeople.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    @PostMapping(value = "save-new-contribution")
    public String saveContribution(@RequestBody String json) {
        log.info("Start save new Contribution from json: {}.", json);

        try {
            ObjectMapper mapper = new ObjectMapper();
            Contribution contribution = mapper.readValue(json, new TypeReference<Contribution>() {

            });

            log.info("New Contribution to save: {}", contribution);
            contributionService.saveOrEditContribution(contribution);

            return "OK";

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    @ResponseBody
    @PostMapping(value = "edit-contribution")
    public String editContribution(@RequestBody String json) {
        log.info("Start edit Contribution from json: {}.", json);

        try {
            ObjectMapper mapper = new ObjectMapper();
            Contribution contribution = mapper.readValue(json, new TypeReference<Contribution>() {

            });

            log.info("edit Contribution to save: {}", contribution);
            contributionService.saveOrEditContribution(contribution);

            return "OK";

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


}
