function CreateCallback(name, cb)
    ServerCallbacks[name] = cb
end

function TriggerCallback(name, source, cb, ...)
    if not ServerCallbacks[name] then return end
    ServerCallbacks[name](source, cb, ...)
end

RegisterNetEvent(ResourceName .. ":" .. 'TriggerCallback', function(name, ...)
    local src = source
    TriggerCallback(name, src, function(...)
        TriggerClientEvent(ResourceName .. ":" .. 'TriggerCallback', src, name, ...)
    end, ...)
end)