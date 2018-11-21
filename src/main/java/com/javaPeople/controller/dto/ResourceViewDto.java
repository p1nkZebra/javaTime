package com.javaPeople.controller.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResourceViewDto {

    private Long id;
    private String name;
    private String comment;

    private int contributionCount;
    private int eventCount;



}
