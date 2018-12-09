package com.javaPeople.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@ToString(exclude = {"contribution"})
@EqualsAndHashCode(exclude = {"contribution"})
@Entity
@Table(name = "event", schema = "resource_circle")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id" , nullable = false , unique = true)
    private Long id;

    @Getter(onMethod =  @__(@NonNull))
    @Column(name = "name")
    private String name;

    @JsonIgnore
    @Getter(onMethod = @__(@NotNull))
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contribution_id", referencedColumnName = "id", nullable = false)
    private Contribution contribution;

    @Getter(onMethod = @__(@NotNull))
    @Column(name = "contribution_id", insertable = false, updatable = false)
    private Long contributionId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Getter(onMethod = @__(@NotNull))
    @Column(name = "event_date")
    private LocalDate eventDate;

    @Column(name = "comment")
    private String comment;

    @Column(name = "cron_period")
    private String cronPeriod;

    @Column(name = "user_value")
    private Long userValue;
}
