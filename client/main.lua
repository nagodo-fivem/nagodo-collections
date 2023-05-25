local QBCore = exports['qb-core']:GetCoreObject()

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