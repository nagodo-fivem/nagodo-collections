local Framework = nil
if Config.Framework == "qb-core" then
    Framework = exports['qb-core']:GetCoreObject()

elseif Config.Framework == "esx" then
    Framework = exports["es_extended"]:getSharedObject()
end

if Framework == nil then
    print("Failed to get framework object")
    return
end

function RegisterItemForUse(name, type, data, removeItemOnUse)
    removeItemOnUse = removeItemOnUse or false
    
    if Config.Framework == "qb-core" then
        Framework.Functions.CreateUseableItem(name, function(source)
            TriggerClientEvent("qb-inventory:client:useItem", source, name)

            if removeItemOnUse then
                local Player = Framework.Functions.GetPlayer(source)
                Player.Functions.RemoveItem(name, 1)
            end

            if type == "card" then
                HandleCardUse(source, data.cardToOpen)
            end
        end)

    elseif Config.Framework == "esx" then
        Framework.RegisterUsableItem(name, function(playerId)
            local xPlayer = Framework.GetPlayerFromId(playerId)

            if removeItemOnUse then
                xPlayer.removeInventoryItem(name, 1)
            end
          end)
    end

end