local CLIENT_UTILS, SHARED_UTILS = exports['nagodo-utils']:GetUtils('client')
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
    
    local result = CLIENT_UTILS.TriggerCallbackSync('nagodo-collections:server:createNewCollection', name)

    cb(result)
end)

RegisterNUICallback('fetchAllCollections', function(data, cb)

    local collections = CLIENT_UTILS.TriggerCallbackSync('nagodo-collections:fetchCollections')

    cb(collections)
end)

RegisterNUICallback('close', function (data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)
    