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

    self.UpdateProperty = function(property)
        local data = {
            image = property.image
        }

        local result = exports.oxmysql:executeSync('UPDATE nagodo_collections_properties SET label = ?, type = ?, data = ? WHERE id = ?', {property.label, property.type, json.encode(data), property.identifier})   

        return result
    end

    self.DeleteProperty = function(propertyIdentifier)
        local result = exports.oxmysql:executeSync('DELETE FROM nagodo_collections_properties WHERE id = ?', {propertyIdentifier})   

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

    self.GetAllCards = function(collectionIdentifier)
        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections_cards WHERE collection = ?', {collectionIdentifier})

        local cards = {}

        if next(result) then
            for k, v in pairs(result) do
                local data = json.decode(v.data)
                table.insert(cards, {
                    identifier = v.id,
                    name = v.label,
                    health = data.health,
                    info = data.info,
                    attack = data.attack,
                    damage = data.damage,
                    cardNum = data.cardNum,
                    rarity = v.rarity,
                    frameIdentifier = data.frameIdentifier,
                    elementIdentifier = data.elementIdentifier,
                    imageOverlayIdentifier = data.imageOverlayIdentifier,
                    isCustomCard = data.isCustomCard or false,
                    cardImage = data.cardImage
                })
            end
        end

        return cards
    end

    self.GetCardsForItemRegister = function()
        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections_cards', {}) 

        local cards = {}

        if next(result) then
            for k, v in pairs(result) do
                local card = {
                    identifier = v.id,
                    collectionId =  v.collection,
                    name = v.label
                }
                table.insert(cards, card)
            end
        end

        return cards
    end

    self.GetCardDataForUse = function(cardName)
 
        local removePrefix = string.gsub(cardName, "card_", "")
  
        local collectionId = string.sub(removePrefix, 1, 1)
        local cardId = string.sub(removePrefix, 3, removePrefix:len())
 
        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections_cards WHERE collection = ? AND id = ?', {collectionId, cardId}) 
    
        
        if next(result) then
            
            local fetchedData = result[1]
            local additionelData = json.decode(fetchedData.data)

            local ids = {
                additionelData.frameIdentifier,
                additionelData.elementIdentifier,
                additionelData.imageOverlayIdentifier
            }

            local final = {}

            for k, v in ipairs(ids) do
                if v ~= -1 then
                    table.insert(final, v)
                end     
            end


            local properties = {}
            for k, v in ipairs(final) do

                local property = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections_properties WHERE id = ?', {v})
                if next(property) then
                    table.insert(properties, {
                        type = property[1].type,
                        image = json.decode(property[1].data).image
                    })
                end

                
            end


            local sortedProperties = self.SortProperties(properties)

            local cardData = {
                name = fetchedData.label,
                health = additionelData.health,
                attack = additionelData.attack,
                damage = additionelData.damage,
                info = additionelData.info,

                cardImage = additionelData.cardImage,
                frameImage = sortedProperties["frame"],
                elementImage = sortedProperties["element"],
                overlayImage = sortedProperties["overlay"],

                isCustomCard = additionelData.isCustomCard,
            }

            print("-------------------")
            print(json.encode(cardData))

            return cardData
        end

        return false
    end
    
    self.SortProperties = function(properties)
        local sorted = {}

        for k, v in pairs(properties) do
            sorted[v.type] = v.image
        end

        return sorted
    end

    self.CreateCard = function(collectionIdentifier, card)
        local data = {
            health = card.health,
            info = card.info,
            attack = card.attack,
            damage = card.damage,
            cardNum = card.cardNum,
            cardImage = card.cardImage,
            isCustomCard = card.isCustomCard,

            frameIdentifier = card.frameIdentifier,
            elementIdentifier = card.elementIdentifier,
            imageOverlayIdentifier = card.imageOverlayIdentifier,
        }

        local result = exports.oxmysql:executeSync('INSERT INTO nagodo_collections_cards (label, collection, rarity, data) VALUES (?, ?, ?, ?) ', {card.name, collectionIdentifier, card.rarity, json.encode(data)})   

        return result
    end

    self.UpdateCard = function(card)
        local data = {
            health = card.health,
            info = card.info,
            attack = card.attack,
            damage = card.damage,
            cardNum = card.cardNum,
            cardImage = card.cardImage,
            isCustomCard = card.isCustomCard,

            frameIdentifier = card.frameIdentifier,
            elementIdentifier = card.elementIdentifier,
            imageOverlayIdentifier = card.imageOverlayIdentifier,
        }

        local result = exports.oxmysql:executeSync('UPDATE nagodo_collections_cards SET label = ?, rarity = ?, data = ? WHERE id = ?', {card.name, card.rarity, json.encode(data), card.identifier})   

        return result
    end

    return self
end

DATABASE = Database()