package com.sunbeam.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.Modules;
import com.sunbeam.entities.ReferenceBooks;

public interface ReferenceBookDao extends JpaRepository<ReferenceBooks, Long>{

	@Query("select r from ReferenceBooks r where r.module.id=:moduleId")
	List<ReferenceBooks> findReferenceBooksByModuleId(Long moduleId);
	@Query("select m from Modules m where m.id=:id")
	Modules findModuleById(Long id);
	@Query("select r from ReferenceBooks r where r.book_title=:name and r.module.id=:id")
	ReferenceBooks findByBookNameAndModuleId(String name, Long id);
}
