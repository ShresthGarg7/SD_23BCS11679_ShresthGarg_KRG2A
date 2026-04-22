package com.studyflow.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    private String title;
    private String description;
    private String status; // todo, progress, done
    private String priority; // Low, Medium, High
    private LocalDateTime deadline;
    private String color;
    private LocalDateTime createdAt;
    private String userId;
}
