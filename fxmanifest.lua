fx_version 'cerulean'
game 'gta5'

shared_scripts {
	'shared/config.lua',
	'shared/utils.lua',

}

server_scripts {
	'server/callback.lua',
	'server/database.lua',
	'server/main.lua',
}

client_scripts {
	'client/callback.lua',
	'client/main.lua',
}



ui_page 'web/build/index.html'

files {
  'web/build/index.html',
  'web/build/**/*'
}

lua54 'yes'