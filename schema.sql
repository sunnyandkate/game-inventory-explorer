

CREATE TABLE `game_items` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_found` tinyint(1) DEFAULT 0,
  `is_used` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `game_items`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `game_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

