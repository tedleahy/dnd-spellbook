class SpellsController < ApplicationController
  def index
    render json: Spell.order(:level, :name), except: %i[created_at updated_at]
  end

  def show
    render json: Spell.find(params[:id]), except: %i[created_at updated_at]
  end
end
