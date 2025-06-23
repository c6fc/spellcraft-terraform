# SpellCraft Terraform Integration

[![NPM version](https://img.shields.io/npm/v/@c6fc/spellcraft-terraform.svg?style=flat)](https://www.npmjs.com/package/@c6fc/spellcraft-terraform)
[![License](https://img.shields.io/npm/l/@c6fc/spellcraft-terraform.svg?style=flat)](https://opensource.org/licenses/MIT)

Seamlessly integrate [HashiCorp Terraform](https://www.terraform.io/) into your [SpellCraft](https://github.com/@c6fc/spellcraft) SpellFrames. This plugin allows you to define Terrafpr, configurations using Jsonnet, render them with SpellCraft, and then use terraform to build your machine images or other artifacts.

## Features

*   **New `spellcraft terraform-apply` command:** Extends the SpellCraft CLI with a dedicated command to render Terraform configurations and immediately trigger a Terraform build.
*   **Jsonnet-Powered Terraform Configs:** Leverage the power of Jsonnet to create dynamic and reusable Terraform templates.
*   **Automated Workflow:** Streamlines the process from configuration definition to artifact creation.
*   **Terraform Initialization Control:** Option to skip `terrafrom init` if your environment or workflow handles it separately.

## Prerequisites

*   **SpellCraft CLI:** You need to have SpellCraft installed and a SpellCraft project set up.
*   **Node.js & npm:** For installing this plugin.

## Installation

Install the plugin as a dev dependency in your SpellCraft project:

```bash
npm install --save @c6fc/spellcraft-terraform
```