fx_version 'cerulean'
game 'gta5'

shared_scripts {
	'shared/config.lua',
	'shared/locale.lua'

}

server_scripts {
	'server/database.lua',
	'server/editable_server.lua',
	'server/main.lua',
}

client_scripts {
	'client/editable_client.lua',
	'client/main.lua',
}



ui_page 'web/build/index.html'

files {
	'web/public/images/**/**/*',
	'web/public/images/**/*',
	'web/build/index.html',
	'web/build/**/*'
}

dependencies {
	'nagodo-utils',
}

lua54 'yes'