class SpellsController < ApplicationController
  def index
    render json: Spell.all, except: %i[created_at updated_at]
  end

  def show
  end
end
