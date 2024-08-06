local UTILS = exports['nagodo-utils']:GetUtils()

Citizen.CreateThread(function()
    DATABASE.Init()

    RegisterAllItemsForUse()

end)

function OpenCreatorMenu() 
    TriggerClientEvent("nagodo-collections:openCreatorMenu", -1)
end


function HandleCardUse(source, cardName)
    local cardData = DATABASE.GetCardDataForUse(cardName)

    TriggerClientEvent("nagodo-collections:client:openCard", source, cardData)
end

function HandlePackUse(source, collectionId)
    local cardAmount = 8

    local cardsToOpen = CalculateCardsToOpen(collectionId, cardAmount)

    local sortedByRarity = SortByRarity(cardsToOpen)

    print("Cards to open: " .. json.encode(cardsToOpen))
end

function CalculateCardsToOpen(collectionId, amount)
    local allCards = DATABASE.GetAllCards(collectionId)

    local lowestRarity = 100000000

    for k, v in pairs(allCards) do
        if v.rarity < lowestRarity then
            lowestRarity = v.rarity
        end
    end

    local multi = 1
    --Convert to int
    if lowestRarity < 0 then
        local decimalAmount = #tostring(lowestRarity) - 2

        local pow = 10 ^ decimalAmount
        multi = pow

    end

    local cardsToOpen = {}
        
    local sumRarity = 0
    for k, v in pairs(allCards) do
        local inc = (v.rarity * multi)

        table.insert(cardsToOpen, {
            min = sumRarity,
            max = sumRarity + inc,
            rarity = inc,
            cardId = v.identifier
        })

        sumRarity = sumRarity + inc
    end

    local cards = {}

    for i = 1, amount, 1 do
        local random = math.random(0, sumRarity)

        for k, v in pairs(cardsToOpen) do
            if random >= v.min and random <= v.max then
                table.insert(cards, {
                    id = v.cardId,
                    rarity = v.rarity
                })
                break
            end
        end
    end

    return cards
end

function SortByRarity(cards)
    table.sort(cards, function(a, b)
        return a.rarity > b.rarity
    end)

    return cards
end

--Callbacks--
UTILS.CreateCallback('nagodo-collections:server:getAllCollections', function(source, cb)
    local collections = DATABASE.GetAllCollections()
    cb(collections)
end)

UTILS.CreateCallback('nagodo-collections:server:createNewCollection', function(source, cb, collection)
    
    local result = DATABASE.CreateCollection(collection)

    local collections = DATABASE.GetAllCollections()
   
    cb(collections)
end)

UTILS.CreateCallback('nagodo-collections:server:getAllProperties', function(source, cb)
    local properties = DATABASE.GetAllProperties()
    cb(properties)
end)

UTILS.CreateCallback('nagodo-collections:server:createNewProperty', function(source, cb, property)
    
    local result = DATABASE.CreateProperty(property)

    local properties = DATABASE.GetAllProperties()
   
    cb(properties)
end)

UTILS.CreateCallback('nagodo-collections:server:saveProperty', function(source, cb, property)

    local result = DATABASE.UpdateProperty(property)

    local properties = DATABASE.GetAllProperties()

    cb(properties)
end)

UTILS.CreateCallback('nagodo-collections:server:deleteProperty', function(source, cb, propertyIdentifier)
    
    DATABASE.DeleteProperty(propertyIdentifier)

    local properties = DATABASE.GetAllProperties()

    cb(properties)
end)

UTILS.CreateCallback('nagodo-collections:server:saveCard', function(source, cb, payload)
    
    if payload.card.identifier == -1 then
        DATABASE.CreateCard(payload.collectionIdentifier, payload.card)
    else
        DATABASE.UpdateCard(payload.card)
    end

    local cards = DATABASE.GetAllCards(payload.collectionIdentifier)

    cb(cards)
end)

UTILS.CreateCallback('nagodo-collections:server:deleteCard', function(source, cb, cardIdentifier, collectionIdentifier)
    
    DATABASE.DeleteCard(cardIdentifier)

    local cards = DATABASE.GetAllCards(collectionIdentifier)

    cb(cards)
end)

UTILS.CreateCallback('nagodo-collections:server:getCardsInCollection', function(source, cb, collectionIdentifier)
    print(collectionIdentifier)
    local cards = DATABASE.GetAllCards(collectionIdentifier)
    cb(cards)
end)

function DecodeBase64(data)
    local b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    local decchars = {}
    for i = 1, 64 do
        decchars[string.sub(b64chars, i, i)] = i
    end
    data = string.gsub(data, '[^'..b64chars..'=]', '')
    return (data:gsub('.', function(x)
        if x == '=' then return '' end
        local r, f = '', (decchars[x] - 1)
        for i = 6, 1, -1 do
            r = r..(f % 2^i - f % 2^(i - 1) > 0 and '1' or '0')
        end
        return r
    end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)
        if (#x ~= 8) then return '' end
        local c = 0
        for i = 1, 8 do
            c = c + (string.sub(x, i, i) == '1' and 2^(8 - i) or 0)
        end
        return string.char(c)
    end))
end

-- Event to save the image
RegisterNetEvent('nagodo-collections:server:saveImage', function(base64, cardName)

    local prefix = "data:image/png;base64,"
    local base64_data = string.gsub(base64, prefix, '')  -- Remove the prefix
    local decodedImage = DecodeBase64(base64_data)
    if not decodedImage then
        print("No image to write.")
        return
    end

    local path = GetResourcePath(GetCurrentResourceName())
    path = path .. Config.ImageExportSavePath
    print(path)

    local file, err = io.open(path .. "card_" .. cardName .. ".png", "wb") -- Open file in binary mode
    if not file then
        print("Failed to open file:", err)
        return
    end

    local success, write_err = file:write(decodedImage)
    if not success then
        print("Failed to write to file:", write_err)
    else
        print("File written successfully. File size: ", #decodedImage)
    end

    file:close()
end)