fx_version 'cerulean'
game 'gta5'

shared_scripts {
	'shared/config.lua',
	'shared/locale.lua'

}

server_scripts {
	'server/database.lua',
	'server/main.lua',
}

client_scripts {
	'client/main.lua',
}



ui_page 'web/build/index.html'

files {
	'web/images/*',
	'web/build/index.html',
	'web/build/**/*'
}

dependencies {
	'nagodo-utils',
}

lua54 'yes'