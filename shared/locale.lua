Locale = {
    ['en'] = {

    }
}

function _T(key)
    return Locale[Config.Language][key] or key
end