class CocktailsController < ApplicationController
  before_action :set_cocktail, only: [ :show, :edit, :update, :destroy]
  def index
    @cocktails = Cocktail.all
  end

  def show
  end

  def new
    @cocktail = Cocktail.new
    @ingredients = Ingredient.all
    dose = @cocktail.doses.build
  end

  def create
    @cocktail = Cocktail.new(cocktail_params)
    params[:cocktail][:doses_attributes].values.each do |attributes|
      @cocktail.doses.new(attributes)
    end
    if @cocktail.save
      redirect_to cocktail_path(@cocktail)
    else
      render :new
    end
  end

  def edit
    # @ingredients = Ingredient.all
    # @cocktail.doses.each do |dose|
    #   dose.build
    # end
  end

  def update
    if @cocktail.update(cocktail_params)
      redirect_to cocktail_path(@cocktail)
    else
      render :edit
    end
  end

  def destroy
    @cocktail.destroy
    redirect_to cocktails_path
  end

  private

  def set_cocktail
    @cocktail = Cocktail.find(params[:id])
  end
  def dose_params
    params.require(:dose).permit(:ingredient_id, :description)
  end
  def cocktail_params
    params.require(:cocktail).permit(:name, :doses_attributes)
  end
end
