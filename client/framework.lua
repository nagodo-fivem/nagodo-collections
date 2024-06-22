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

function GetPlayerJob()
    if Config.Framework == "qb-core" then
        return Framework.Functions.GetPlayerData().job.name
    elseif Config.Framework == "esx" then
        return Framework.GetPlayerData().job.name
    else
        return ""
    end
    
end