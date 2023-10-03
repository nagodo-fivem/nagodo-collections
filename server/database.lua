local _, SHARED_UTILS = exports['nagodo-utils']:GetUtils('server')

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

    self.FetchCollections = function()
        if not self.isReady then
            return
        end

        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections')

        local collections = {}
        if next(result) then
            for _, collection in pairs(result) do
                local collection = {
                    id = collection.id,
                    uid = collection.uid,
                    name = collection.label
                }
                
                table.insert(collections, collection)
            end
        end
        
        return collections
    end

    self.DoesCollectionWithNameExist = function(name)
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

        local uid = self.GenerateCollectionUID()
        print(uid)

        exports.oxmysql:executeSync('INSERT INTO nagodo_collections (uid, label) VALUES (?, ?)', {uid, name})
    end

    self.GenerateCollectionUID = function()
        local randInt = SHARED_UTILS.RandomInt(4)
        local randStr = SHARED_UTILS.RandomStr(4)

        local uid = randInt .. randStr

        local result = exports.oxmysql:executeSync('SELECT * FROM nagodo_collections WHERE uid = ?', {uid})

        if next(result) then
            return self.GenerateCollectionUID()
        end

        return uid
    end

    return self
end


