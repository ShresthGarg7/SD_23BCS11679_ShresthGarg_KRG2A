package com.studyflow.service;

import com.studyflow.dto.TaskRequest;
import com.studyflow.model.Task;
import com.studyflow.model.User;
import com.studyflow.repository.TaskRepository;
import com.studyflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Cacheable(value = "tasks", key = "#root.target.getCurrentUserId()")
    public List<Task> getAllTasks() {
        String userId = getCurrentUserId();
        return taskRepository.findByUserId(userId);
    }

    @CacheEvict(value = {"tasks", "dashboard"}, key = "#root.target.getCurrentUserId()")
    public Task createTask(TaskRequest request) {
        if (request.getDeadline() != null && request.getDeadline().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Deadline must be in the future");
        }
        String userId = getCurrentUserId();
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : "todo")
                .priority(request.getPriority() != null ? request.getPriority() : "Medium")
                .deadline(request.getDeadline())
                .color(request.getColor())
                .createdAt(LocalDateTime.now())
                .userId(userId)
                .build();
        return taskRepository.save(task);
    }

    @CacheEvict(value = {"tasks", "dashboard"}, key = "#root.target.getCurrentUserId()")
    public Task updateTask(String id, TaskRequest request) {
        if (request.getDeadline() != null && request.getDeadline().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Deadline must be in the future");
        }
        Task task = getTaskByIdIfOwned(id);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDeadline(request.getDeadline());
        task.setColor(request.getColor());
        return taskRepository.save(task);
    }

    @CacheEvict(value = {"tasks", "dashboard"}, key = "#root.target.getCurrentUserId()")
    public void deleteTask(String id) {
        Task task = getTaskByIdIfOwned(id);
        taskRepository.delete(task);
    }

    @CacheEvict(value = {"tasks", "dashboard"}, key = "#root.target.getCurrentUserId()")
    public Task moveTask(String id, String status) {
        Task task = getTaskByIdIfOwned(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public String getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return user.getId();
    }

    private Task getTaskByIdIfOwned(String id) {
        Task task = taskRepository.findById(id).orElseThrow();
        String userId = getCurrentUserId();
        if (!task.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to task");
        }
        return task;
    }
}
