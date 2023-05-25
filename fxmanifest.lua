fx_version 'cerulean'
game 'gta5'

shared_scripts {
	'shared/*',
}
client_scripts {
	'client/*'
}

server_scripts {
	"server/*"

}

ui_page 'web/build/index.html'

files {
  'web/build/index.html',
  'web/build/**/*'
}

lua54 'yes'