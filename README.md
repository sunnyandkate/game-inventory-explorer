# Game Inventory Explorer

This is a full-stack RPG inventory system that connects 
an interactive **Unity game** to a **React web dashboard** 
through a **Spring Boot API**. When you find items in the game, 
they instantly update in the database and show up on the game panel.

You can add items in in the admin panel, if they exist as a hidden item 
in the game, they will be added. To add an item or delete it, you will need 
the admin key: mySuperSecretPassword

---

##  How It's Organized

*   `backend/` — The Spring Boot REST API that handles all the game logic and connects to MySQL.
*   `frontend/` — The React dashboard for viewing and managing items.
*   `unity-game/` — The actual game project files.
*   `schema.sql` — The MySQL table layouts.
