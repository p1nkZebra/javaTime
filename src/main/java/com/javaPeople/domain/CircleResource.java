package com.javaPeople.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.annotations.Expose;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@ToString(exclude = {"contributions"})
@EqualsAndHashCode(exclude = {"contributions"})
@Table(name = "resource", schema = "resource_circle")
public class CircleResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    @Expose
    private Long id;

    @Getter(onMethod = @__(@NotNull))
    @Column(name = "name", nullable = false)
    @Expose
    private String name;

    @Column(name = "comment")
    @Expose
    private String comment;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "resource")
    private List<Contribution> contributions = new ArrayList<>();

}

