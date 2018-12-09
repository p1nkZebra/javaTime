package com.javaPeople.logic.service;

import com.javaPeople.controller.dto.EventViewDto;
import com.javaPeople.controller.dto.RawEventDto;
import com.javaPeople.controller.dto.converter.EventDtoConverter;
import com.javaPeople.domain.Contribution;
import com.javaPeople.domain.Event;
import com.javaPeople.repository.ContributionRepository;
import com.javaPeople.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private ContributionRepository contributionRepository;
    @Autowired
    private EventDtoConverter converter;


    public List<RawEventDto> findEventsByContributionId(@NotNull Long contributionId) {
        List<RawEventDto> resultList = new ArrayList<>();

        List<Event> eventList = eventRepository.findByContributionId(contributionId);

        for ( Event event : eventList ) {
            resultList.add(converter.convertToDto(event));
        }

        return resultList;
    }


    public List<RawEventDto> getAllRawEventDto() {
        List<RawEventDto> resultList = new ArrayList<>();

        List<Event> eventList = eventRepository.findAll();

        for ( Event event : eventList ) {
            resultList.add(converter.convertToDto(event));
        }

        return resultList;
    }

    public void deleteEvents(List<RawEventDto> eventDtoList) {

        List<Event> eventList = new ArrayList<>();
        for ( RawEventDto eventDto : eventDtoList ) {
            eventList.add(converter.convertToEvent(eventDto));
        }

        List<Long> ids = new ArrayList<>();
        for (Event event: eventList) {
            ids.add(event.getId());
        }

        eventRepository.deleteByIds(ids);

    }

    @NotNull
    public List<EventViewDto> getAllEventViewDtos() {
        List<EventViewDto> resultList = new ArrayList<>();

        List<Event> eventList = eventRepository.findAll();
        for ( Event event : eventList ) {
            resultList.add(converter.convertEventToEventViewDto(event));
        }

        return resultList;
    }

    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    public void saveOrEditEvent(@NotNull Event event) {
        Long contributionId = event.getContributionId();
        Contribution contribution = contributionRepository.findById(contributionId)
                .orElseThrow(() -> new RuntimeException("Contribution not fount. resourceId: " + contributionId));
        event.setContribution(contribution);
        eventRepository.save(event);
    }
}
