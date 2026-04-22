package com.studyflow.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private String status;
    private String priority;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm[:ss]")
    private LocalDateTime deadline;

    private String color;
}
