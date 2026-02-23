export const optionsData = [
    {
        category: "Objectives",
        description: "Control how many activities are needed for checks.",
        options: [
            { name: "crucible_runs", type: "range", min: 0, max: 10, default: 1, label: "Crucible Runs Required", description: "Complete N successful Crucible runs." },
            { name: "crucible_floors_required", type: "range", min: 0, max: 30, default: 0, label: "Crucible Floors Reach", description: "Any floor entered sends a check." },
            { name: "crucible_floor_5_required", type: "range", min: 0, max: 10, default: 0, label: "Crucible Floor 5 Milestones", description: "Visits to floor 5 send checks." },
            { name: "crucible_floor_10_required", type: "range", min: 0, max: 10, default: 0, label: "Crucible Floor 10 Milestones", description: "Visits to floor 10 (boss) send checks." },
            { name: "activities_required", type: "range", min: 1, max: 30, default: 10, label: "Activities Required", description: "Number of activities to turn in." },
            { name: "parries_required", type: "range", min: 0, max: 30, default: 20, label: "Unique Enemy Parries", description: "Parry unique enemy types." },
            { name: "whispers_required", type: "range", min: 0, max: 27, default: 10, label: "Whispers to Activate", description: "Activate whisper shrines." },
            { name: "keys_required", type: "range", min: 0, max: 36, default: 10, label: "Keys to Collect", description: "Collect named keys." },
            { name: "harvests_required", type: "range", min: 0, max: 50, default: 20, label: "Material Harvests", description: "Number of node harvests." },
            { name: "unique_enemies_required", type: "range", min: 0, max: 100, default: 0, label: "Unique Enemy Kills", description: "Kill unique enemy types." },
            { name: "chests_required", type: "range", min: 0, max: 200, default: 50, label: "Chests to Open", description: "Large and small combined." },
            { name: "shinies_required", type: "range", min: 0, max: 100, default: 50, label: "Shinies to Open", description: "Shiny dynamic data openings." },
        ]
    },
    {
        category: "Randomization",
        description: "Settings for item and enemy randomization.",
        options: [
            { name: "item_replace_chance", type: "range", min: 0, max: 100, default: 0, label: "Item Randomize Chance (%)", description: "Chance any eligible drop is swapped." },
            { name: "enemy_randomize_chance", type: "range", min: 0, max: 100, default: 0, label: "Enemy Randomize Chance (%)", description: "Chance enemy spawn is replaced." },
            { name: "enemy_spawn_count", type: "range", min: 1, max: 5, default: 1, label: "Enemies Per Spawn", description: "Enemies spawned per replaced slot." },
            { name: "replace_armour", type: "toggle", default: 0, label: "Randomize Armour Drops" },
            { name: "replace_shield", type: "toggle", default: 0, label: "Randomize Shield Drops" },
            { name: "replace_trinket", type: "toggle", default: 0, label: "Randomize Trinket Drops" },
            { name: "replace_tool", type: "toggle", default: 0, label: "Randomize Tool Drops" },
            { name: "replace_usable", type: "toggle", default: 0, label: "Randomize Usable Drops" },
            { name: "replace_resource", type: "toggle", default: 0, label: "Randomize Resource Drops" },
            { name: "replace_refined_resource", type: "toggle", default: 0, label: "Randomize Refined Resource Drops" },
            { name: "replace_material", type: "toggle", default: 0, label: "Randomize Material Drops" },
            { name: "replace_recipe", type: "toggle", default: 0, label: "Randomize Recipe Drops" },
            { name: "replace_rune", type: "toggle", default: 0, label: "Randomize Rune Drops" },
            { name: "replace_gem", type: "toggle", default: 0, label: "Randomize Gem Drops" },
            { name: "replace_house_item", type: "toggle", default: 0, label: "Randomize House Item Drops" },
            { name: "replace_quiver", type: "toggle", default: 0, label: "Randomize Quiver Drops" },
        ]
    },
    {
        category: "Pool Settings",
        description: "Configure what items appear in the randomized pool.",
        options: [
            { name: "plague_ichor_count", type: "range", min: 0, max: 10, default: 5, label: "Plague Ichor in Pool", description: "Valuable upgrade resource." },
            { name: "weapon_pool_club", type: "toggle", default: 1, label: "Pool: Clubs" },
            { name: "weapon_pool_sword", type: "toggle", default: 1, label: "Pool: Swords" },
            { name: "weapon_pool_axe", type: "toggle", default: 1, label: "Pool: Axes" },
            { name: "weapon_pool_polearm", type: "toggle", default: 1, label: "Pool: Polearms" },
            { name: "weapon_pool_dagger", type: "toggle", default: 1, label: "Pool: Daggers" },
            { name: "weapon_pool_staff", type: "toggle", default: 1, label: "Pool: Staves" },
            { name: "weapon_pool_ranged", type: "toggle", default: 1, label: "Pool: Ranged" },
            { name: "weapon_pool_other", type: "toggle", default: 1, label: "Pool: Others" },
            { name: "pool_armour", type: "toggle", default: 1, label: "Pool: Armour" },
            { name: "pool_shield", type: "toggle", default: 1, label: "Pool: Shields" },
            { name: "pool_trinket", type: "toggle", default: 1, label: "Pool: Trinkets" },
            { name: "pool_tool", type: "toggle", default: 1, label: "Pool: Tools" },
            { name: "pool_usable", type: "toggle", default: 1, label: "Pool: Usables" },
            { name: "pool_rarity_white", type: "toggle", default: 1, label: "Rarity: Common (White)" },
            { name: "pool_rarity_blue", type: "toggle", default: 1, label: "Rarity: Rare (Blue)" },
            { name: "pool_rarity_purple", type: "toggle", default: 1, label: "Rarity: Epic (Purple)" },
            { name: "pool_rarity_gold", type: "toggle", default: 1, label: "Rarity: Legendary (Gold)" },
        ]
    },
    {
        category: "Gameplay",
        description: "Miscellaneous world and gameplay settings.",
        options: [
            { name: "xp_multiplier", type: "range", min: 50, max: 2000, default: 100, label: "XP Multiplier (%)", description: "100=Normal, 200=Double." },
            { name: "whisper_heals", type: "toggle", default: 1, label: "Whisper Shrines Heal", description: "Fully restore health on interact." },
            { name: "feature_locks_enabled", type: "toggle", default: 1, label: "Feature Locks Enabled", description: "Abilities start locked." },
            { name: "ingredient_to_meal", type: "toggle", default: 0, label: "Ingredients to Meals", description: "Replace ingredients with cooked meals." },
            {
                name: "start_location", type: "choice", default: "new_character_spawn", label: "Starting Location", options: [
                    "new_character_spawn", "saltborn_tower", "ramparts", "sage_road", "forgotten_bridge",
                    "ionas_cavern", "windmill", "lumber_mill", "hunters_vale", "weeping_sisters",
                    "marketplace", "crucible", "ashen_road", "quarry_elevator", "quarry_dungeon",
                    "mountain_gate", "cerim_chamber", "shrouded_cavern", "the_cauldron", "central_chamber",
                    "fungal_shrine", "the_depths", "harvest_road", "balak_taw_roost", "marin_village",
                    "seekers_rest", "winged_door", "random"
                ]
            }
        ]
    }
];
