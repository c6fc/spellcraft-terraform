'use strict';

const terraform = require("@c6fc/terraform");

exports._spellcraft_metadata = {
	cliExtensions: (yargs, spellframe) => {
		yargs.command("terraform-apply <filename>", "Generate files from a configuration and run 'terraform apply' on the output", (yargs) => {
			return yargs.positional('filename', {
				describe: 'Jsonnet configuration file to consume'
			}).option('skip-init', {
				alias: 's',
				type: 'boolean',
				description: 'Skip provider initialization.'
			}).option('auto-approve', {
				alias: 'y',
				type: 'boolean',
				description: 'Skip the apply confirmation. YOLO.'
			});
		}, async (argv) => {

			await spellframe.init();
			await spellframe.render(argv.filename);
			await spellframe.write();

			if (!argv['skip-init']) {
				await terraform.exec(["init"], {
					cwd: spellframe.renderPath,
					stdio: [process.stdin, process.stdout, process.stderr]
				});
			}

			const args = (argv['auto-approve']) ? ['apply', '-auto-approve'] : ['apply'];

			await terraform.exec(args, {
				cwd: spellframe.renderPath,
				stdio: [process.stdin, process.stdout, process.stderr]
			});
		});

		console.log(`[+] Imported SpellFrame CLI extensions for @c6fc/terraform`);
	},
	init: async () => {
		await terraform.isReady;
	}
};

exports.terraform = [function () {
	return terraform;
}]