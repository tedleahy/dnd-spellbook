class SpellsController < ApplicationController
  def index
    render json: Spell.all, except: %i[created_at updated_at]
  end

  def show
    render json: Spell.find(params[:id]), except: %i[created_at updated_at]
  end
end
