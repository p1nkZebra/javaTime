package com.javaPeople.controller.dto.converter;

import com.javaPeople.controller.dto.EventViewDto;
import com.javaPeople.controller.dto.RawEventDto;
import com.javaPeople.domain.CircleResource;
import com.javaPeople.domain.Contribution;
import com.javaPeople.domain.Event;
import com.javaPeople.repository.CircleResourceRepository;
import com.javaPeople.repository.ContributionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class EventDtoConverter {

    private static final String DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
    private static final String DATE_FORMAT = "MM.dd.yyyy";

    @Autowired
    private CircleResourceRepository resourceRepository;
    @Autowired
    private ContributionRepository contributionRepository;


    public RawEventDto convertToDto(Event event) {

        String eventDateStringFormat = convertLocalDateToString(event.getEventDate());

        return RawEventDto.builder()
                .id(event.getId())
                .eventDate(eventDateStringFormat)
                .comment(event.getComment())
                .name(event.getName())
                .build();

    }

    public Event convertToEvent(RawEventDto eventDto) {
        LocalDate eventDate = LocalDate.parse(eventDto.getEventDate(), DateTimeFormatter.ofPattern(DATETIME_FORMAT));

        return Event.builder()
                .id(eventDto.getId())
                .eventDate(eventDate)
                .comment(eventDto.getComment())
                .name(eventDto.getName())
                .build();

    }

    @NotNull
    public EventViewDto convertEventToEventViewDto(@NotNull Event event) {
        Contribution contribution = contributionRepository.findById(event.getContributionId())
                .orElseThrow(() -> new RuntimeException("Error. Contribution not found."));

        CircleResource resource = resourceRepository.findById(contribution.getResourceId())
                .orElseThrow(() -> new RuntimeException("Error. CircleResource not found"));

        String eventDateStringFormat = convertLocalDateToString(event.getEventDate());

        return EventViewDto.builder()
                .id(event.getId())
                .resourceId(resource.getId())
                .resourceName(resource.getName())
                .contributionId(contribution.getId())
                .contributionName(contribution.getName())
                .name(event.getName())
                .eventDate(eventDateStringFormat)
                .comment(event.getComment())
                .build();
    }

    private String convertLocalDateToString(LocalDate eventDate) {
        return eventDate != null ? eventDate.format(DateTimeFormatter.ofPattern(DATE_FORMAT)) : null;
    }
}
