local DATABASE = Database()

Citizen.CreateThread(function()
    DATABASE.Init()

end)

--Commands--
RegisterCommand("admincollections", function(source, args)
    TriggerClientEvent("nagodo-collections:openAdminMenu", source)
end, true)


--Callbacks--
CreateCallback('nagodo-collections:fetchCollections', function(source, cb)
    local collections = DATABASE.GetCollections()

    cb(collections)
end)

CreateCallback('nagodo-collections:server:createNewCollection', function(source, cb, name)
    local alreadyExists = DATABASE.DoesCollectionExist(name)

    if alreadyExists then
        cb("alreadyExists")
        return
    end

    DATABASE.CreateCollection(name)
    cb("success")
end)

