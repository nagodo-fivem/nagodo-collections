function RegisterAllItemsForUse() 


    local collections = DATABASE.GetAllCollections()

    if next(collections) then
        for k, v in pairs(collections) do
            local packName = "pack_" .. v.identifier
            RegisterItemForUse(packName, "pack", {collectionId = v.identifier}, true)
        end
    end

    local cards = DATABASE.GetCardsForItemRegister()

    if next(cards) then
        for k, v in pairs(cards) do
            local name = "card_" .. v.collectionId .. "_" .. v.identifier
            RegisterItemForUse(name, "card", {cardToOpen = name}, false)
        end
    end
end