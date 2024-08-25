# Solana Target Switcher - VSCode Extension

## Overview

The **Solana Target Switcher** is a simple VSCode extension designed to help you quickly switch between your default Rust build target and the "solana" target. This is particularly useful for developers working with Solana projects who need to toggle between different build targets without manually editing configuration files.

## Features

- **Toggle Build Target:** Easily switch between your default Rust build target and the `solana` target with a single click.

## Usage

1. **Activate the Extension:**
   - Once installed, the extension automatically adds a new icon to the status bar.
   
2. **Toggle Between Targets:**
   - Click the icon in the status bar to toggle between the default Rust build target and the "solana" target.
   - The icon will change color based on the selected target.

3. **Target Display:**
   - When the "solana" target is selected, the icon will be solid.
   - When the default target is selected, the icon will be outlined.

4. **Configuration:**
   - The extension modifies the `rust-analyzer.cargo.target` setting in your VSCode workspace configuration.

## Contribution

Feel free to open issues or submit pull requests to improve this extension. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.