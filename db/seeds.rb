data_set = ''
10000.times do |counter|
  data_set << "('Name-#{counter}', 'ItemType-#{counter}', '2018-12-01 00:44:44 +0530', '2018-12-01 00:44:44 +0530'),"
end
data_set.chomp!(',')
Item.connection.insert("insert into items(name, item_type, created_at, updated_at) values#{data_set}")