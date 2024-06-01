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
                CREATE TABLE IF NOT EXISTS nagodo_collections_properties (
                    id INT(11) NOT NULL AUTO_INCREMENT,
                    label VARCHAR(255) NOT NULL,
                    type TEXT NOT NULL,
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

    self.CreateCollection = function(collection)
        local result = exports.oxmysql:executeSync('INSERT INTO nagodo_collections (label) VALUES (?) ', {collection.label})   

        return result
    end

    self.GetAllCollections = function()
        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections')

        local collections = {}

        if next(result) then
            for k, v in pairs(result) do
                table.insert(collections, {
                    identifier = v.id,
                    label = v.label
                })
            end
        end

        return collections
    end

    self.CreateProperty = function(property)
       
        local data = {
            image = property.image
        }

        local result = exports.oxmysql:executeSync('INSERT INTO nagodo_collections_properties (label, type, data) VALUES (?, ?, ?) ', {property.label, property.type, json.encode(data)})   
    
        return result
    end

    self.GetAllProperties = function()
        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections_properties')

        local properties = {}

        if next(result) then
            for k, v in pairs(result) do
                local data = json.decode(v.data)
                table.insert(properties, {
                    identifier = v.id,
                    label = v.label,
                    type = v.type,
                    image = data.image
                })
            end
        end

        return properties
    end

    return self
end



