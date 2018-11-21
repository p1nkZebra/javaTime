package com.javaPeople.repository;

import com.javaPeople.domain.CircleResource;
import com.javaPeople.domain.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContributionRepository extends JpaRepository<Contribution, Long> {

    @Query(value = "SELECT u FROM Contribution u WHERE u.resource = :resource")
    List<Contribution> findByResource(@Param("resource") CircleResource circleResource);

    @Query(value = "SELECT count(u) FROM Contribution u WHERE u.resource = :resource")
    int findContributionCountByResource(@Param("resource") CircleResource resource);


//    @Query(value = "SELECT count(e) FROM Contribution u join Contribution.events e WHERE u.resource = :resource")
//    int findEventCountByResource(@Param("resource") CircleResource resource);

    @Query(value = "SELECT count(e.event_id) " +
            " FROM resource_circle.contribution u " +
            " join resource_circle.event e on (u.id = e.contribution_id) " +
            " WHERE u.resource_id = ? "
            , nativeQuery = true)
    int findEventCountByResourceId(Long resourceId);
}
