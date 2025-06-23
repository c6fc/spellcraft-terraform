'use strict';

/**
 * @module spellcraft-terraform-cli
 * @description This module represents the set of CLI commands provided by the
 * SpellCraft Terraform Integration. These commands are added to the main
 * `spellcraft` CLI when the integration module is imported and active.
 */

/**
 * @name terraform-apply
 * @function
 * @memberof module:spellcraft-terraform-cli
 * @param {string} filename - The path to the Jsonnet configuration file to consume. (Required)
 * @param {boolean} [skip-init=false] - If true, skips the `terraform init` step before applying.
 *                                         Useful if providers are already initialized or managed externally.
 *                                         Alias: `-s`.
 * @param {boolean} [auto-approve=false] - If true, skips the approval prompt before applying.
 *                                         Useful if you aren't concerned about reviewing changes.
 *                                         Alias: `-y`.
 *
 * @example
 * # Render config.jsonnet, then run terraform init and terraform apply
 * spellcraft terraform-apply ./config.jsonnet
 *
 * @example
 * # Render config.jsonnet, skip terraform init, then run terraform apply while skipping approval
 * spellcraft terraform-apply ./config.jsonnet --skip-init --auto-approve
 * spellcraft terraform-apply ./config.jsonnet -ys
 */

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
				await terraform.exec("init", spellframe.renderPath);
			}

			const args = ($argv['auto-approve']) ? ['-y', spellframe.renderPath] : [spellframe.renderPath];

			await terraform.exec("build", args);

		});

		console.log(`[+] Imported SpellFrame CLI extensions for @c6fc/terraform`);
	},
	init: async () => {
		await terraform.isReady();
	}
}