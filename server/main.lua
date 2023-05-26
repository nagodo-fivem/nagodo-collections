local QBCore = exports['qb-core']:GetCoreObject()

local DATABASE = Database()

Citizen.CreateThread(function()
    DATABASE.Init()

end)

--Commands--
QBCore.Commands.Add("admincollections", "Open the admin collections menu", {}, false, function(source)
    TriggerClientEvent("nagodo_collections:client:openAdminMenu", source)
end, Config.ManageCollections)


--Callbacks--
QBCore.Functions.CreateCallback('nagodo_collections:server:getCollections', function(source, cb)
    local collections = DATABASE.GetCollections()

    cb(collections)
end)

QBCore.Functions.CreateCallback('nagodo_collections:server:createNewCollection', function(source, cb, name)
    local alreadyExists = DATABASE.DoesCollectionExist(name)

    if alreadyExists then
        cb("alreadyExists")
        return
    end

    DATABASE.CreateCollection(name)
    cb("success")
end)

