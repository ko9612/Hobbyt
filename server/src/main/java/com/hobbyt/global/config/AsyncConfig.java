package com.hobbyt.global.config;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@EnableAsync
@Configuration
public class AsyncConfig {
	private static final int CORE_POOL_SIZE = 10;
	private static final int MAX_POOL_SIZE = 30;
	private static final int QUEUE_CAPACITY = 100;
	private static final String THREAD_NAME_PREFIX = "Executor-";

	public Executor mailTaskExecutor() {
		ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
		taskExecutor.setCorePoolSize(CORE_POOL_SIZE);    // 기본 스레드 수
		taskExecutor.setMaxPoolSize(MAX_POOL_SIZE);    // 최대 스레드 수
		taskExecutor.setQueueCapacity(QUEUE_CAPACITY); // Queue 사이즈
		taskExecutor.setThreadNamePrefix(THREAD_NAME_PREFIX);
		return taskExecutor;
	}
}
