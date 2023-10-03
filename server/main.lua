local SERVER_UTILS, SHARED_UTILS = exports['nagodo-utils']:GetUtils('server')
local DATABASE = Database()

Citizen.CreateThread(function()
    DATABASE.Init()

end)

--Commands--
RegisterCommand("admincollections", function(source, args)
    TriggerClientEvent("nagodo-collections:openAdminMenu", source)
end, true)


--Callbacks--
SERVER_UTILS.CreateCallback('nagodo-collections:fetchCollections', function(source, cb)
    local collections = DATABASE.FetchCollections()
    cb(collections)
end)

SERVER_UTILS.CreateCallback('nagodo-collections:server:createNewCollection', function(source, cb, name)
    local alreadyExists = DATABASE.DoesCollectionWithNameExist(name)

    if alreadyExists then
        cb("alreadyExists")
        return
    end

    DATABASE.CreateCollection(name)
    cb("success")
end)

