function RegisterAllItemsForUse() 
    local cards = DATABASE.GetCardsForItemRegister()

    if next(cards) then
        for k, v in pairs(cards) do
            local name = v.collectionId .. "_" .. v.identifier .. "_card"
            RegisterItemForUse(name, "card", {cardToOpen = name}, false)
        end
    end
end