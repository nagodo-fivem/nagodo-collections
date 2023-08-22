local QBCore = exports['qb-core']:GetCoreObject()

--Events--
RegisterNetEvent("nagodo_collections:client:openAdminMenu", function()
    OpenCollectionsAdminMenu()
end)

function OpenCollectionsAdminMenu()
    ShowAdminMenu()

end

Citizen.CreateThread(function()
    Citizen.Wait(1000)

    local result = TriggerCallbackSync('dinmor')
   
end)

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

    local promise = promise.new()
    QBCore.Functions.TriggerCallback('nagodo_collections:server:createNewCollection', function(result)
        promise:resolve(result)
    end, name)
    local result = Citizen.Await(promise)

    cb(result)
end)

RegisterNUICallback('getAdminCollections', function(data, cb)
    local promise = promise.new()
    QBCore.Functions.TriggerCallback('nagodo_collections:server:getCollections', function(result)
        promise:resolve(result)
    end)
    local collections = Citizen.Await(promise)

    cb(collections)
end)

RegisterNUICallback('close', function (data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)
    