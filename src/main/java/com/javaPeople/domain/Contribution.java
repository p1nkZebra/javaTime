package com.javaPeople.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data // пропись в коде геттеров и сеттеров
@NoArgsConstructor // конструктор без аргументов
@Builder //
// builder зависит от allAr
@AllArgsConstructor //
@Entity
@Table(name = "contribution", schema = "resource_circle")
@ToString(exclude = {"resource", "events"})
@EqualsAndHashCode(exclude = {"resource", "events"})
public class Contribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //стратегия заполнения
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @JsonIgnore
    @Getter(onMethod = @__(@NotNull))
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "resource_id", referencedColumnName = "id", nullable = false)
    private CircleResource resource;

    @Column(name = "resource_id", insertable = false, updatable = false)
    private Long resourceId;

    @Getter(onMethod = @__(@NotNull))
    @Column(name = "name", nullable = false)
    private String name;

    @Getter(onMethod = @__(@NotNull))
    @Column(name = "factor", nullable = false)
    private Long factor; // вклад

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "contribution")
    private List<Event> events = new ArrayList<>();


}
