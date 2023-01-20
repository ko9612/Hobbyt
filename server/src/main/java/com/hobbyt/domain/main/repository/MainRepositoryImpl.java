package com.hobbyt.domain.main.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public class MainRepositoryImpl implements MainRepository {
}
