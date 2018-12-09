package com.javaPeople.controller;

import com.javaPeople.controller.dto.EventViewDto;
import com.javaPeople.controller.dto.RawEventDto;
import com.javaPeople.domain.Event;
import com.javaPeople.logic.service.EventService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/java-people")
public class EventController {

    @Autowired
    private EventService eventService;



    @ResponseBody
    @GetMapping(value = "get-events")
    public ResponseEntity<List<RawEventDto>> getEventsByContribution(@RequestParam(value = "contribution", required = true) Long id) {
        log.info("Start get events.");

        List<RawEventDto> records = eventService.findEventsByContributionId(id);

        return ResponseEntity.ok(records);
    }


    @ResponseBody
    @GetMapping(value = "get-filtered-event-view")
    public ResponseEntity<List<RawEventDto>> getEventsByFilters(
            @RequestParam(value = "dateFrom", required = true) String dateFrom,
            @RequestParam(value = "dateTo", required = true) String dateTo,
            @RequestParam(value = "status", required = true) String status,
            @RequestParam(value = "searchString", required = false) String searchString) {
        log.info("Start get events by filters: dateFrom: {}, dateTo: {}, status: {}, searchString: {}",
                dateFrom, dateTo, status, searchString);

//        List<RawEventDto> records = eventService.findEventsByFilters(dateFrom, dateTo, status, searchString);

        List<RawEventDto> records = eventService.findEventsByContributionId(1L);

        return ResponseEntity.ok(records);
    }


    @ResponseBody
    @GetMapping(value = "get-event-view")
    public ResponseEntity<List<EventViewDto>> getEventView() {
        log.info("Start get-event-view.");

        List<EventViewDto> eventViewDtos = eventService.getAllEventViewDtos();

        return ResponseEntity.ok(eventViewDtos);
    }


    @ResponseBody
    @GetMapping(value = "get-all-events")
    public ResponseEntity<List<RawEventDto>> getAllEvents() {
        log.info("Start get all events.");

        List<RawEventDto> rawEventDtoList = eventService.getAllRawEventDto();

        return ResponseEntity.ok(rawEventDtoList);
    }


    @ResponseBody
    @PostMapping(value = "delete-events")
    public ResponseEntity<String> deleteEvents(@RequestBody List<RawEventDto> eventDtoList) {
        log.info("Start delete events from json: {}.", eventDtoList);

        eventService.deleteEvents(eventDtoList);
        return ResponseEntity.ok("Delete status OK");
    }


    @ResponseBody
    @GetMapping(value = "get-event-table")
    public ResponseEntity<List<Event>> getEventTable() {
        log.info("Call get-event-table. get-all-event");

        List<Event> eventList = eventService.findAllEvents();
        return ResponseEntity.ok(eventList);
    }


    @ResponseBody
    @PostMapping(value = "save-event")
    public ResponseEntity<String> saveContribution(@RequestBody Event jsonEvent) {
        log.info("Start save or edit Event from json: {}.", jsonEvent);

        eventService.saveOrEditEvent(jsonEvent);
        return ResponseEntity.ok("Status OK");
    }


}
