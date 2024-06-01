local UTILS = exports['nagodo-utils']:GetUtils()
local DATABASE = Database()

Citizen.CreateThread(function()
    DATABASE.Init()

end)

function OpenCreatorMenu() 
    TriggerClientEvent("nagodo-collections:openCreatorMenu", -1)
end

--Callbacks--
UTILS.CreateCallback('nagodo-collections:server:getAllCollections', function(source, cb)
    local collections = DATABASE.GetAllCollections()
    cb(collections)
end)

UTILS.CreateCallback('nagodo-collections:server:createNewCollection', function(source, cb, collection)
    
    local result = DATABASE.CreateCollection(collection)

    local collections = DATABASE.GetAllCollections()
   
    cb(collections)
end)

UTILS.CreateCallback('nagodo-collections:server:getAllProperties', function(source, cb)
    local properties = DATABASE.GetAllProperties()
    cb(properties)
end)

UTILS.CreateCallback('nagodo-collections:server:createNewProperty', function(source, cb, property)
    
    local result = DATABASE.CreateProperty(property)

    local properties = DATABASE.GetAllProperties()
   
    cb(properties)
end)

