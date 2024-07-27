Locale = {
    ['en'] = {
        

        -- Creator --
        ['NAV_COLLECTIONS'] = "Collections",
        ['NAV_PROPERTIES'] = "Properties",
        ['NEW_COLLECTION'] = "New Collection",
        ['ACTIONS'] = "Actions",
        ['EDIT_CARDS'] = "Edit cards",
        ['EXPORT_CARD_IMAGES'] = "Export card images",
        ['EXPORT_ITEMS'] = "Export items",
        ['CREATE'] = "Create",
        ['SELECT'] = "Select",
        ['ENTER'] = "Enter...",
        
        ['IS_CUSTOM'] = "Fullart card",
        ['NEW_CARD'] = "New card",
        ['VISUALS'] = "Visuals",
        ['FRAME'] = "Frame",
        ['ELEMENT'] = "Element",
        ['IMAGE_OVERLAY'] = "Image Overlay",

        -- Context Menu --
        ['DELETE_PROPERTY'] = "Delete Property",

        -- Item Export --
        ['COPY_TO_CLIPBOARD'] = "Copy to clipboard",
        ['OUTPUT_WAS_COPIED'] = "Output has been copied to clipboard!",
        ['EXPORTING_COLLECTION'] = "Exporting collection: ",
        ['GENERATE'] = "Generate",
        ['OUTPUT'] = "Output",

        ['FOLDER_FOR_COLLECTION'] = "Folder for collection: ",
        ['CARD_FROM_COLLECTION'] = "Card from collection: ",
        ['PACK_FOR_COLLECTION'] = "Pack with cards from: ",

        -- Image Export --
        ['NO_CARDS_TO_EXPORT'] = "No cards to export",
        ['CARDS_IN_COLLECTION'] = "Cards in collection: ",
        ['ESTIMATED_FILE_SIZE'] = "Estimated file size: ",
        ['ESTIMATED_TIME'] = "Estimated time: ",
        ['EXPORT'] = "Export",
        ['SPEED'] = "Speed",
        ['DEFAULT'] = "Default",
        ['QUALITY'] = "Quality",
        ['LOW'] = "Low",
        ['MEDIUM'] = "Medium",
        ['HIGH'] = "High",
        ['ULTRA'] = "Ultra",

        -- Shared --
        ['BACK'] = "Back",
        ['STOP'] = "Stop",
        ['CANCEL'] = "Cancel",
        ['CLOSE'] = "Close",
        
        ['DELETE'] = "Delete",
        ['SAVE'] = "Save",
        ['CONFIRM'] = "Confirm",
        ['NONE'] = "None",

    }
}

function _T(key)
    return Locale[Config.Language][key] or key
end