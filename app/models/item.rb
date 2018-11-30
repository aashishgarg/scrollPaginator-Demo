class Item < ApplicationRecord
  PAGINATION_SIZE = 20

  paginates_per PAGINATION_SIZE
end
