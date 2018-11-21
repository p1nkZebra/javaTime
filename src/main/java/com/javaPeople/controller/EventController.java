package com.javaPeople.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javaPeople.controller.dto.EventViewDto;
import com.javaPeople.controller.dto.RawEventDto;
import com.javaPeople.logic.service.EventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/java-people")
public class EventController {

    @Autowired
    private EventService eventService;


    @ResponseBody
    @GetMapping(value = "get-events")
    public String getEventsByContribution(@RequestParam(value = "contribution", required = true) Long id) {
        log.info("Start get events.");

        List<RawEventDto> records = eventService.findEventsByContributionId(id);

        try {
            ObjectMapper mapper = new ObjectMapper();

            RawEventDto[] resourceArray = records.toArray(new RawEventDto[0]);

            String jsonString = mapper.writeValueAsString(resourceArray);
            log.info("URL \"get-events\" return json: {}", jsonString);

            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();

            throw new RuntimeException(e);
        }
    }

    @ResponseBody
    @GetMapping(value = "get-event-view")
    public String getEventViews() {
        log.info("Start get-event-view.");

        List<EventViewDto> eventViewDtos = eventService.getAllEventViewDtos();

        EventViewDto[] eventViewDtosArray = eventViewDtos.toArray(new EventViewDto[0]);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(eventViewDtosArray);
            log.info("URL \"get-event-view\" return json: {}", jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


    @ResponseBody
    @GetMapping(value = "get-all-events")
    public String getAllEvents() {
        log.info("Start get all events.");

        List<RawEventDto> records = eventService.getAllRawEventDto();

        try {
            ObjectMapper mapper = new ObjectMapper();

            RawEventDto[] resourceArray = records.toArray(new RawEventDto[0]);

            String jsonString = mapper.writeValueAsString(resourceArray);
            log.info("URL \"get-all-events\" return json: {}", jsonString);

            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();

            throw new RuntimeException(e);
        }
    }

    @ResponseBody
    @PostMapping(value = "delete-events")
    public String deleteEvents(@RequestBody String json) {
        log.info("Start delete events from json: {}.", json);

        try {
            ObjectMapper mapper = new ObjectMapper();
            List<RawEventDto> eventDtoList = mapper.readValue(json, new TypeReference<List<RawEventDto>>() {
            });

            log.info("Events to delete:");
            for (RawEventDto eventDto : eventDtoList) {
                log.info("RawEventDto: {}", eventDto.toString());
            }

            eventService.deleteEvents(eventDtoList);


            return "OK";

        } catch (IOException e) {
            e.printStackTrace();

            throw new RuntimeException(e);
        }
    }

}
