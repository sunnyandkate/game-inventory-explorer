package com.sunnyandkate.inventory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<GameItem, Long>{
	
	List<GameItem> findByFoundTrueAndUsedFalse();
	Optional<GameItem> findFirstByNameAndFoundFalse(String name);
	
}
