package com.javaPeople.repository;

import com.javaPeople.domain.CircleResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CircleResourceRepository extends JpaRepository<CircleResource, Long> {
    List<CircleResource> findByName (String name);

    @Query( value = "SELECT COUNT (resource_circle.contribution.id) " +
            "FROM resource_circle.contribution " +
            "WHERE resource_circle.contribution.resource_id = ?",nativeQuery = true)
    Long countContributionsByResource(Long Id);


}
