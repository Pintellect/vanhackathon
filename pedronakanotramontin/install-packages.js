const args = [ 'install' ];
opts = { stdio: 'inherit', cwd: './app/', shell: true };
require('child_process').spawn('npm', args, opts);
