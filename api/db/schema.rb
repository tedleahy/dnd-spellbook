# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_13_004338) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "spell_list_spell_joins", force: :cascade do |t|
    t.bigint "spell_id", null: false
    t.bigint "spell_list_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["spell_id"], name: "index_spell_list_spell_joins_on_spell_id"
    t.index ["spell_list_id"], name: "index_spell_list_spell_joins_on_spell_list_id"
  end

  create_table "spell_list_spells", force: :cascade do |t|
    t.bigint "spell_id", null: false
    t.bigint "spell_list_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["spell_id"], name: "index_spell_list_spells_on_spell_id"
    t.index ["spell_list_id"], name: "index_spell_list_spells_on_spell_list_id"
  end

  create_table "spell_lists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "spells", force: :cascade do |t|
    t.string "name"
    t.text "source"
    t.text "description"
    t.integer "level"
    t.string "school"
    t.boolean "is_ritual"
    t.string "casting_time"
    t.string "range"
    t.string "duration"
    t.string "components"
    t.text "higher_levels_info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "spell_list_spell_joins", "spell_lists"
  add_foreign_key "spell_list_spell_joins", "spells"
  add_foreign_key "spell_list_spells", "spell_lists"
  add_foreign_key "spell_list_spells", "spells"
end
