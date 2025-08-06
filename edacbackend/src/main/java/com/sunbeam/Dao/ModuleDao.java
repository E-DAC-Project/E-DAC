package com.sunbeam.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Modules;

public interface ModuleDao extends JpaRepository<Modules, Long>{

	List<Modules> findByStatus(boolean status);
	boolean existsByModuleName(String moduleName);
}
