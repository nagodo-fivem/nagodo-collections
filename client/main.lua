local UTILS = exports['nagodo-utils']:GetUtils()
--Events--
RegisterNetEvent("nagodo-collections:openCreatorMenu", function()
    OpenCreatorMenu()
end)

function OpenCreatorMenu() 
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'setShowType',
        data = {
            type = "creator"
        }
    })
end

function SendCollections(collections) 
    SendNUIMessage({
        action = 'setCollections',
        data = {
            collections = collections
        }
    })
end

function SendProperties(properties) 
    SendNUIMessage({
        action = 'setProperties',
        data = {
            properties = properties
        }
    })
end

--NUI Callbacks--
RegisterNUICallback('fetchCollections', function(data, cb)
    local collections = UTILS.TriggerCallbackSync('nagodo-collections:server:getAllCollections')
    cb(collections)
end)

RegisterNUICallback('createCollection', function(data, cb)
    local label = data.label

    local collection = {
        label = label,
    }
    
    local allCollections = UTILS.TriggerCallbackSync('nagodo-collections:server:createNewCollection', collection)
    SendCollections(allCollections)
    
    cb('ok')
end)

RegisterNuiCallback('fetchProperties', function(data, cb)
    local properties = UTILS.TriggerCallbackSync('nagodo-collections:server:getAllProperties')
    cb(properties)
end)

RegisterNUICallback('createProperty', function(data, cb)
    local type = data.type
    local label = data.label
    local image = data.image

    local property = {
        type = type,
        label = label,
        image = image
    }
    
    local allProperties = UTILS.TriggerCallbackSync('nagodo-collections:server:createNewProperty', property)
    SendProperties(allProperties)
    
    cb('ok')
end)

RegisterNUICallback('close', function (data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)