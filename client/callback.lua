function TriggerCallbackSync(name, ...)
    local promise = promise.new()
    TriggerCallback(name, function(...)
        promise:resolve(...)
    end, ...)
    local result = Citizen.Await(promise)
    
    return result
end

function TriggerCallback(name, cb, ...)
    ServerCallbacks[name] = cb
    TriggerServerEvent(ResourceName .. ":" .. 'TriggerCallback', name, ...)
end

RegisterNetEvent(ResourceName .. ":" .. 'TriggerCallback', function(name, ...)
    if ServerCallbacks[name] then
        ServerCallbacks[name](...)
        ServerCallbacks[name] = nil
    end
end)