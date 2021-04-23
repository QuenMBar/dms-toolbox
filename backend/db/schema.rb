# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_23_000156) do

  create_table "campaigns", force: :cascade do |t|
    t.string "name"
    t.integer "dm_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dm_id"], name: "index_campaigns_on_dm_id"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "klass"
    t.string "language"
    t.string "race"
    t.string "alignment"
    t.integer "armor_class"
    t.integer "level"
    t.integer "strength"
    t.integer "dexterity"
    t.integer "constitution"
    t.integer "intelligence"
    t.integer "wisdom"
    t.integer "charisma"
    t.string "background"
    t.integer "campaign_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_id"], name: "index_characters_on_campaign_id"
  end

  create_table "dms", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "itemable_type"
    t.integer "itemable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["itemable_type", "itemable_id"], name: "index_items_on_itemable_type_and_itemable_id"
  end

  create_table "monsters", force: :cascade do |t|
    t.string "name"
    t.string "meta"
    t.string "armor_class"
    t.string "hit_points"
    t.string "speed"
    t.string "stats"
    t.string "senses"
    t.string "languages"
    t.string "challenge"
    t.string "traits"
    t.string "actions"
    t.string "legendary_actions"
    t.string "img_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "noteable_type"
    t.integer "noteable_id"
    t.string "title"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["noteable_type", "noteable_id"], name: "index_notes_on_noteable_type_and_noteable_id"
  end

  create_table "npcs", force: :cascade do |t|
    t.string "name"
    t.string "appearance"
    t.string "best_ability"
    t.string "worst_ability"
    t.string "talent"
    t.string "ideal"
    t.string "mannerism"
    t.string "trait"
    t.string "bond"
    t.string "flaw"
    t.integer "campaign_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["campaign_id"], name: "index_npcs_on_campaign_id"
  end

end
