class SpellsController < ApplicationController
  def index
    page = params[:page]&.to_i || 1
    per_page = params[:per_page]&.to_i || 500
    per_page = [ per_page, 500 ].min # Limit to 500 items per page

    spells = Spell.order(:level, :name)
                  .offset((page - 1) * per_page)
                  .limit(per_page)

    total_count = Spell.count
    total_pages = (total_count / per_page.to_f).ceil

    render json: {
      spells: spells.as_json(except: %i[created_at updated_at]),
      pagination: {
        current_page: page,
        per_page: per_page,
        total_pages: total_pages,
        total_count: total_count,
        has_next_page: page < total_pages,
        has_previous_page: page > 1,
      },
    }
  end

  def show
    render json: Spell.find(params[:id]), except: %i[created_at updated_at]
  end
end
