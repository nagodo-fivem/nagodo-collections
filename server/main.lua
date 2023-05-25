local QBCore = exports['qb-core']:GetCoreObject()

local DATABASE = Database()

--Callbacks--
QBCore.Functions.CreateCallback('nagodo_collections:server:createNewCollection', function(source, cb, name)
    local alreadyExists = DATABASE.DoesCollectionExist(name)

    if alreadyExists then
        cb("alreadyExists")
        return
    end

    DATABASE.CreateCollection(name)
    cb("success")
end)