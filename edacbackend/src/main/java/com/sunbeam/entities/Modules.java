package com.sunbeam.entities;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Module")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true, exclude = {"topicList", "rbList"})
public class Modules extends BaseEntity {

	@Column(name = "module_name", length = 50)
	@NotBlank(message = "Module name not be null")
	private String moduleName;
	@Column(name = "description")
	@NotBlank(message = "Description not be null")
	@Length(max = 100, message = "length cannot be greater than 100")
	private String description;
	@Column(name = "status", columnDefinition = "BOOLEAN DEFAULT TRUE" )
	private boolean status = true;
	@Column(name = "period")
	@NotNull
	@Min(value = 1, message = "Module period must be at least 1 month")
    @Max(value = 6, message = "Module period cannot be more than 6 months")
	private int modulePeriod;
	@OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Topics> topicList = new ArrayList<Topics>();
	@OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ReferenceBooks> rbList = new ArrayList<ReferenceBooks>();
}
