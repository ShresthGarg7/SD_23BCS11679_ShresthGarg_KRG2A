package com.studyflow.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardStats {
    private long totalTasks;
    private long completedTasks;
    private long todoTasks;
    private long inProgressTasks;
    private double productivityPercentage;
    private long overdueTasks;
    private double weeklyChange;
}
