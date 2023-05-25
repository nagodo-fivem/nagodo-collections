local Translations = {   
    ['en'] = {
        
    },
    ['da'] = {

    },
}

function GetTranslationsJson()
    return json.encode(Translations[Config.Language])
end

function _T(str)
    return Translations[Config.Language][str] or ("missing translation: " .. str)
end