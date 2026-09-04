package com.sunnyandkate.inventory;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class GameInventoryController {
	
	
	@Autowired
	private ItemRepository repository;
	
	@Value("${ADMIN_SECRET:admin_password}")
	private String adminSecretToken;
	
	
	//----------------CREATE (ADMIN ENDPOINT)------------------//
	@PostMapping("/admin/create")
	public GameItem createItem(@RequestBody GameItem item, @RequestHeader(value = "Admin-Token", required = false) String token){
		
		if(token == null || !token.equals(adminSecretToken)) {
			 throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid admin token.");
			  
		}
		item.setFound(false);
		item.setUsed(false);
		return repository.save(item);
		
	}
	//----------------READ (ADMIN ENDPOINT)------------------//
	@GetMapping("/admin/allItems")
	public List<GameItem> getAllItems(){
		return repository.findAll();
	}
	
	//----------------READ (GAME CLIENTS ENDPOINT)----------------//
	@GetMapping("/game/bag")
	public List<GameItem> getBag(){
		return repository.findByFoundTrueAndUsedFalse();
	}
	
	
	@PostMapping("/game/explore/name/{name}")
	public ResponseEntity<Map<String, Object>> exploreItemByName(@PathVariable String name){
		Optional<GameItem> itemOpt = repository.findFirstByNameAndFoundFalse(name);
		
		if(itemOpt.isEmpty()){
			return ResponseEntity.ok(Map.of("success", false, "error", "item already discovered or missing"));
			}
		GameItem item = itemOpt.get();
		item.setFound(true);
		repository.save(item);
		
		return ResponseEntity.ok(Map.of("success", true, "item", item));
		}
	
	//-------------------UPDATE (GAME CLIENTS ENDPOINT)-----------------//
	@PutMapping("/game/use/{id}")
	public GameItem useItem(@PathVariable Long id){
		GameItem item = repository.findById(id).orElseThrow();
		item.setUsed(true);
		
		return repository.save(item);
	}
	//--------------DELETE (ADMIN ENDPOINT)-----------//
	@DeleteMapping("/admin/delete/{id}")
	public void deleteItem(@PathVariable Long id, @RequestHeader(value = "Admin-Token", required = false) String token) {
		if(token == null || !token.equals(adminSecretToken)) {
			 throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid admin token.");
			  
		}
		if(!repository.existsById(id)) {
			throw new org.springframework.web.server.ResponseStatusException(
					org.springframework.http.HttpStatus.NOT_FOUND, "Item not found in the database."
				);
		}
		repository.deleteById(id);
		
		
	}

}
