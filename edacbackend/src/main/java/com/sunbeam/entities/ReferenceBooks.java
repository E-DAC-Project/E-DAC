package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ReferenceBooks")
@Getter
@Setter
@NoArgsConstructor
@ToString(callSuper = true)
public class ReferenceBooks extends BaseEntity {

	@Column(name = "book_title", length = 50)
	@NotBlank(message = "book name not be null")
	private String book_title;
	@Column(name = "author", length = 50)
	@NotBlank(message = "author name not be null")
	private String author;
	@Column(name = "link", columnDefinition = "TEXT")
	@NotNull
	private String link;
	@Column(name = "status", columnDefinition = "BOOLEAN DEFAULT TRUE" )
	private boolean status;
	@ManyToOne
	@JoinColumn(name = "module_Id")
	private Modules module;
}
