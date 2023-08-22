--Events--
RegisterNetEvent("nagodo-collections:openAdminMenu", function()
    OpenCollectionsAdminMenu()
end)

function OpenCollectionsAdminMenu()
    ShowAdminMenu()

end

function ShowAdminMenu()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "setShowType",
        data = "admin"
    })
end

--NUI Callbacks--
RegisterNUICallback('createNewCollection', function(data, cb)
    local name = data.name

    local result = TriggerCallbackSync('nagodo-collections:server:createNewCollection', name)

    cb(result)
end)

RegisterNUICallback('getAdminCollections', function(data, cb)
    local name = data.name

    local collections = TriggerCallbackSync('nagodo-collections:fetchCollections', name)

    cb(collections)
end)

RegisterNUICallback('close', function (data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)
    