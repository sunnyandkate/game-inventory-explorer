package com.sunnyandkate.inventory;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Entity
@Table(name= "game_items")
@JsonPropertyOrder({ "id", "name", "found", "used" })
public class GameItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	
	@Column(name = "is_found")
	private boolean found;
	
	@Column(name = "is_used")
	private boolean used;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isFound() {
		return found;
	}

	public void setFound(boolean isFound) {
		this.found = isFound;
	}

	public boolean isUsed() {
		return used;
	}

	public void setUsed(boolean isUsed) {
		this.used = isUsed;
	}
	
	

}
