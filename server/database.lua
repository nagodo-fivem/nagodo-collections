function Database()
    local self = {}
    self.isReady = false

    self.Init = function()
        exports.oxmysql:executeSync(
            [[
                CREATE TABLE IF NOT EXISTS nagodo_collections_cards (
                    id INT(11) NOT NULL AUTO_INCREMENT,
                    label VARCHAR(255) NOT NULL,
                    collection VARCHAR(255) NOT NULL,
                    type TEXT NOT NULL,
                    rarity int NOT NULL,
                    data TEXT NOT NULL,
                    PRIMARY KEY (id)
                );
            ]]
        )

        exports.oxmysql:executeSync(
            [[
                CREATE TABLE IF NOT EXISTS nagodo_collections (
                    id INT(11) NOT NULL AUTO_INCREMENT,
                    label VARCHAR(255) NOT NULL,
                    PRIMARY KEY (id)
                );
            ]]
        )
        
        self.isReady = true
    end

    self.GetCollections = function()
        if not self.isReady then
            return
        end

        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections')

        local collections = {}
        if next(result) then
            for _, collection in pairs(result) do
                local collection = {
                    id = collection.id,
                    name = collection.label
                }
                table.insert(collections, collection)
            end
        end

        return collections
    end

    self.DoesCollectionExist = function(name)
        if not self.isReady then
            return
        end

        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections WHERE label = ?', {name})

        return result[1] ~= nil
    end

    self.CreateCollection = function(name)
        if not self.isReady then
            return
        end

        exports.oxmysql:executeSync('INSERT INTO nagodo_collections (label) VALUES (?)', {name})
    end

    return self
end
