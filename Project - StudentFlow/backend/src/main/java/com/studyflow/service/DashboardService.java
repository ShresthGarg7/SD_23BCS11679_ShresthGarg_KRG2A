package com.studyflow.service;

import com.studyflow.dto.DashboardStats;
import com.studyflow.model.Task;
import com.studyflow.model.User;
import com.studyflow.repository.TaskRepository;
import com.studyflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Cacheable(value = "dashboard", key = "#root.target.getCurrentUserId()")
    public DashboardStats getStats() {
        String userId = getCurrentUserId();
        List<Task> allTasks = taskRepository.findByUserId(userId);
        
        long total = allTasks.size();
        long completed = allTasks.stream().filter(t -> "done".equals(t.getStatus())).count();
        long todo = allTasks.stream().filter(t -> "todo".equals(t.getStatus())).count();
        long inProgress = allTasks.stream().filter(t -> "progress".equals(t.getStatus())).count();
        
        long overdue = allTasks.stream()
                .filter(t -> !"done".equals(t.getStatus()))
                .filter(t -> t.getDeadline() != null && t.getDeadline().isBefore(LocalDateTime.now()))
                .count();
        
        double productivity = total > 0 ? (double) completed / total * 100 : 0;

        return DashboardStats.builder()
                .totalTasks(total)
                .completedTasks(completed)
                .todoTasks(todo)
                .inProgressTasks(inProgress)
                .productivityPercentage(Math.round(productivity * 100.0) / 100.0)
                .overdueTasks(overdue)
                .weeklyChange(0.0)
                .build();
    }

    public String getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return user.getId();
    }
}
